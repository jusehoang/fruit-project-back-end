import { ApiModule } from './module/api/api.module';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import configuration from './@core/config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseProviderFactory } from './@core/providers/database.provider';
import { CoreModule } from './@core/core.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: databaseProviderFactory,
      inject: [ConfigService]
    }),
    CoreModule,
    ApiModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
