import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

const starterProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Monolith Architectural Zinc Planter',
    category: 'planters',
    categoryLabel: 'Planters',
    price: 185,
    originalPrice: 215,
    rating: 4.9,
    reviewsCount: 38,
    description:
      'A solid zinc planter with a hand-finished patina and built-in root aeration.',
    specs: ['Cast zinc alloy', '28 × 22 × 22 cm', 'Weight: 4.2 kg', 'Dual-chamber drainage'],
    stock: 12,
    svgColor: '#1b382b',
  },
  {
    id: 'prod-2',
    name: 'Verdant Luminaire Desk Lamp No. 04',
    category: 'lighting',
    categoryLabel: 'Lighting',
    price: 240,
    originalPrice: 280,
    rating: 5,
    reviewsCount: 29,
    description:
      'A matte zinc-green desk lamp with warm, diffused light and brass accents.',
    specs: ['Dark zinc-green finish', 'Warm 2700K LED', 'Brass touch dimmer', '2 m woven cord'],
    stock: 8,
    svgColor: '#224736',
  },
  {
    id: 'prod-3',
    name: 'Cold-Pressed Conifer Botanical Essence (50ml)',
    category: 'botanicals',
    categoryLabel: 'Botanicals',
    price: 88,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 46,
    description:
      'A botanical blend of fir, hinoki cypress, and juniper in organic squalane.',
    specs: ['Fir, hinoki, and juniper', '50 ml', 'Zinc dropper cap', 'Responsibly harvested'],
    stock: 24,
    svgColor: '#152a20',
  },
  {
    id: 'prod-4',
    name: 'Prism Faceted Terrarium Vessel',
    category: 'vessels',
    categoryLabel: 'Vessels',
    price: 160,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 35,
    description:
      'A glass and zinc terrarium with preserved mountain moss, ready to display.',
    specs: ['Hand-finished zinc seams', 'Low-iron glass', 'Preserved moss included', 'No watering required'],
    stock: 14,
    svgColor: '#274e3c',
  },
  {
    id: 'prod-5',
    name: 'Cast Zinc Botanical Mist Nebulizer',
    category: 'botanicals',
    categoryLabel: 'Botanicals',
    price: 125,
    originalPrice: 145,
    rating: 4.7,
    reviewsCount: 19,
    description:
      'A weighted plant mister that creates a fine, gentle mist for delicate leaves.',
    specs: ['Brass and zinc chamber', 'Fine-mist spray', '350 ml reservoir', 'Sculpted thumb lever'],
    stock: 16,
    svgColor: '#1a3427',
  },
  {
    id: 'prod-6',
    name: 'Architectural Zinc Horizon Incense Monolith',
    category: 'vessels',
    categoryLabel: 'Vessels',
    price: 74,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 52,
    description:
      'A simple zinc incense holder with a removable magnetic ash tray.',
    specs: ['Die-cast zinc body', '32 × 4.5 × 1.8 cm', 'Magnetic ash tray', '15 incense sticks included'],
    stock: 20,
    svgColor: '#183226',
  },
];

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async onModuleInit() {
    if ((await this.productsRepository.count()) === 0) {
      await this.productsRepository.save(starterProducts);
    }
  }

  findAll() {
    return this.productsRepository.find({ order: { id: 'ASC' } });
  }

  findOne(id: string) {
    return this.productsRepository.findOneBy({ id });
  }
}
