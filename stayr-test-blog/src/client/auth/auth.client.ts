import { Inject, Injectable } from '@nestjs/common';
// import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
// import { join } from 'path';
import { Observable } from 'rxjs';
// import { handleObservable } from '../clien.util';
import { Request } from '../client.request';
import { ValidateTokenRequest } from './request/validate-token.request';
import { ValidateTokenResponse } from './response/validate-token.response';

export interface AuthService {
  validateToken(token: ValidateTokenRequest): Observable<ValidateTokenResponse>;
}

@Injectable()
export class AuthClient {
  // @Client({
  //   transport: Transport.GRPC,
  //   options: {
  //     package: 'auth',
  //     protoPath: join(__dirname, './auth.proto'),
  //   },
  // })
  // client: ClientGrpc;

  // authService: AuthService;

  @Inject('AUTH_REQUEST')
  authRequest: Request;

  // onModuleInit() {
  //   this.authService = this.client.getService<AuthService>('AuthService');
  // }

  // validateToken(token: string) {
  //   return handleObservable(this.authService.validateToken({ token }));
  // }

  validateToken(token: string) {
    return this.authRequest.post<ValidateTokenResponse>('/auth/validateToken', {
      token,
    });
  }
}
