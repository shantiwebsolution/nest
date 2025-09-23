import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
  private users: UserDto[] = [];

  findAll(role): UserDto[] {
    // If role is provided, filter users by role
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  create(user: UserDto): UserDto {
    this.users.push(user);
    return user;
  }
}
