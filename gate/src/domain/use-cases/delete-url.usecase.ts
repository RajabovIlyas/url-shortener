import { Injectable } from '@nestjs/common';
import { UrlRepository } from '@/domain/repositories';

@Injectable()
export class DeleteUrlUC {
  constructor(private readonly urlRepo: UrlRepository) {}

  async execute(shortUrl: string): Promise<void> {
    await this.urlRepo.deleteUrl(shortUrl);
  }
}
