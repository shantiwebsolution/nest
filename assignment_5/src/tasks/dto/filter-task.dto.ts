import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { TaskStatus } from '../task.entity';

export class FilterTaskDto {
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsString()
  @IsOptional()
  title?: string;

  @IsUUID()
  @IsOptional()
  customerId?: string;

  @IsUUID()
  @IsOptional()
  assignedToId?: string;
}
