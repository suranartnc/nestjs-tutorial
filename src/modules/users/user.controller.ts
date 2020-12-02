import { Controller, Get, Query, CacheKey, CacheTTL } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @CacheKey('users/findAll')
  @CacheTTL(60)
  async findAll() {
    return this.userService.findAll();
  }

  @Get('findByName')
  @CacheKey('users/findByName')
  @CacheTTL(60)
  async findByName(@Query() query) {
    const { firstName, lastName } = query;
    return this.userService.findByName(firstName, lastName);
  }
}
