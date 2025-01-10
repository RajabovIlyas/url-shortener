import { GoneException, Injectable, NotFoundException } from '@nestjs/common';
import { UrlRepository } from '@/domain/repositories';
import { Url } from '@/domain/entities';

@Injectable()
export class UrlInfoUC {
  constructor(private readonly urlRepo: UrlRepository) {}

  async execute(shortUrl: string): Promise<Url> {
    const url = await this.urlRepo.findByShortUrl(shortUrl);
    if (!url) {
      throw new NotFoundException('URL not found');
    }
    if (url.expiresAt && new Date() > new Date(url.expiresAt)) {
      throw new GoneException('URL has expired');
    }
    return url;
  }
}
