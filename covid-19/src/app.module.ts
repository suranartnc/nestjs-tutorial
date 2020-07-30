import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import globalConfig from './config/global.config';
import databaseConfig from './config/database.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    ConfigModule.forRoot({  
      load: [globalConfig, databaseConfig],
      // isGlobal: true,
    }), 
    CatsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
