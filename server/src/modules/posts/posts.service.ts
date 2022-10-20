import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from '~/prisma/prisma.service';
import { CreatePostDto } from './dtos/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllPosts(): Promise<Post[]> {
    const post = await this.prisma.post.findMany();
    return post;
  }

  async getPostById({ postId }: { postId: number }): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) throw new NotFoundException();
    return post;
  }

  async createPost({ title, body }: CreatePostDto): Promise<Post> {
    const post = await this.prisma.post.create({
      data: { title, body },
    });

    return post;
  }

  async deletePost({ postId }: { postId: number }): Promise<string> {
    const post = await this.getPostById({ postId });
    await this.prisma.post.delete({
      where: {
        id: post.id,
      },
    });
    return `Post ${post.id} deleted successfully`;
  }
}
