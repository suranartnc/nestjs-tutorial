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
      load: [globalConfig, databaseConfig, cacheConfig],
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get('cache.medium'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'localhost_db',
      entities: [User, Photo],
      synchronize: true, // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
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
