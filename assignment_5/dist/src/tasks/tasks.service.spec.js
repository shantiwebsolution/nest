"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const task_entity_1 = require("./task.entity");
const user_entity_1 = require("../users/user.entity");
describe('TasksService', () => {
    let service;
    let repository;
    const mockTaskRepository = {
        create: jest.fn(),
        save: jest.fn(),
        findOne: jest.fn(),
        remove: jest.fn(),
        createQueryBuilder: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                tasks_service_1.TasksService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(task_entity_1.Task),
                    useValue: mockTaskRepository,
                },
            ],
        }).compile();
        service = module.get(tasks_service_1.TasksService);
        repository = module.get((0, typeorm_1.getRepositoryToken)(task_entity_1.Task));
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('create', () => {
        it('should create a task successfully', async () => {
            const createTaskDto = {
                title: 'Test Task',
                description: 'Test Description',
                status: task_entity_1.TaskStatus.TODO,
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
            const adminUser = {
                id: 'admin-1',
                role: user_entity_1.UserRole.ADMIN,
            };
            mockTaskRepository.findOne.mockResolvedValue(task);
            const result = await service.findOne('1', adminUser);
            expect(result).toEqual(task);
        });
        it('should throw NotFoundException if task not found', async () => {
            const user = { id: 'user-1', role: user_entity_1.UserRole.USER };
            mockTaskRepository.findOne.mockResolvedValue(null);
            await expect(service.findOne('999', user)).rejects.toThrow(common_1.NotFoundException);
        });
        it('should throw ForbiddenException if user tries to access other user task', async () => {
            const task = {
                id: '1',
                title: 'Test Task',
                assignedToId: 'user-2',
            };
            const user = { id: 'user-1', role: user_entity_1.UserRole.USER };
            mockTaskRepository.findOne.mockResolvedValue(task);
            await expect(service.findOne('1', user)).rejects.toThrow(common_1.ForbiddenException);
        });
    });
});
//# sourceMappingURL=tasks.service.spec.js.map