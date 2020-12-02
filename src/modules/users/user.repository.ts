import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findByName(name: string) {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.photos', 'photo')
      .where('user.firstName = :name', { name })
      .getMany();
  }
}