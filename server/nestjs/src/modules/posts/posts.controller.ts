import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';

@Controller('/posts')
@ApiTags('/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/')
  async getAllPosts() {
    return await this.postsService.getAllPosts();
  }

  @Get('/:postId')
  async getPostById(@Param('postId') postId: number) {
    return await this.postsService.getPostById({ postId: Number(postId) });
  }

  @Post('/')
  async createPost(@Body() dto: CreatePostDto) {
    return await this.postsService.createPost(dto);
  }

  @Delete('/:postId')
  async deletePost(@Param('postId') postId: number) {
    return await this.postsService.deletePost({ postId: Number(postId) });
  }
}
