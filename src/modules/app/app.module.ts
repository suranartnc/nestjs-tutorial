import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import globalConfig from './config/global.config';
import databaseConfig from './config/database.config';
import cacheConfig from './config/cache.config';

import { CatsModule } from '../cats/cats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [globalConfig, databaseConfig, cacheConfig],
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get('cache.medium'),
      }),
      inject: [ConfigService],
    }),
    CatsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
