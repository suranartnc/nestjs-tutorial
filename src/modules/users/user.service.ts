import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findByName(name: string) {
    return this.userRepository.findByName(name);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
