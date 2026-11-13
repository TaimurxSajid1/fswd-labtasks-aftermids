import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  categoryLabel: string;

  @Column('real')
  price: number;

  @Column('real', { nullable: true })
  originalPrice: number | null;

  @Column('real', { default: 0 })
  rating: number;

  @Column({ default: 0 })
  reviewsCount: number;

  @Column('text')
  description: string;

  @Column('simple-json')
  specs: string[];

  @Column({ default: 0 })
  stock: number;

  @Column()
  svgColor: string;
}
