import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseProviders } from './database.providers';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Nhập ConfigModule nếu bạn cần ConfigService
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: configService.get('POSTGRES_SYNC'),
      }),
    }),
  ],
  providers: [...DatabaseProviders], // Chỉ cung cấp các provider ở đây
  exports: [...DatabaseProviders, 'DATA_SOURCE'], // Xuất các provider cần thiết
})
export class DatabaseModule {}