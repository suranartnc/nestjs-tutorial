import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';

import globalConfig from '@modules/app/config/global.config';
import databaseConfig from '@modules/app/config/database.config';
import cacheConfig from '@modules/app/config/cache.config';

import { CatsModule } from '@modules/cats/cats.module';

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
