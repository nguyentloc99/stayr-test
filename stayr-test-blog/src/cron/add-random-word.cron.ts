import { INestApplicationContext } from '@nestjs/common';
import { BlogModule } from '../api/blog/blog.module';
import { BlogService } from '../api/blog/blog.service';

export async function cronAddRandomWord(app: INestApplicationContext) {
  const blogService = app.select(BlogModule).get(BlogService, { strict: true });
  await blogService.addRandomWordToAllBlogTitle();
}
