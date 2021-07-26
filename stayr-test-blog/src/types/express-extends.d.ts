/// <reference types="express" />

import { User } from '../../entity/user.entity';
declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
