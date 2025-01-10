export interface Url {
  id: string;

  originalUrl: string;

  shortUrl: string;

  expiresAt?: Date;

  clickCount: number;

  createdAt: Date;
}
