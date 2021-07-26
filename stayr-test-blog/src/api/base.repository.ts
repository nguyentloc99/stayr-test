import { PaginationData, PaginationOptions } from '../model/pagination';
import { BaseEntity, FindManyOptions, Repository } from 'typeorm';

export class BaseRepository<T extends BaseEntity> extends Repository<T> {
  async findPaginate(
    paginateOptions: PaginationOptions,
    options: FindManyOptions<T> = {},
  ): Promise<PaginationData<T>> {
    if (!paginateOptions.page || paginateOptions.page < 1) {
      paginateOptions.page = 1;
    }
    if (!paginateOptions.pageSize) {
      paginateOptions.pageSize = 20;
    }
    const { page, pageSize } = paginateOptions;
    if (pageSize > 0) {
      const skipNumber = (page - 1) * pageSize;
      options.skip = skipNumber;
      options.take = pageSize;
    }
    const [data, total] = await this.findAndCount(options);
    return {
      data,
      total,
      page,
      pageSize: pageSize > 0 ? pageSize : total,
      totalPage: pageSize > 0 ? Math.ceil(total / paginateOptions.pageSize) : 1,
    };
  }
}
