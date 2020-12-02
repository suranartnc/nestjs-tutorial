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
import { CatService } from './cat.service';

@Controller('cats')
export class CatController {
  constructor(
    private catService: CatService,
    private configService: ConfigService,
  ) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto, @Res() res: Response) {
    this.catService.create(createCatDto);
  }

  @Get()
  @CacheKey('cats/findAll')
  @CacheTTL(60)
  async findAll() {
    return this.catService.findAll();
  }
}
