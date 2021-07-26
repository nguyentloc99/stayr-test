import { Injectable } from '@nestjs/common';
import { app, auth } from 'firebase-admin';
import { handleAuthError } from '../firebase.utils';

@Injectable()
export class FirebaseAuthService {
  firebaseApp: app.App;

  async createUser(req: auth.CreateRequest) {
    let createdUser: auth.UserRecord;
    try {
      createdUser = await this.firebaseApp.auth().createUser(req);
    } catch (e) {
      handleAuthError(e);
    }
    return createdUser;
  }

  async removeUser(uid: string) {
    return this.firebaseApp.auth().deleteUser(uid);
  }

  async verifyToken(token: string) {
    try {
      return this.firebaseApp.auth().verifyIdToken(token);
    } catch (e) {
      handleAuthError(e);
    }
  }
}
