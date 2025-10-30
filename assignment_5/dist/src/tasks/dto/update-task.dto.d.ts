import { TaskStatus } from '../task.entity';
export declare class UpdateTaskDto {
    title?: string;
    description?: string;
    status?: TaskStatus;
    dueDate?: string;
    assignedToId?: string;
    customerId?: string;
}
