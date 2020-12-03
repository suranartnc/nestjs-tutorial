import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import globalConfig from '@modules/app/config/global.config';
import databaseConfig from '@modules/app/config/database.config';
import cacheConfig from '@modules/app/config/cache.config';
import { CatModule } from '@modules/cats/cat.module';
import { UserModule } from '@modules/users/user.module';
import { User } from '@modules/users/user.entity';
import { Photo } from '@modules/photos/photo.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
      load: [globalConfig, databaseConfig, cacheConfig],
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        ttl: config.get('cache.medium'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('database.host'),
        port: config.get('database.port'),
        username: config.get('database.username'),
        password: config.get('database.password'),
        database: config.get('database.db'),
        entities: [User, Photo],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    CatModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
