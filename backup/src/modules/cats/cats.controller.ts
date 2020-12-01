import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  CacheKey,
  CacheTTL,
} from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(
    private catsService: CatsService,
    private configService: ConfigService,
  ) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto, @Res() res: Response) {
    this.catsService.create(createCatDto);
  }

  @Get()
  @CacheKey('cats/findAll')
  @CacheTTL(60)
  async findAll() {
    return this.catsService.findAll();
  }
}
