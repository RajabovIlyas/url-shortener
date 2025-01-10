import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControllersModule } from '@/appication/controllers';

describe('UrlController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'database-test.sqlite',
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
        ControllersModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a short URL with a unique alias', async () => {
    const response = await request(app.getHttpServer())
      .post('/shorten')
      .send({
        originalUrl: 'https://google.com',
        alias: 'my-custom-alias',
      })
      .expect(201);

    expect(response.body).toHaveProperty('shortUrl', 'my-custom-alias');
    expect(response.body).toHaveProperty('originalUrl', 'https://google.com');
  });

  it('should redirect to the original URL', async () => {
    const response = await request(app.getHttpServer())
      .get('/my-custom-alias')
      .expect(302);

    expect(response.headers.location).toBe('https://google.com');
  });

  it('should return 400 if alias is not unique', async () => {
    await request(app.getHttpServer())
      .post('/shorten')
      .send({
        originalUrl: 'https://another-google.com',
        alias: 'my-custom-alias',
      })
      .expect(400);
  });
});
