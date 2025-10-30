import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { User } from '../users/user.entity';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: CreateTaskDto): Promise<import("./task.entity").Task>;
    findAll(filterDto: FilterTaskDto, user: User): Promise<import("./task.entity").Task[]>;
    findOne(id: string, user: User): Promise<import("./task.entity").Task>;
    update(id: string, updateTaskDto: UpdateTaskDto, user: User): Promise<import("./task.entity").Task>;
    remove(id: string, user: User): Promise<void>;
}
