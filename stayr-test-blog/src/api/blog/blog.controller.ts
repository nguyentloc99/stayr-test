import {
  Body,
  Controller,
  Get,
  Inject,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { RequestUser } from '../../decorator/request-user.decorator';
import { User } from '../../entity/user.entity';
import { Blog } from '../../entity/blog.entity';
import { BlogService } from './blog.service';
import { CreateBlogDTO } from './dto/create-blog.dto';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { PaginationData } from '../../model/pagination';

@ApiTags('Blog')
@Controller('blogs')
@ApiExtraModels(PaginationData)
export class BlogController {
  @Inject()
  private readonly blogService: BlogService;

  @ApiBearerAuth()
  @Post()
  @ApiOkResponse({ type: Blog })
  createBlog(
    @Body() createBlogDto: CreateBlogDTO,
    @RequestUser() user: User,
  ): Promise<Blog> {
    const blog: Blog = new Blog();
    blog.content = createBlogDto.content;
    blog.title = createBlogDto.title;
    blog.postById = user.id;
    return this.blogService.create(blog);
  }

  @Get('public')
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(PaginationData) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(Blog) },
            },
          },
        },
      ],
    },
  })
  getBlogs(
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
  ) {
    return this.blogService.findAllPaginate({ page, pageSize });
  }
}
