import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/globalConfig';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    ConfigModule.forRoot({  
      load: [configuration],
      // isGlobal: true,
    }), 
    CatsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
