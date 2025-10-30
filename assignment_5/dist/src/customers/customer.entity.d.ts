import { Task } from '../tasks/task.entity';
export declare class Customer {
    id: string;
    name: string;
    email: string;
    company: string;
    contact: string;
    tasks: Task[];
    createdAt: Date;
    updatedAt: Date;
}
