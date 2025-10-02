import { IsNotEmpty, IsString } from 'class-validator';

export class PostDTO {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsNotEmpty({ message: 'User ID is required' })
  user: number;
}
