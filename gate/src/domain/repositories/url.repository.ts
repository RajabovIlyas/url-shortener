import { Url } from '@/domain/entities';
import { CreateUrlDto } from '@/appication/dtos/create-url.dto';

export abstract class UrlRepository {
  abstract create(saveData: CreateUrlDto): Promise<Url>;

  abstract findByShortUrl(shortUrl: string): Promise<Url>;

  abstract incrementClickCount(shortUrl: string): Promise<void>;

  abstract deleteUrl(shortUrl: string): Promise<void>;
}
