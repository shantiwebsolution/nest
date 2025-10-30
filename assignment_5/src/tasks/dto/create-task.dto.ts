import { IsEnum, IsNotEmpty, IsString, IsUUID, IsOptional, IsDateString } from 'class-validator';
import { TaskStatus } from '../task.entity';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsUUID()
  @IsNotEmpty()
  assignedToId: string;

  @IsUUID()
  @IsOptional()
  customerId?: string;
}
