import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AnalyticsMetricsUC } from '@/domain/use-cases/analytics-metrics.usecase';
import { CreateUrlUC } from '@/domain/use-cases/create-url.usecase';
import { DeleteUrlUC } from '@/domain/use-cases/delete-url.usecase';
import { RedirectUrlUC } from '@/domain/use-cases/redirect-url.usecase';
import { UrlInfoUC } from '@/domain/use-cases/url-info.usecase';
import { CreateUrlDto } from '@/appication/dtos/create-url.dto';

@Controller()
export class UrlController {
  constructor(
    private readonly analyticsMetricsUC: AnalyticsMetricsUC,
    private readonly createUrlUC: CreateUrlUC,
    private readonly deleteUrlUC: DeleteUrlUC,
    private readonly redirectUrlUC: RedirectUrlUC,
    private readonly urlInfoUC: UrlInfoUC,
  ) {}

  @Post('shorten')
  @HttpCode(HttpStatus.CREATED)
  async shortenUrl(@Body() createUrlDto: CreateUrlDto) {
    return this.createUrlUC.execute(createUrlDto);
  }

  @Get(':shortUrl')
  async redirectToUrl(
    @Param('shortUrl') shortUrl: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const originalUrl = await this.redirectUrlUC.execute({
      shortUrl,
      ipAddress: req.ip,
    });
    return res.redirect(originalUrl);
  }

  @Get('info/:shortUrl')
  async getUrlInfo(@Param('shortUrl') shortUrl: string) {
    return this.urlInfoUC.execute(shortUrl);
  }

  @Delete('delete/:shortUrl')
  async deleteUrl(@Param('shortUrl') shortUrl: string) {
    await this.deleteUrlUC.execute(shortUrl);
    return { message: 'URL successfully deleted' };
  }

  @Get('analytics/:shortUrl')
  async getAnalytics(@Param('shortUrl') shortUrl: string) {
    return this.analyticsMetricsUC.execute(shortUrl);
  }
}
