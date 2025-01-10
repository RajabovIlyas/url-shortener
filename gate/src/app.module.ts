import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControllersModule } from '@/appication/controllers';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: 5432,
      username: 'user',
      password: 'root',
      database: 'url-shortener',
      synchronize: true,
      autoLoadEntities: true,
    }),
    ControllersModule,
  ],
})
export class AppModule {}
