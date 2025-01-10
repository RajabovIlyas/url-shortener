import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { nanoid } from 'nanoid';
import {
  ClickEntity,
  UrlEntity,
} from '@/infrastructure/database/sqlite/entities';

@Injectable()
export class UrlRepository {
  constructor(
    @InjectRepository(UrlEntity)
    private urlRepository: Repository<UrlEntity>,
    @InjectRepository(ClickEntity)
    private clickRepository: Repository<ClickEntity>,
  ) {}

  async create(
    originalUrl: string,
    expiresAt?: Date,
    alias?: string,
  ): Promise<UrlEntity> {
    if (!alias) {
      const shortUrl = nanoid(6);
      const url = this.urlRepository.create({
        originalUrl,
        shortUrl,
        expiresAt,
      });
      return this.urlRepository.save(url);
    }
    if (alias.length > 20) {
      throw new BadRequestException('Alias must be 20 characters or less');
    }
    const existingUrl = await this.urlRepository.findOne({
      where: { shortUrl: alias },
    });
    if (existingUrl) {
      throw new BadRequestException('Alias already in use');
    }
    const url = this.urlRepository.create({
      originalUrl,
      shortUrl: alias,
      expiresAt,
    });
    return this.urlRepository.save(url);
  }

  async findByShortUrl(shortUrl: string): Promise<UrlEntity> {
    return this.urlRepository.findOne({ where: { shortUrl } });
  }

  async incrementClickCount(shortUrl: string): Promise<void> {
    await this.urlRepository.increment({ shortUrl }, 'clickCount', 1);
  }

  async deleteUrl(shortUrl: string) {
    const deletedResult = await this.urlRepository.delete({ shortUrl });

    if (deletedResult.affected === 0) {
      throw new NotFoundException('URL not found');
    }
  }

  async logClick(url: UrlEntity, ipAddress: string): Promise<void> {
    const click = this.clickRepository.create({
      url,
      ipAddress,
      createdAt: new Date(),
    });
    await this.clickRepository.save(click);
  }

  async getAnalytics(
    shortUrl: string,
  ): Promise<{ clickCount: number; lastIPs: string[] }> {
    const url = await this.findByShortUrl(shortUrl);
    if (!url) {
      throw new NotFoundException('URL not found');
    }

    const clickCount = url.clickCount;

    const lastClicks = await this.clickRepository.find({
      where: { url: { id: url.id } },
      order: { createdAt: 'DESC' },
      take: 5,
    });

    const lastIPs = lastClicks.map((click) => click.ipAddress);

    return { clickCount, lastIPs };
  }
}
