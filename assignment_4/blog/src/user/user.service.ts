import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async createUser(user: UserDTO): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async updateUser(id: number, user: UserDTO): Promise<User | null> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOneBy({ id });
  }

  async deleteUser(id: number): Promise<{ message: string }> {
    const result = await this.userRepository.delete(id);
    if (result.affected && result.affected > 0) {
      return { message: `User with id ${id} deleted` };
    }
    return { message: 'User not found' };
  }
  searchUsers(name: string): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.user_name LIKE :name', { name: `%${name}%` })
      .getMany();
  }
}
