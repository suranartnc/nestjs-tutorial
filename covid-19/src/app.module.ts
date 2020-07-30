import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import globalConfig from './config/global.config';
import databaseConfig from './config/database.config';
import cacheConfig from './config/cache.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    ConfigModule.forRoot({  
      load: [globalConfig, databaseConfig, cacheConfig],
      // isGlobal: true,
    }), 
    CacheModule.register({
      ttl: 5, // seconds
      max: 10, // maximum number of items in cache
    }),
    CatsModule
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    }
  ],
})
export class AppModule {}
