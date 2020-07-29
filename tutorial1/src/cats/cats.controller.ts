import { Controller, Get, Query, Post, Body, Put, Param, Delete, Res, HttpStatus } from '@nestjs/common';
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
  async findAll(): Promise<Cat[]> {
    console.log('configService', this.configService.get('port'))
    return this.catsService.findAll();
  } 
}