import { Module } from '@nestjs/common';
import { FirebaseModule } from '../../external-services/firebase/firebase.module';
import { ClientModule } from '../../client/client.module';
import { BlogController } from './blog.controller';
import { BlogRepository } from './blog.repository';
import { BlogService } from './blog.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [BlogController],
  providers: [BlogService],
  exports: [BlogService],
  imports: [
    ClientModule,
    FirebaseModule,
    TypeOrmModule.forFeature([BlogRepository]),
  ],
})
export class BlogModule {}
