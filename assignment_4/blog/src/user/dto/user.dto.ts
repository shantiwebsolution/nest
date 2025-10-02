import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UserDTO {
  @IsString({ message: 'User name must be a string' })
  @IsNotEmpty({ message: 'User name is required' })
  user_name: string;

  @IsString({ message: 'Mobile number must be a string' })
  @Length(10, 15, {
    message: 'Mobile number must be between 10 and 15 characters',
  })
  user_mobile: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  user_email: string;
}
