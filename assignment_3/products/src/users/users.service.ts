import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
  private users: UserDto[] = [
    {
      email: 'rajesh.sharma@tutedude.com',
      password: 'string',
      firstName: 'Rajesh',
      lastName: 'Sharma',
      phone: '9876543210',
      id: '3f5e3a9c-2d4b-4f13-8a8e-9b7c6a5d4e3f',
    },
    {
      email: 'nisha.verma@tutedude.com',
      password: 'string',
      firstName: 'Nisha',
      lastName: 'Verma',
      phone: '9123456780',
      id: '7b2c1d4e-8f90-4a7b-9c1d-2e3f4a5b6c7d',
    },
    {
      email: 'arjun.rao@tutedude.com',
      password: 'string',
      firstName: 'Arjun',
      lastName: 'Rao',
      phone: '9988776655',
      id: 'c1a2b3d4-e5f6-4a78-9b0c-d1e2f3a4b5c6',
    },
    {
      email: 'priya.nair@tutedude.com',
      password: 'string',
      firstName: 'Priya',
      lastName: 'Nair',
      phone: '9090909090',
      id: 'e9f8d7c6-b5a4-4c3d-8e2f-1a0b9c8d7e6f',
    },
    {
      email: 'sandeep.singh@tutedude.com',
      password: 'string',
      firstName: 'Sandeep',
      lastName: 'Singh',
      phone: '9812345678',
      id: 'a0b1c2d3-e4f5-4a6b-8c7d-9e0f1a2b3c4d',
    },
    {
      email: 'kavita.joshi@tutedude.com',
      password: 'string',
      firstName: 'Kavita',
      lastName: 'Joshi',
      phone: '9765432109',
      id: 'f1234567-89ab-4cde-8fab-0123456789ab',
    },
    {
      email: 'rohan.mehta@tutedude.com',
      password: 'string',
      firstName: 'Rohan',
      lastName: 'Mehta',
      phone: '9345678901',
      id: 'b2c3d4e5-f6a7-4b89-8c01-23d45e67f890',
    },
    {
      email: 'sneha.gupta@tutedude.com',
      password: 'string',
      firstName: 'Sneha',
      lastName: 'Gupta',
      phone: '9871203456',
      id: 'd4e5f6a7-b8c9-4d01-8e23-45f67a89b0c1',
    },
    {
      email: 'vikram.iyer@tutedude.com',
      password: 'string',
      firstName: 'Vikram',
      lastName: 'Iyer',
      phone: '9991122233',
      id: '8a9b0c1d-2e3f-4a56-8b78-90c1d2e3f4a5',
    },
    {
      email: 'jayesh.patel@tutedude.com',
      password: 'string',
      firstName: 'Jayesh',
      lastName: 'Patel',
      phone: '9898989898',
      id: '0f1e2d3c-4b5a-4a6c-8d7e-9f0a1b2c3d4e',
    },
  ];

  constructor(private logger: LoggerService) {}
  findAll(): UserDto[] {
    return this.users;
  }
  findOne(id: string): UserDto | undefined {
    if (id) {
      const normalized = id?.trim().toLowerCase();
      return this.users.find((u) => u.id.toLowerCase() === normalized);
    }
    return undefined;
  }

  create(user: UserDto): UserDto {
    this.users.push(user);
    this.logger.log(
      `New user created: ${user.firstName} ${user.lastName} with role ${user.id}`,
    );
    return user;
  }
}
