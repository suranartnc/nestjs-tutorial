import { Controller, Get, Query, Post, Body, Put, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { CreateCatDto } from './dto';
import { CatsService } from './cats.service'
import { Cat } from './interfaces/cat.interface'

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto, @Res() res: Response) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  } 
}