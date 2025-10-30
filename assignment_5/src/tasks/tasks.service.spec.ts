import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.entity';
import { User, UserRole } from '../users/user.entity';

describe('TasksService', () => {
  let service: TasksService;
  let repository: Repository<Task>;

  const mockTaskRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a task successfully', async () => {
      const createTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
        status: TaskStatus.TODO,
        assignedToId: 'user-1',
        dueDate: '2024-12-31',
      };

      const task = { id: '1', ...createTaskDto };
      mockTaskRepository.create.mockReturnValue(task);
      mockTaskRepository.save.mockResolvedValue(task);

      const result = await service.create(createTaskDto);

      expect(result).toEqual(task);
      expect(mockTaskRepository.create).toHaveBeenCalledWith(createTaskDto);
      expect(mockTaskRepository.save).toHaveBeenCalledWith(task);
    });
  });

  describe('findOne', () => {
    it('should return a task for admin', async () => {
      const task = {
        id: '1',
        title: 'Test Task',
        assignedToId: 'user-1',
      };
      const adminUser: User = {
        id: 'admin-1',
        role: UserRole.ADMIN,
      } as User;

      mockTaskRepository.findOne.mockResolvedValue(task);

      const result = await service.findOne('1', adminUser);

      expect(result).toEqual(task);
    });

    it('should throw NotFoundException if task not found', async () => {
      const user: User = { id: 'user-1', role: UserRole.USER } as User;
      mockTaskRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('999', user)).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if user tries to access other user task', async () => {
      const task = {
        id: '1',
        title: 'Test Task',
        assignedToId: 'user-2',
      };
      const user: User = { id: 'user-1', role: UserRole.USER } as User;

      mockTaskRepository.findOne.mockResolvedValue(task);

      await expect(service.findOne('1', user)).rejects.toThrow(ForbiddenException);
    });
  });
});
