import { ClickRepository, UrlRepository } from '@/domain/repositories';
import { ClickSqLiteRepository } from '@/infrastructure/database/sqlite/repositories/click.repository';
import { UrlSqLiteRepository } from '@/infrastructure/database/sqlite/repositories/url.repository';

export const providers = [
  {
    provide: ClickRepository,
    useClass: ClickSqLiteRepository,
  },
  {
    provide: UrlRepository,
    useClass: UrlSqLiteRepository,
  },
]