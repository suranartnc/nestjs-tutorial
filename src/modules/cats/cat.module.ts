import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CatController } from './cat.controller';
import { CatService } from './cat.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({
      timeout: 5000,
    }),
  ],
  controllers: [CatController],
  providers: [CatService],
  exports: [CatService],
})
export class CatModule {}
