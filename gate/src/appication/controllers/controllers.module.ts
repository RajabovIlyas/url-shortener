import { Module } from '@nestjs/common';
import { UseCasesModule } from '@/domain/use-cases';
import { UrlController } from '@/appication/controllers/url.controller';

@Module({
  imports: [UseCasesModule],
  controllers: [UrlController],
})
export class ControllersModule {}
