import { Module } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import { AwsSecret, SecretModule } from '../../module/secret/secret.module';

@Module({
  imports: [SecretModule],
  providers: [
    {
      provide: firebaseAdmin.firestore.Firestore,
      useFactory: async (awsSecret: AwsSecret) => {
        try {
          const secret = await awsSecret.getSecret();
          return firebaseAdmin
            .initializeApp({
              credential: firebaseAdmin.credential.cert(
                secret.FIREBASE_CREDENTIALS,
              ),
              databaseURL: secret.FIREBASE_URL,
            })
            .firestore();
        } catch (e) {
          console.log('===Initiate Firebase Fail===');
          process.exit();
        }
      },
      inject: [AwsSecret],
    },
  ],
  exports: [firebaseAdmin.firestore.Firestore],
})
export class FirebaseModule {}
