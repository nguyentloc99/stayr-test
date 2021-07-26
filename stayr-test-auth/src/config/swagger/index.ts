import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function configSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Auth Service Api Doc')
    .setDescription('Api document for blog service')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
