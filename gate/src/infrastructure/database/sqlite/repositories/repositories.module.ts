import { Module } from '@nestjs/common';
import { providers } from './providers';
import { ClickEntity, UrlEntity } from '@/infrastructure/database/sqlite/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UrlEntity, ClickEntity])],
  providers: providers,
  exports: providers,
})
export class RepositoriesModule {}
