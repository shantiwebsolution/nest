"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const request = require("supertest");
const user_entity_1 = require("../src/users/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const user_entity_2 = require("../src/users/user.entity");
const task_entity_1 = require("../src/tasks/task.entity");
const customer_entity_1 = require("../src/customers/customer.entity");
const auth_module_1 = require("../src/auth/auth.module");
const users_module_1 = require("../src/users/users.module");
const tasks_module_1 = require("../src/tasks/tasks.module");
const customers_module_1 = require("../src/customers/customers.module");
describe('CRM Task Manager (e2e)', () => {
    let app;
    let adminToken;
    let userToken;
    let userId;
    let taskId;
    let customerId;
    beforeAll(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                }),
                typeorm_1.TypeOrmModule.forRoot({
                    type: 'postgres',
                    host: process.env.DB_HOST || 'localhost',
                    port: parseInt(process.env.DB_PORT, 10) || 5432,
                    username: process.env.DB_USERNAME || 'postgres',
                    password: process.env.DB_PASSWORD || 'postgres',
                    database: process.env.DB_DATABASE || 'crm_task_manager',
                    entities: [user_entity_2.User, task_entity_1.Task, customer_entity_1.Customer],
                    synchronize: true,
                    dropSchema: true,
                }),
                auth_module_1.AuthModule,
                users_module_1.UsersModule,
                tasks_module_1.TasksModule,
                customers_module_1.CustomersModule,
            ],
        }).compile();
        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }));
        await app.init();
    });
    afterAll(async () => {
        await app.close();
    });
    describe('Authentication', () => {
        it('/auth/register (POST) - should register admin', () => {
            return request(app.getHttpServer())
                .post('/auth/register')
                .send({
                email: 'admin@example.com',
                password: 'admin123',
                name: 'Admin User',
                role: user_entity_1.UserRole.ADMIN,
            })
                .expect(201)
                .then((response) => {
                expect(response.body).toHaveProperty('access_token');
                expect(response.body).toHaveProperty('user');
                expect(response.body.user.role).toBe(user_entity_1.UserRole.ADMIN);
                adminToken = response.body.access_token;
            });
        });
        it('/auth/register (POST) - should register regular user', () => {
            return request(app.getHttpServer())
                .post('/auth/register')
                .send({
                email: 'user@example.com',
                password: 'user123',
                name: 'Regular User',
                role: user_entity_1.UserRole.USER,
            })
                .expect(201)
                .then((response) => {
                expect(response.body).toHaveProperty('access_token');
                expect(response.body).toHaveProperty('user');
                expect(response.body.user.role).toBe(user_entity_1.UserRole.USER);
                userToken = response.body.access_token;
                userId = response.body.user.id;
            });
        });
        it('/auth/login (POST) - should login admin', () => {
            return request(app.getHttpServer())
                .post('/auth/login')
                .send({
                email: 'admin@example.com',
                password: 'admin123',
            })
                .expect(201)
                .then((response) => {
                expect(response.body).toHaveProperty('access_token');
            });
        });
        it('/auth/register (POST) - should fail with duplicate email', () => {
            return request(app.getHttpServer())
                .post('/auth/register')
                .send({
                email: 'admin@example.com',
                password: 'admin123',
                name: 'Another Admin',
            })
                .expect(409);
        });
    });
    describe('Customers', () => {
        it('/customers (POST) - should create customer', () => {
            return request(app.getHttpServer())
                .post('/customers')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                name: 'Test Customer',
                email: 'customer@example.com',
                company: 'Test Company',
                contact: '1234567890',
            })
                .expect(201)
                .then((response) => {
                expect(response.body).toHaveProperty('id');
                expect(response.body.name).toBe('Test Customer');
                customerId = response.body.id;
            });
        });
        it('/customers (GET) - should get all customers', () => {
            return request(app.getHttpServer())
                .get('/customers')
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(200)
                .then((response) => {
                expect(Array.isArray(response.body)).toBe(true);
                expect(response.body.length).toBeGreaterThan(0);
            });
        });
    });
    describe('Tasks', () => {
        it('/tasks (POST) - should create task', () => {
            return request(app.getHttpServer())
                .post('/tasks')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                title: 'Test Task',
                description: 'Test Description',
                status: 'todo',
                dueDate: '2024-12-31',
                assignedToId: userId,
                customerId: customerId,
            })
                .expect(201)
                .then((response) => {
                expect(response.body).toHaveProperty('id');
                expect(response.body.title).toBe('Test Task');
                taskId = response.body.id;
            });
        });
        it('/tasks (GET) - should get all tasks for admin', () => {
            return request(app.getHttpServer())
                .get('/tasks')
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(200)
                .then((response) => {
                expect(Array.isArray(response.body)).toBe(true);
            });
        });
        it('/tasks?status=todo (GET) - should filter tasks by status', () => {
            return request(app.getHttpServer())
                .get('/tasks?status=todo')
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(200)
                .then((response) => {
                expect(Array.isArray(response.body)).toBe(true);
                if (response.body.length > 0) {
                    expect(response.body[0].status).toBe('todo');
                }
            });
        });
        it('/tasks/:id (PATCH) - should update task', () => {
            return request(app.getHttpServer())
                .patch(`/tasks/${taskId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                status: 'in-progress',
            })
                .expect(200)
                .then((response) => {
                expect(response.body.status).toBe('in-progress');
            });
        });
        it('/tasks (GET) - regular user should only see their tasks', () => {
            return request(app.getHttpServer())
                .get('/tasks')
                .set('Authorization', `Bearer ${userToken}`)
                .expect(200)
                .then((response) => {
                expect(Array.isArray(response.body)).toBe(true);
                response.body.forEach((task) => {
                    expect(task.assignedToId).toBe(userId);
                });
            });
        });
    });
    describe('Authorization', () => {
        it('/users (GET) - should be accessible only by admin', () => {
            return request(app.getHttpServer())
                .get('/users')
                .set('Authorization', `Bearer ${userToken}`)
                .expect(403);
        });
        it('/users (GET) - should work for admin', () => {
            return request(app.getHttpServer())
                .get('/users')
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(200);
        });
    });
});
//# sourceMappingURL=app.e2e-spec.js.map