import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const CreateCompanySchema = z.object({
  originalUrl: z.string(),
  expiresAt: z.date().optional(),
  alias: z.string().optional(),
});

export class CreateUrlDto extends createZodDto(CreateCompanySchema){
  originalUrl: string;
  expiresAt?: Date;
  alias?: string;
}
