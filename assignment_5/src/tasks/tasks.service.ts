import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { User, UserRole } from '../users/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  async findAll(filterDto: FilterTaskDto, user: User): Promise<Task[]> {
    const query = this.taskRepository.createQueryBuilder('task')
      .leftJoinAndSelect('task.assignedTo', 'assignedTo')
      .leftJoinAndSelect('task.customer', 'customer');

    // Apply role-based filtering
    if (user.role === UserRole.USER) {
      // Regular users can only see their own tasks
      query.where('task.assignedToId = :userId', { userId: user.id });
    }

    // Apply filters
    if (filterDto.status) {
      query.andWhere('task.status = :status', { status: filterDto.status });
    }

    if (filterDto.title) {
      query.andWhere('task.title ILIKE :title', { title: `%${filterDto.title}%` });
    }

    if (filterDto.customerId) {
      query.andWhere('task.customerId = :customerId', { customerId: filterDto.customerId });
    }

    if (filterDto.assignedToId) {
      query.andWhere('task.assignedToId = :assignedToId', { assignedToId: filterDto.assignedToId });
    }

    return query.getMany();
  }

  async findOne(id: string, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['assignedTo', 'customer'],
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    // Check if user has permission to view this task
    if (user.role === UserRole.USER && task.assignedToId !== user.id) {
      throw new ForbiddenException('You do not have permission to view this task');
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, user: User): Promise<Task> {
    const task = await this.findOne(id, user);

    // Check if user has permission to update this task
    if (user.role === UserRole.USER && task.assignedToId !== user.id) {
      throw new ForbiddenException('You do not have permission to update this task');
    }

    Object.assign(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

  async remove(id: string, user: User): Promise<void> {
    const task = await this.findOne(id, user);

    // Check if user has permission to delete this task
    if (user.role === UserRole.USER && task.assignedToId !== user.id) {
      throw new ForbiddenException('You do not have permission to delete this task');
    }

    await this.taskRepository.remove(task);
  }
}
