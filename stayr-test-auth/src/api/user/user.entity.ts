import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from '../base.entity';

@Entity({ name: 'users' })
export class User extends CustomBaseEntity {
  @ApiProperty()
  @Column()
  firebaseUid: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  dob: string;
}
