import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  getActiveUsers(): Promise<User[]> {
    return this.createQueryBuilder()
      .where('isActive = :active', { active: true })
      .getMany();
  }
}
