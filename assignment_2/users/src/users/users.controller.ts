import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query('role') role: string): any {
    return this.usersService.findAll(role);
  }

  @Post()
  create(@Body() user: UserDto) {
    return this.usersService.create(user);
  }
}
