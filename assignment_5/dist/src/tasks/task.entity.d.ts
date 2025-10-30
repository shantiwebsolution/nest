import { User } from '../users/user.entity';
import { Customer } from '../customers/customer.entity';
export declare enum TaskStatus {
    TODO = "todo",
    IN_PROGRESS = "in-progress",
    DONE = "done"
}
export declare class Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    dueDate: Date;
    assignedTo: User;
    assignedToId: string;
    customer: Customer;
    customerId: string;
    createdAt: Date;
    updatedAt: Date;
}
