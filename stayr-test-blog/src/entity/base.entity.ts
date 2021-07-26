import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CustomBaseEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @CreateDateColumn({
    default: `now()`,
    nullable: true,
  })
  createdDate: Date;

  @ApiProperty()
  @UpdateDateColumn({
    default: `now()`,
    nullable: true,
  })
  updatedDate: Date;

  @ApiProperty()
  @Column({
    default: true,
  })
  isActive: boolean;
}
