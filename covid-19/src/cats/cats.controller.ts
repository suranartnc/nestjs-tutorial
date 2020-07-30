import { Controller, Get, Query, Post, Body, Put, Param, Delete, Res, CacheKey, CacheTTL } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface'
import { CatsService } from './cats.service'

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService, private configService: ConfigService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto, @Res() res: Response) {
    this.catsService.create(createCatDto);
  }

  @Get()
  @CacheKey('cats/findAll')
  @CacheTTL(5)
  async findAll() {
    console.log('global config', this.configService.get('global'))
    console.log('database config', this.configService.get('database'))

    return this.catsService.findAll();
  } 
}