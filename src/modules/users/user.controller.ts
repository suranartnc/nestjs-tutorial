import { Controller, Get, Query, CacheTTL } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @CacheTTL(parseInt(process.env.CACHE_MEDIUM))
  async findAll() {
    return this.userService.findAll();
  }

  @Get('findByName')
  @CacheTTL(parseInt(process.env.CACHE_SHORT))
  async findByName(@Query() query) {
    const { name } = query;
    return this.userService.findByName(name);
  }
}
