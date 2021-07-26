import { CustomBaseEntity } from './base.entity';

export class User extends CustomBaseEntity {
  firebaseUid: string;

  name: string;

  dob: string;
}
