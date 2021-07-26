import { ApiProperty } from '@nestjs/swagger';

export class PaginationOptions {
  page: number;

  pageSize: number;
}

export class PaginationData<T> {
  data: T[];

  @ApiProperty()
  page: number;

  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  totalPage: number;
}
