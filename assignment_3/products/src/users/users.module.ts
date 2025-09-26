import { Module } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { UsersService } from './users.service';

@Module({
  providers: [LoggerService, UsersService],
  exports: [LoggerService, UsersService],
})
export class UsersModule {}
