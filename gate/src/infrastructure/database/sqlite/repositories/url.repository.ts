import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlEntity } from '../entities';
import { UrlRepository } from '@/domain/repositories';
import { CreateUrlDto } from '@/appication/dtos/create-url.dto';
import { Url } from '@/domain/entities';
import { customNanoid } from '@/infrastructure/utils/nanoid';

@Injectable()
export class UrlSqLiteRepository implements UrlRepository {
  constructor(
    @InjectRepository(UrlEntity)
    private urlRepository: Repository<UrlEntity>,
  ) {}

  async create({ alias, expiresAt, originalUrl }: CreateUrlDto): Promise<Url> {
    if (!alias) {
      const shortUrl = customNanoid(6);
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

  async findByShortUrl(shortUrl: string): Promise<Url> {
    return this.urlRepository.findOne({ where: { shortUrl } });
  }

  async incrementClickCount(shortUrl: string): Promise<void> {
    await this.urlRepository.increment({ shortUrl }, 'clickCount', 1);
  }

  async deleteUrl(shortUrl: string): Promise<void> {
    const deletedResult = await this.urlRepository.delete({ shortUrl });

    if (deletedResult.affected === 0) {
      throw new NotFoundException('URL not found');
    }
  }
}
