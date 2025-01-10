import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClickEntity } from './click.entity';

@Entity('url')
export class UrlEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originalUrl: string;

  @Column()
  shortUrl: string;

  @Column({ nullable: true })
  expiresAt?: Date;

  @Column({ default: 0 })
  clickCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => ClickEntity, (click) => click.url)
  clicks: ClickEntity[];
}
