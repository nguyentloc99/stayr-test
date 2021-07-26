import { Inject, Injectable } from '@nestjs/common';
import { firestore } from 'firebase-admin';
import { PaginationOptions } from '../../model/pagination';
import { Blog } from '../../entity/blog.entity';
import { BlogRepository } from './blog.repository';

interface BlogFireStoreModel {
  title: string;
  content: string;
  createdDate: Date;
  postById: number;
}

@Injectable()
export class BlogService {
  @Inject()
  firestoreDb: firestore.Firestore;

  @Inject()
  blogRepo: BlogRepository;

  async create(blog: Blog) {
    const createdBlog = await this.blogRepo.save(blog);
    const fireStoreData: BlogFireStoreModel = {
      title: createdBlog.title,
      content: createdBlog.content,
      createdDate: createdBlog.createdDate,
      postById: createdBlog.postById,
    };
    await this.firestoreDb
      .collection('blogs')
      .doc(`blogs-${createdBlog.id}`)
      .set(fireStoreData);
    return createdBlog;
  }

  async findAllPaginate(paginateOptions: PaginationOptions) {
    return this.blogRepo.findPaginate(paginateOptions);
  }

  async addRandomWordToAllBlogTitle() {
    const randomWords = ['red', 'blue', 'green', 'yellow'];
    const randomWord =
      randomWords[Math.floor(Math.random() * randomWords.length)];
    this.blogRepo
      .createQueryBuilder()
      .update()
      .set({
        title: () => `title || ' ' || :randomWord`,
      })
      .setParameter('randomWord', randomWord)
      .execute();
  }
}
