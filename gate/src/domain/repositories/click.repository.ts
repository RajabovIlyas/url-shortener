import { Click } from '@/domain/entities';
import { CreateClickDto } from '@/appication/dtos/create-click.dto';

export abstract class ClickRepository {
  abstract logClick(saveData: CreateClickDto): Promise<void>;

  abstract getAnalytics(urlId: string): Promise<Click[]>;
}
