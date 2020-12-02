import { Controller, Get, CacheKey, CacheTTL } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @CacheKey('users/findAll')
  @CacheTTL(60)
  async findAll() {
    return this.usersService.findAll();
  }
}
