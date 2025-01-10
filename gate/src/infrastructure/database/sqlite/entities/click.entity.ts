import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UrlEntity } from './url.entity';

@Entity('click')
export class ClickEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ipAddress: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UrlEntity, (url) => url.clicks)
  url: UrlEntity;
}
