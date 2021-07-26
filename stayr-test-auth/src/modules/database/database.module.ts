import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AwsSecret, SecretModule } from '../secret/secret.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [SecretModule],
      inject: [AwsSecret],
      useFactory: async (awsSecret: AwsSecret) => {
        const secret = await awsSecret.getSecret();
        const connectionOptions: TypeOrmModuleOptions = {
          type: 'postgres',
          host: secret.AUTH_POSTGRES_HOST,
          port: secret.AUTH_POSTGRES_PORT,
          username: secret.AUTH_POSTGRES_USERNAME,
          password: secret.AUTH_POSTGRES_PASSWORD,
          database: secret.AUTH_POSTGRES_DATABASE,
          entities: ['dist/**/*.entity.js'],
        };
        return connectionOptions;
      },
    }),
  ],
})
export class DatabaseModule {}
