import { INestApplication, ValidationPipe } from '@nestjs/common';
import { configSwagger } from './swagger';

export default async function configApp(app: INestApplication) {
  console.log('===Config App===');
  app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe());
  await configSwagger(app);
}
