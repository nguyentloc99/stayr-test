import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService extends BaseService<User, UserRepository> {
  constructor(repository: UserRepository) {
    super(repository);
  }

  findByFirebaseId(firebaseId: string) {
    return this.repository.find({
      where: {
        firebaseUid: firebaseId,
      },
    });
  }
}
