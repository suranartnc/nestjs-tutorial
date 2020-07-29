import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  imports: [
    ConfigModule, 
    HttpModule.register({
      timeout: 5000,
    })
  ],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService]
})
export class CatsModule {}