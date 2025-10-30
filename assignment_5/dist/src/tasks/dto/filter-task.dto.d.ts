import { TaskStatus } from '../task.entity';
export declare class FilterTaskDto {
    status?: TaskStatus;
    title?: string;
    customerId?: string;
    assignedToId?: string;
}
