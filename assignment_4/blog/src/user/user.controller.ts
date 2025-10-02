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
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
  @Get('search')
  searchUsers(@Query('name') name: string) {
    return this.userService.searchUsers(name);
  }
  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }
  @Post()
  createUser(@Body() user: UserDTO) {
    return this.userService.createUser(user);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() user: UserDTO) {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
