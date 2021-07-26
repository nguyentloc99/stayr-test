import { Blog } from '../../entity/blog.entity';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../base.repository';

@EntityRepository(Blog)
export class BlogRepository extends BaseRepository<Blog> {}
