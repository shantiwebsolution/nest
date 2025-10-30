import { TaskStatus } from '../task.entity';
export declare class CreateTaskDto {
    title: string;
    description: string;
    status?: TaskStatus;
    dueDate?: string;
    assignedToId: string;
    customerId?: string;
}
