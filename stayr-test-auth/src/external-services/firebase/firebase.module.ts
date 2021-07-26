import { FirebaseAuthService } from './firebase-auth/fire-base.auth.service';
import { Module } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import { AwsSecret, SecretModule } from '../../modules/secret/secret.module';

@Module({
  imports: [SecretModule],
  providers: [FirebaseAuthService],
  exports: [FirebaseAuthService],
})
export class FirebaseModule {
  constructor(
    private authService: FirebaseAuthService,
    private awsSecret: AwsSecret,
  ) {
    awsSecret
      .getSecret()
      .then((secret) => {
        const app = firebaseAdmin.initializeApp({
          credential: firebaseAdmin.credential.cert(
            secret.FIREBASE_CREDENTIALS,
          ),
          databaseURL: secret.FIREBASE_URL,
        });
        authService.firebaseApp = app;
      })
      .catch((e) => {
        console.log(e);
        console.log('===Initiate Firebase Fail===');
        process.exit();
      });
  }
}
