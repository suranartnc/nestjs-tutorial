import { Module, HttpModule, CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  imports: [
    ConfigModule, 
    HttpModule.register({
      timeout: 5000,
    }),
    CacheModule.register({
      ttl: 5, // seconds
      max: 10, // maximum number of items in cache
    }),
  ],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService]
})
export class CatsModule {}