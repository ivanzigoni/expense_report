import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: Number(configService.get('DB_PORT')),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      entities: [__dirname + 'src/modules/database/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/src/modules/database/migrations/**/*{.ts,.js}']
    }),
    inject: [ConfigService],
  })]
})
export class DatabaseModule {}
