import { Task } from '../tasks/task.entity';
export declare enum UserRole {
    USER = "user",
    ADMIN = "admin"
}
export declare class User {
    id: string;
    email: string;
    password: string;
    name: string;
    role: UserRole;
    tasks: Task[];
    createdAt: Date;
    updatedAt: Date;
}
