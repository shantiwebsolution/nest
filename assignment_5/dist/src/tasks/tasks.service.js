"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./task.entity");
const user_entity_1 = require("../users/user.entity");
let TasksService = class TasksService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async create(createTaskDto) {
        const task = this.taskRepository.create(createTaskDto);
        return this.taskRepository.save(task);
    }
    async findAll(filterDto, user) {
        const query = this.taskRepository.createQueryBuilder('task')
            .leftJoinAndSelect('task.assignedTo', 'assignedTo')
            .leftJoinAndSelect('task.customer', 'customer');
        if (user.role === user_entity_1.UserRole.USER) {
            query.where('task.assignedToId = :userId', { userId: user.id });
        }
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
    async findOne(id, user) {
        const task = await this.taskRepository.findOne({
            where: { id },
            relations: ['assignedTo', 'customer'],
        });
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
        if (user.role === user_entity_1.UserRole.USER && task.assignedToId !== user.id) {
            throw new common_1.ForbiddenException('You do not have permission to view this task');
        }
        return task;
    }
    async update(id, updateTaskDto, user) {
        const task = await this.findOne(id, user);
        if (user.role === user_entity_1.UserRole.USER && task.assignedToId !== user.id) {
            throw new common_1.ForbiddenException('You do not have permission to update this task');
        }
        Object.assign(task, updateTaskDto);
        return this.taskRepository.save(task);
    }
    async remove(id, user) {
        const task = await this.findOne(id, user);
        if (user.role === user_entity_1.UserRole.USER && task.assignedToId !== user.id) {
            throw new common_1.ForbiddenException('You do not have permission to delete this task');
        }
        await this.taskRepository.remove(task);
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TasksService);
//# sourceMappingURL=tasks.service.js.map