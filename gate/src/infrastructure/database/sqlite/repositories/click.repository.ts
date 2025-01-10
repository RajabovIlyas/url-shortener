import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClickEntity } from '../entities';
import { ClickRepository } from '@/domain/repositories';
import { CreateClickDto } from '@/appication/dtos/create-click.dto';

@Injectable()
export class ClickSqLiteRepository implements ClickRepository {
  constructor(
    @InjectRepository(ClickEntity)
    private clickRepository: Repository<ClickEntity>,
  ) {}

  async logClick({ urlId, ipAddress }: CreateClickDto): Promise<void> {
    const click = this.clickRepository.create({
      url: { id: urlId },
      ipAddress,
    });
    await this.clickRepository.save(click);
  }

  async getAnalytics(urlId: string): Promise<ClickEntity[]> {
    return this.clickRepository.find({
      where: { url: { id: urlId } },
      order: { createdAt: 'DESC' },
      take: 5,
    });
  }
}
