import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { ClientModule } from './client/client.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { DatabaseModule } from './module/database/database.module';

@Module({
  imports: [ApiModule, ClientModule, DatabaseModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
