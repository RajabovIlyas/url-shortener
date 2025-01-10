import { Module } from '@nestjs/common';
import { RepositoriesModule } from '@/infrastructure/database/sqlite/repositories';
import { providers } from '@/domain/use-cases/providers';

@Module({
  imports: [RepositoriesModule],
  providers: providers,
  exports: providers,
})
export class UseCasesModule {}
