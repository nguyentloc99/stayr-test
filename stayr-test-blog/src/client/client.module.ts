import { Module } from '@nestjs/common';
import { AuthClient } from './auth/auth.client';
import { Request } from './client.request';

@Module({
  providers: [
    AuthClient,
    {
      provide: 'AUTH_REQUEST',
      useFactory: () => {
        return new Request(
          'https://mabndmcakd.execute-api.ap-southeast-1.amazonaws.com/dev/v1',
        );
      },
    },
  ],
  exports: [AuthClient],
})
export class ClientModule {}
