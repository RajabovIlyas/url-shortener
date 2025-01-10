import { Injectable } from '@nestjs/common';
import { UrlRepository } from '@/domain/repositories';
import { CreateUrlDto } from '@/appication/dtos/create-url.dto';
import { Url } from '@/domain/entities';

@Injectable()
export class CreateUrlUC {
  constructor(private readonly urlRepo: UrlRepository) {}

  async execute(input: CreateUrlDto): Promise<Url> {
    return this.urlRepo.create(input);
  }
}
