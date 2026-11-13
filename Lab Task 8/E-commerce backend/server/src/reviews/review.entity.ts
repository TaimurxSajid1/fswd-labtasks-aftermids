import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column({ default: 'Customer' })
  role: string;

  @Column()
  rating: number;

  @Column()
  date: string;

  @Column({ default: false })
  verified: boolean;

  @Column()
  title: string;

  @Column('text')
  comment: string;

  @Column({ default: 0 })
  helpful: number;
}
