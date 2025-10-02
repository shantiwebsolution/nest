import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { PostDTO } from './dto/post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async getPosts(search?: string): Promise<Post[]> {
    if (search) {
      return this.postRepository.find({
        where: [{ title: Like(`%${search}%`) }],
        relations: ['user'],
      });
    }

    return this.postRepository.find({
      relations: ['user'],
    });
  }

  async getPostById(id: number): Promise<Post | null> {
    return this.postRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async getPostsByUserId(userId: number): Promise<Post[]> {
    return this.postRepository.find({
      where: { user_id: userId },
      relations: ['user'],
    });
  }

  async createPost(post: PostDTO): Promise<Post> {
    const newPost = this.postRepository.create({
      title: post.title,
      description: post.description,
      user_id: post.user,
    });
    return this.postRepository.save(newPost);
  }

  async updatePost(id: number, post: PostDTO): Promise<Post | null> {
    await this.postRepository.update(id, {
      title: post.title,
      description: post.description,
      user_id: post.user,
    });
    return this.postRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async deletePost(id: number): Promise<{ message: string }> {
    const result = await this.postRepository.delete(id);
    if (result.affected && result.affected > 0) {
      return { message: `Post with id ${id} deleted` };
    }
    return { message: 'Post not found' };
  }
}
