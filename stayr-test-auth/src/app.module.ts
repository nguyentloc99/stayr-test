import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [ApiModule, DatabaseModule],
})
export class AppModule {}
