import { Injectable, NotFoundException } from '@nestjs/common';
import { UrlRepository, ClickRepository } from '@/domain/repositories';
import { RedirectUrlInputDto } from '@/appication/dtos/redirect-url-input.dto';

@Injectable()
export class RedirectUrlUC {
  constructor(
    private readonly urlRepo: UrlRepository,
    private readonly clickRepo: ClickRepository,
  ) {}

  async execute({ ipAddress, shortUrl }: RedirectUrlInputDto): Promise<string> {
    const url = await this.urlRepo.findByShortUrl(shortUrl);
    if (!url) {
      throw new NotFoundException('URL not found');
    }
    await this.urlRepo.incrementClickCount(shortUrl);
    await this.clickRepo.logClick({ urlId: url.id, ipAddress });
    return url.originalUrl;
  }
}
