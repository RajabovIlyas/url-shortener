import { Injectable, NotFoundException } from '@nestjs/common';
import { UrlRepository, ClickRepository } from '@/domain/repositories';
import { ClickStatsDto } from '@/appication/dtos/click-stats.dto';

@Injectable()
export class AnalyticsMetricsUC {
  constructor(
    private readonly urlRepo: UrlRepository,
    private readonly clickRepo: ClickRepository,
  ) {}

  async execute(shortUrl: string): Promise<ClickStatsDto> {
    const url = await this.urlRepo.findByShortUrl(shortUrl);
    if (!url) {
      throw new NotFoundException('URL not found');
    }

    const clickCount = url.clickCount;

    const lastClicks = await this.clickRepo.getAnalytics(url.id);

    const lastIPs = lastClicks.map((click) => click.ipAddress);

    return { clickCount, lastIPs };
  }
}
