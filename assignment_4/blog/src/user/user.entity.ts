import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../posts/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_name: string;

  @Column()
  user_mobile: string;

  @Column()
  user_email: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
