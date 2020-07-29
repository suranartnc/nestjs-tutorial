import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  imports: [ConfigModule],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService]
})
export class CatsModule {}