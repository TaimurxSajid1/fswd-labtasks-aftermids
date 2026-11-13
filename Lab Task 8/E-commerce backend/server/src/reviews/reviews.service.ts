import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './review.entity';

const starterReviews: Review[] = [
  {
    id: 1,
    author: 'Elena Rostova',
    role: 'Designer, Zurich',
    rating: 5,
    date: 'March 14, 2026',
    verified: true,
    title: 'A beautiful planter with a lovely finish',
    comment:
      'The planter looks wonderful beside the window in my study. The finish and weight feel considered and well made.',
    helpful: 24,
  },
  {
    id: 2,
    author: 'Marcus Vance',
    role: 'Creative Director, London',
    rating: 5,
    date: 'February 28, 2026',
    verified: true,
    title: 'A desk lamp I will keep for years',
    comment:
      'The warm light is comfortable for evening work, and the brass dimmer is easy to use. It looks even better in person.',
    helpful: 19,
  },
  {
    id: 3,
    author: 'Sora Takahashi',
    role: 'Plant Collector, Kyoto',
    rating: 5,
    date: 'January 19, 2026',
    verified: true,
    title: 'A fresh, natural scent',
    comment:
      'The botanical blend has a gentle forest scent. The bottle feels sturdy and the dropper makes it easy to use.',
    helpful: 15,
  },
];

@Injectable()
export class ReviewsService implements OnModuleInit {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
  ) {}

  async onModuleInit() {
    if ((await this.reviewsRepository.count()) === 0) {
      await this.reviewsRepository.save(starterReviews);
    }
  }

  findAll() {
    return this.reviewsRepository.find({ order: { id: 'DESC' } });
  }

  async create(dto: CreateReviewDto) {
    const review = this.reviewsRepository.create({
      ...dto,
      role: 'Customer',
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      verified: false,
      helpful: 0,
    });
    return this.reviewsRepository.save(review);
  }
}
