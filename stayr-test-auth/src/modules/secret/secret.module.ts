import { Global, Injectable, Module } from '@nestjs/common';
import { SecretsManager } from 'aws-sdk';

interface AwsSecretModel {
  FIREBASE_URL?: string;
  FIREBASE_CREDENTIALS?: Record<string, string>;
  AUTH_POSTGRES_HOST?: string;
  AUTH_POSTGRES_PORT?: number;
  AUTH_POSTGRES_USERNAME?: string;
  AUTH_POSTGRES_PASSWORD?: string;
  AUTH_POSTGRES_DATABASE?: string;
}

@Injectable()
export class AwsSecret {
  client: SecretsManager;

  constructor() {
    const region = process.env.AWS_REGION || 'ap-southeast-1';
    this.client = new SecretsManager({
      region,
    });
  }

  getSecret(secretName: string = process.env.SECRET_NAME || 'dev/stayr-test') {
    return this.client
      .getSecretValue({
        SecretId: secretName,
      })
      .promise()
      .then((data) => {
        try {
          const secretString = data.SecretString || '';
          const secret: AwsSecretModel = JSON.parse(secretString);
          return secret;
        } catch (err) {
          throw err;
        }
      });
  }
}

@Global()
@Module({
  providers: [AwsSecret],
  exports: [AwsSecret],
})
export class SecretModule {}
