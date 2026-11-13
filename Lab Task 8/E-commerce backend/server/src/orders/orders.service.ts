import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Product } from '../products/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderItem } from './order-item.entity';
import { Order } from './order.entity';

const FREE_SHIPPING_THRESHOLD = 150;
const SHIPPING_FEE = 18;
const DISCOUNT_RATE = 0.15;

@Injectable()
export class OrdersService {
  constructor(private readonly dataSource: DataSource) {}

  create(dto: CreateOrderDto) {
    return this.dataSource.transaction(async (manager) => {
      const quantities = new Map<string, number>();
      for (const item of dto.items) {
        quantities.set(
          item.productId,
          (quantities.get(item.productId) ?? 0) + item.quantity,
        );
      }

      const productsRepository = manager.getRepository(Product);
      const orderRepository = manager.getRepository(Order);
      const itemRepository = manager.getRepository(OrderItem);
      const products = await productsRepository.findByIds([...quantities.keys()]);

      if (products.length !== quantities.size) {
        throw new NotFoundException('One or more products could not be found');
      }

      const orderItems: OrderItem[] = [];
      let subtotal = 0;
      for (const product of products) {
        const quantity = quantities.get(product.id) ?? 0;
        if (quantity > product.stock) {
          throw new BadRequestException(
            `Only ${product.stock} ${product.name} available`,
          );
        }

        product.stock -= quantity;
        subtotal += product.price * quantity;
        orderItems.push(
          itemRepository.create({
            productId: product.id,
            productName: product.name,
            quantity,
            unitPrice: product.price,
          }),
        );
      }

      const discount =
        dto.couponCode?.trim().toUpperCase() === 'ZINC15'
          ? Number((subtotal * DISCOUNT_RATE).toFixed(2))
          : 0;
      const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
      const order = orderRepository.create({
        firstName: dto.firstName.trim(),
        lastName: dto.lastName.trim(),
        email: dto.email.trim().toLowerCase(),
        address: dto.address.trim(),
        city: dto.city.trim(),
        postalCode: dto.postalCode.trim(),
        country: dto.country.trim(),
        paymentMethod: dto.paymentMethod,
        status: 'pending',
        subtotal: Number(subtotal.toFixed(2)),
        discount,
        shipping,
        total: Number((subtotal - discount + shipping).toFixed(2)),
      });

      await productsRepository.save(products);
      const savedOrder = await orderRepository.save(order);
      await itemRepository.save(
        orderItems.map((item) => ({ ...item, order: savedOrder })),
      );

      return orderRepository.findOneOrFail({
        where: { id: savedOrder.id },
        relations: { items: true },
      });
    });
  }
}
