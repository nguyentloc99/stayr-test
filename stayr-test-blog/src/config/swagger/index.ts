import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function configSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Blog Service Api Document')
    .setDescription('Api document for blog service')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
