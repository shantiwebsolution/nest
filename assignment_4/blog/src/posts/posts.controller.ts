import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostDTO } from './dto/post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(@Query('title') title?: string) {
    return this.postsService.getPosts(title);
  }

  @Get(':id')
  getPostById(@Param('id') id: number) {
    return this.postsService.getPostById(id);
  }

  @Post()
  createPost(@Body() post: PostDTO) {
    return this.postsService.createPost(post);
  }

  @Put(':id')
  updatePost(@Param('id') id: number, @Body() post: PostDTO) {
    return this.postsService.updatePost(id, post);
  }

  @Delete(':id')
  deletePost(@Param('id') id: number) {
    return this.postsService.deletePost(id);
  }
}
