# NestJS CRM Task Manager

A full-stack CRM-style Task Manager built with NestJS, featuring user authentication, role-based access control, task management, and customer relationships.

## Features

### User Management
- User registration and login with JWT authentication
- Secure password hashing with bcrypt
- Role-based access control (RBAC)
  - **User Role**: Can manage their own tasks
  - **Admin Role**: Can manage all users and tasks

### Task Management
- Complete CRUD operations for tasks
- Task fields:
  - `id` (UUID)
  - `title`
  - `description`
  - `status` (todo, in-progress, done)
  - `dueDate`
  - `assignedTo` (User relationship)
  - `customer` (Customer relationship)
- Advanced filtering and search:
  - Filter by status: `GET /tasks?status=done`
  - Search by title: `GET /tasks?title=meeting`
  - Filter by customer: `GET /tasks?customerId=xxx`
  - Filter by assigned user: `GET /tasks?assignedToId=xxx`
- Access control:
  - Admins can view all tasks
  - Users can only view their assigned tasks

### Customer Management (CRM Features)
- Store customer information (name, email, company, contact)
- One-to-many relationship: one customer can have many tasks
- Admin filtering: Filter tasks by customer
- Example use case: Sales representative creates tasks linked to customers

### Security & Authorization
- JWT-based authentication
- Guards for role-based route protection
- DTO validation for input safety
- Password hashing for secure storage

## Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: class-validator, class-transformer
- **Testing**: Jest, Supertest
- **Documentation**: Swagger/OpenAPI
- **Containerization**: Docker, Docker Compose

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v15 or higher)
- Docker and Docker Compose (optional, for containerized deployment)

## Installation

### Option 1: Local Setup

1. **Clone the repository**
   ```bash
   cd assignment_5
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and configure your database credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_DATABASE=crm_task_manager

   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRATION=24h

   PORT=3000
   NODE_ENV=development
   ```

4. **Create the database**
   ```bash
   # Using psql
   psql -U postgres
   CREATE DATABASE crm_task_manager;
   \q
   ```

5. **Run the application**
   ```bash
   # Development mode
   npm run start:dev

   # Production mode
   npm run build
   npm run start:prod
   ```

6. **Access the application**
   - API: http://localhost:3000
   - Swagger Documentation: http://localhost:3000/api/docs

### Option 2: Docker Setup

1. **Set up environment variables** (if needed, or use defaults in docker-compose.yml)
   ```bash
   cp .env.example .env
   ```

2. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - API: http://localhost:3000
   - Swagger Documentation: http://localhost:3000/api/docs

4. **Stop the containers**
   ```bash
   docker-compose down
   ```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and receive JWT token

### Users (Admin only)
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `DELETE /users/:id` - Delete user

### Customers
- `POST /customers` - Create a new customer
- `GET /customers` - Get all customers
- `GET /customers/:id` - Get customer by ID
- `PATCH /customers/:id` - Update customer
- `DELETE /customers/:id` - Delete customer (Admin only)

### Tasks
- `POST /tasks` - Create a new task
- `GET /tasks` - Get all tasks (with filtering)
  - Query params: `status`, `title`, `customerId`, `assignedToId`
- `GET /tasks/:id` - Get task by ID
- `PATCH /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

## Usage Examples

### 1. Register an Admin User
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123",
    "name": "Admin User",
    "role": "admin"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "admin@example.com",
    "name": "Admin User",
    "role": "admin"
  }
}
```

### 3. Create a Customer
```bash
curl -X POST http://localhost:3000/customers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Raj Kumar",
    "email": "raj@example.com",
    "company": "Tech Corp",
    "contact": "1234567890"
  }'
```

### 4. Create a Task
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Follow-up call with Raj",
    "description": "Discuss Q4 sales targets",
    "status": "todo",
    "dueDate": "2024-12-31",
    "assignedToId": "user-uuid",
    "customerId": "customer-uuid"
  }'
```

### 5. Filter Tasks
```bash
# Get all 'done' tasks
curl -X GET "http://localhost:3000/tasks?status=done" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Search tasks by title
curl -X GET "http://localhost:3000/tasks?title=meeting" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Filter by customer
curl -X GET "http://localhost:3000/tasks?customerId=xxx" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
# Make sure database is running
npm run test:e2e
```

### Test Coverage
```bash
npm run test:cov
```

## Project Structure

```
assignment_5/
├── src/
│   ├── auth/                 # Authentication module
│   │   ├── dto/              # Data Transfer Objects
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   └── jwt.strategy.ts
│   ├── users/                # Users module
│   │   ├── user.entity.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   ├── customers/            # Customers module
│   │   ├── dto/
│   │   ├── customer.entity.ts
│   │   ├── customers.controller.ts
│   │   ├── customers.service.ts
│   │   └── customers.module.ts
│   ├── tasks/                # Tasks module
│   │   ├── dto/
│   │   ├── task.entity.ts
│   │   ├── tasks.controller.ts
│   │   ├── tasks.service.ts
│   │   └── tasks.module.ts
│   ├── common/               # Shared resources
│   │   ├── decorators/       # Custom decorators
│   │   └── guards/           # Auth guards
│   ├── app.module.ts         # Root module
│   └── main.ts               # Application entry point
├── test/                     # E2E tests
├── docker-compose.yml        # Docker Compose configuration
├── Dockerfile                # Docker configuration
├── package.json              # Dependencies
└── README.md                 # This file
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | Database host | `localhost` |
| `DB_PORT` | Database port | `5432` |
| `DB_USERNAME` | Database username | `postgres` |
| `DB_PASSWORD` | Database password | `postgres` |
| `DB_DATABASE` | Database name | `crm_task_manager` |
| `JWT_SECRET` | Secret key for JWT | Required |
| `JWT_EXPIRATION` | JWT token expiration | `24h` |
| `PORT` | Application port | `3000` |
| `NODE_ENV` | Environment | `development` |

## Deployment

### Docker Hub
1. Build the image:
   ```bash
   docker build -t your-username/crm-task-manager .
   ```

2. Push to Docker Hub:
   ```bash
   docker push your-username/crm-task-manager
   ```

### Render / Railway
1. Connect your GitHub repository
2. Set environment variables in the platform
3. Deploy from the `main` branch

### Environment Configuration
Always use `.env` files for sensitive configurations:
- JWT secrets
- Database credentials
- API keys

## Evaluation Criteria Checklist

- ✅ Functional authentication and RBAC implementation
- ✅ Task and customer modules with proper relations
- ✅ Implementation of filtering and searching capabilities
- ✅ Unit and E2E tests
- ✅ Dockerization and deployability
- ✅ Clean architecture and coding standards

## Pro Challenges (Optional)

### Activity Logs
Track who created or updated tasks by adding an audit trail:
```typescript
@Column({ nullable: true })
createdBy: string;

@Column({ nullable: true })
updatedBy: string;
```

### Email Notifications
Send email notifications when a task is assigned using a service like SendGrid or Nodemailer.

### Analytics Module
Add analytics endpoints:
- `GET /analytics/tasks-by-status` - Count tasks by status
- `GET /analytics/tasks-by-user` - Count completed tasks per user
- `GET /analytics/overdue-tasks` - Get overdue tasks

## Swagger Documentation

Once the application is running, visit http://localhost:3000/api/docs to explore the interactive API documentation.

You can:
- View all available endpoints
- Test API calls directly from the browser
- See request/response schemas
- Authorize with JWT token

## Common Issues & Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Verify database credentials in `.env`
- Check if database `crm_task_manager` exists

### Port Already in Use
- Change the `PORT` in `.env`
- Or kill the process using port 3000:
  ```bash
  lsof -ti:3000 | xargs kill -9
  ```

### Docker Issues
- Ensure Docker daemon is running
- Clean up old containers: `docker-compose down -v`
- Rebuild images: `docker-compose up --build --force-recreate`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Author

Created as part of NestJS CRM Task Manager Final Project

## Acknowledgments

- NestJS Documentation
- TypeORM Documentation
- PostgreSQL Documentation
