import { Module } from '@nestjs/common';
import { AwsSecret } from '../module/secret/secret.module';
import { AuthClient } from './auth/auth.client';
import { Request } from './client.request';

@Module({
  providers: [
    AuthClient,
    {
      provide: 'AUTH_REQUEST',
      useFactory: async (awsSecret: AwsSecret) => {
        const secret = await awsSecret.getSecret();
        return new Request(secret.AUTH_SERVICE_URL);
      },
      inject: [AwsSecret],
    },
  ],
  exports: [AuthClient],
})
export class ClientModule {}
