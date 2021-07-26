import {
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthClient } from '../client/auth/auth.client';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  @Inject()
  authClient: AuthClient;

  use(req: Request, res: Response, next: NextFunction) {
    const testPublicRouteRegex = /([\/]?)public([\/]?)/;
    console.log(req.originalUrl);
    if (testPublicRouteRegex.test(req.originalUrl)) {
      return next();
    }
    const token = req.headers?.authorization || '';
    if (!token) {
      throw new UnauthorizedException();
    }
    this.authClient
      .validateToken(token)
      .then((result) => {
        req.user = result;
        next();
      })
      .catch((err) => {
        console.log(err);
        res
          .status(401)
          .send({
            statusCode: 401,
            message: 'Invalid token',
          })
          .end();
      });
  }
}
