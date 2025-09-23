import { IsEmail, IsString, Length } from 'class-validator';

export class UserDto {
  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @Length(6, 32, { message: 'Password must be between 6 and 32 characters' })
  password: string;

  @IsString({ message: 'First name must be a string' })
  firstName: string;

  @IsString({ message: 'Last name must be a string' })
  lastName: string;

  @IsString({ message: 'Role must be a string' })
  role: string;

  @IsString({ message: 'Phone must be a string' })
  @Length(10, 15, { message: 'Phone must be between 10 and 15 characters' })
  phone: string;
}
