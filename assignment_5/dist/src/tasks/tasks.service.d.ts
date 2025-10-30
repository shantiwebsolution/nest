import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { User } from '../users/user.entity';
export declare class TasksService {
    private taskRepository;
    constructor(taskRepository: Repository<Task>);
    create(createTaskDto: CreateTaskDto): Promise<Task>;
    findAll(filterDto: FilterTaskDto, user: User): Promise<Task[]>;
    findOne(id: string, user: User): Promise<Task>;
    update(id: string, updateTaskDto: UpdateTaskDto, user: User): Promise<Task>;
    remove(id: string, user: User): Promise<void>;
}
