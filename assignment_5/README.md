# Assignment 5: NestJS CRM Task Manager with Authentication & Docker

Welcome to the fifth and most advanced assignment of the NestJS course! This assignment will help you build a production-ready CRM-style Task Manager with complete user authentication, role-based access control (RBAC), PostgreSQL database integration, Docker containerization, and comprehensive API documentation with Swagger.

> **Updates: Code is Deployed**
>
> As per mentor's feedback on submission, code is deployed on AWS EC2 with Docker
>
> [Click Here to view Live Deployment](http://ec2-43-205-184-80.ap-south-1.compute.amazonaws.com:3000/)
>
> [Swagger API Documentation](http://ec2-43-205-184-80.ap-south-1.compute.amazonaws.com:3000/api/docs)

## 📁 Project Structure

### Code Implementation

- **Location**: `./`
- **Description**: Full-stack NestJS application with CRM Task Manager implementation using PostgreSQL, TypeORM, JWT authentication, and Docker
- **Key Components**:
  - **Authentication Module**: JWT-based user registration and login with bcrypt password hashing
  - **Users Module**: User management with role-based access control (USER, ADMIN)
  - **Tasks Module**: Complete CRUD operations with advanced filtering and search functionality
  - **Customers Module**: CRM-style customer management with task relationships
  - **Security**: Guards, decorators, and role-based route protection
  - **Docker Support**: Multi-stage Dockerfile and Docker Compose for containerized deployment
  - Complete testing setup with unit and e2e tests

### Docker Configuration

- **Location**: `./Dockerfile` and `./docker-compose.yml`
- **Description**: Production-ready containerization setup
- **Components**:
  - Multi-stage Docker build for optimized image size
  - Docker Compose with PostgreSQL and NestJS app services
  - Volume persistence for database data
  - Environment variable configuration
  - Custom network for service communication

### Screenshots & Documentation

- **Location**: `./screens/` (if available)
- **Contents**:
  - Postman screenshots showing all API endpoints with authentication
  - Swagger API documentation screenshots
  - Docker deployment and container logs
  - Database entity relationships and data
  - Terminal outputs demonstrating command execution
  - Testing screenshots for authentication, tasks, and customers

## 🚀 Getting Started

### Option 1: Local Development Setup

1. **Navigate to the project directory**:

   ```bash
   cd assignment_5
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and configure your credentials:

   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_DATABASE=crm_task_manager

   # JWT Authentication
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRATION=24h

   # Application Settings
   PORT=3000
   NODE_ENV=development
   ```

4. **Create PostgreSQL database**:

   ```bash
   # Using psql command line
   psql -U postgres
   CREATE DATABASE crm_task_manager;
   \q
   ```

5. **Run the application**:

   ```bash
   # Development mode with hot-reload
   npm run start:dev

   # Production build
   npm run build
   npm run start:prod
   ```

6. **Access the application**:
   - API Base URL: http://localhost:3000
   - Swagger API Docs: http://localhost:3000/api/docs

### Option 2: Docker Development Setup (Recommended)

1. **Ensure Docker and Docker Compose are installed**:

   ```bash
   docker --version
   docker-compose --version
   ```

2. **Set up environment variables** (optional, defaults provided in docker-compose.yml):

   ```bash
   cp .env.example .env
   ```

3. **Build and run with Docker Compose**:

   ```bash
   # Build and start all services (app + PostgreSQL)
   docker-compose up --build

   # Run in detached mode (background)
   docker-compose up -d --build
   ```

4. **Access the application**:
   - API Base URL: http://localhost:3000
   - Swagger API Docs: http://localhost:3000/api/docs

5. **View logs**:

   ```bash
   # View all logs
   docker-compose logs -f

   # View app logs only
   docker-compose logs -f app

   # View database logs only
   docker-compose logs -f postgres
   ```

6. **Stop the containers**:

   ```bash
   # Stop containers (preserves data)
   docker-compose down

   # Stop and remove volumes (clears database)
   docker-compose down -v
   ```

## 🐳 Docker Deployment Guide

### Understanding the Dockerfile

The project uses a **multi-stage Docker build** for production optimization:

```dockerfile
# Stage 1: Builder
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci                    # Clean install (faster, reproducible)
COPY . .
RUN npm run build            # Compile TypeScript to JavaScript

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production  # Install only production dependencies
COPY --from=builder /app/dist ./dist  # Copy compiled code
EXPOSE 3000
CMD ["node", "dist/src/main"]
```

**Why Multi-Stage Build?**

1. **Smaller Image Size**: Final image only contains production dependencies and compiled code
2. **Security**: No development dependencies or source code in production image
3. **Performance**: Faster deployment and reduced attack surface
4. **Best Practice**: Separates build-time and runtime dependencies

**Dockerfile Breakdown:**

- **Base Image**: `node:18-alpine` - Lightweight Alpine Linux with Node.js 18
- **Builder Stage**:
  - Copies package files and installs ALL dependencies (including dev dependencies)
  - Copies source code
  - Builds the application (TypeScript → JavaScript)
  - Output: `dist/` folder with compiled code
- **Production Stage**:
  - Fresh Alpine image (smaller final size)
  - Installs ONLY production dependencies (`--only=production`)
  - Copies compiled code from builder stage
  - Exposes port 3000 for HTTP traffic
  - Runs compiled JavaScript directly with Node.js

### Understanding docker-compose.yml

The Docker Compose configuration orchestrates multiple services:

```yaml
services:
  postgres:                        # Database service
    image: postgres:15-alpine      # PostgreSQL 15 on Alpine
    container_name: crm_postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: crm_task_manager
    ports:
      - "5431:5431"                # Expose on host port 5431
    volumes:
      - postgres_data:/var/lib/postgresql/data  # Persist data
    networks:
      - crm_network

  app:                             # NestJS application service
    build:
      context: .
      dockerfile: Dockerfile
    container_name: crm_app
    environment:
      DB_HOST: postgres            # Reference database service by name
      DB_PORT: 5432
      DB_USERNAME: postgres
      DB_PASSWORD: postgres
      DB_DATABASE: crm_task_manager
      JWT_SECRET: qrndOK0mSRDwo4Vmag/GUBRKoEzcBvkWYsnwV9po4E7W27Oh/l2ouBt3p3AbdrGj
      JWT_EXPIRATION: 24h
      PORT: 3000
      NODE_ENV: development
    ports:
      - "3000:3000"                # Expose on host port 3000
    depends_on:
      - postgres                   # Wait for database to start
    networks:
      - crm_network
    volumes:
      - .:/app                     # Mount source code for hot-reload
      - /app/node_modules          # Prevent overwriting node_modules

volumes:
  postgres_data:                   # Named volume for database persistence

networks:
  crm_network:                     # Custom bridge network
    driver: bridge
```

**Key Features:**

1. **Service Communication**: Both services are on `crm_network`, allowing app to connect to database using hostname `postgres`
2. **Data Persistence**: `postgres_data` volume ensures database data survives container restarts
3. **Port Mapping**: Exposes database on 5431 and app on 3000 to host machine
4. **Environment Variables**: All configuration centralized in docker-compose.yml
5. **Hot-Reload**: Source code is mounted as volume for development convenience
6. **Dependency Management**: `depends_on` ensures database starts before app

### Production Deployment Steps

#### Option 1: AWS EC2 Deployment (Current Deployment)

1. **Launch EC2 Instance**:
   - Ubuntu 22.04 LTS
   - t2.micro or larger
   - Configure security group to allow ports 22 (SSH), 3000 (App), 5432 (PostgreSQL)

2. **Install Docker and Docker Compose**:

   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y

   # Install Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh

   # Install Docker Compose
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose

   # Add user to docker group
   sudo usermod -aG docker $USER
   newgrp docker
   ```

3. **Clone repository and deploy**:

   ```bash
   git clone <your-repo-url>
   cd assignment_5
   docker-compose up -d --build
   ```

4. **Access your deployment**:
   - API: http://your-ec2-public-ip:3000
   - Swagger: http://your-ec2-public-ip:3000/api/docs

#### Option 2: Docker Hub Deployment

1. **Build and tag image**:

   ```bash
   docker build -t your-username/crm-task-manager:latest .
   ```

2. **Push to Docker Hub**:

   ```bash
   docker login
   docker push your-username/crm-task-manager:latest
   ```

3. **Pull and run on any server**:

   ```bash
   docker pull your-username/crm-task-manager:latest
   docker run -d -p 3000:3000 \
     -e DB_HOST=your-db-host \
     -e JWT_SECRET=your-secret \
     your-username/crm-task-manager:latest
   ```

#### Option 3: Render / Railway / Heroku

1. Connect your GitHub repository
2. Set environment variables in platform dashboard
3. Configure build command: `npm run build`
4. Configure start command: `npm run start:prod`
5. Add PostgreSQL addon or external database
6. Deploy from `main` branch

## 📋 What You'll Learn

- ✅ Building a production-ready NestJS application with enterprise features
- ✅ JWT authentication with secure password hashing (bcrypt)
- ✅ Role-based access control (RBAC) with custom guards and decorators
- ✅ PostgreSQL database integration with TypeORM and entity relationships
- ✅ Creating and using DTOs for comprehensive data validation
- ✅ Advanced filtering and search functionality in APIs
- ✅ Custom decorators (@Roles, @CurrentUser) and guards (JwtAuthGuard, RolesGuard)
- ✅ Docker containerization with multi-stage builds
- ✅ Docker Compose for orchestrating multiple services
- ✅ Swagger/OpenAPI documentation for interactive API testing
- ✅ Unit testing and E2E testing with Jest and Supertest
- ✅ Environment configuration management with dotenv
- ✅ Deploying NestJS applications to cloud platforms (AWS EC2)
- ✅ Production best practices for security, scalability, and maintainability

## 🔍 Key Files to Explore

### Core Application Files

- `src/main.ts` - Application entry point with Swagger setup and global validation
- `src/app.module.ts` - Root module with TypeORM configuration
- `src/app.controller.ts` - Main application controller

### Feature Modules

- **Authentication Module**:

  - `src/auth/auth.controller.ts` - Registration and login endpoints
  - `src/auth/auth.service.ts` - Authentication business logic with JWT
  - `src/auth/jwt.strategy.ts` - Passport JWT strategy for token validation
  - `src/auth/dto/register.dto.ts` - User registration validation
  - `src/auth/dto/login.dto.ts` - Login credentials validation
  - `src/auth/auth.module.ts` - Authentication feature module
  - `src/auth/auth.service.spec.ts` - Unit tests for auth service

- **Users Module**:

  - `src/users/users.controller.ts` - User management API (Admin only)
  - `src/users/users.service.ts` - User business logic
  - `src/users/user.entity.ts` - User entity with UUID and roles enum
  - `src/users/users.module.ts` - Users feature module

- **Tasks Module**:

  - `src/tasks/tasks.controller.ts` - Task CRUD with filtering endpoints
  - `src/tasks/tasks.service.ts` - Task business logic with query builder
  - `src/tasks/task.entity.ts` - Task entity with User and Customer relations
  - `src/tasks/dto/create-task.dto.ts` - Task creation validation
  - `src/tasks/dto/update-task.dto.ts` - Task update validation
  - `src/tasks/dto/filter-task.dto.ts` - Query filtering validation
  - `src/tasks/tasks.module.ts` - Tasks feature module
  - `src/tasks/tasks.service.spec.ts` - Unit tests for task service

- **Customers Module**:

  - `src/customers/customers.controller.ts` - Customer CRUD API
  - `src/customers/customers.service.ts` - Customer business logic
  - `src/customers/customer.entity.ts` - Customer entity with Task relation
  - `src/customers/dto/create-customer.dto.ts` - Customer creation validation
  - `src/customers/dto/update-customer.dto.ts` - Customer update validation
  - `src/customers/customers.module.ts` - Customers feature module

- **Common Utilities**:
  - `src/common/decorators/roles.decorator.ts` - Custom @Roles() decorator
  - `src/common/decorators/current-user.decorator.ts` - Custom @CurrentUser() decorator
  - `src/common/guards/jwt-auth.guard.ts` - JWT authentication guard
  - `src/common/guards/roles.guard.ts` - Role-based authorization guard

### Configuration Files

- `Dockerfile` - Multi-stage Docker build configuration
- `docker-compose.yml` - Docker Compose service orchestration
- `.env.example` - Environment variables template
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `.eslintrc.js` - ESLint code quality configuration
- `nest-cli.json` - NestJS CLI configuration
- `test/jest-e2e.json` - E2E test configuration
- `postman_collection.json` - Postman API collection

## 📸 Screenshots Overview

The `./screens/` folder contains screenshots showing:

- **Authentication**:

  - User registration with role selection
  - Login with JWT token response
  - Password hashing demonstration
  - Token validation in protected routes

- **Users API**:

  - GET requests for all users (Admin only)
  - GET single user by ID
  - DELETE user (Admin only)
  - Role-based access control in action

- **Customers API**:

  - POST requests to create customers
  - GET all customers with pagination
  - PATCH update customer details
  - DELETE customer (Admin only)
  - Customer-Task relationship examples

- **Tasks API**:

  - POST create tasks with customer and user assignment
  - GET all tasks with various filters (status, title, customer, assigned user)
  - PATCH update task status and details
  - DELETE tasks
  - Advanced filtering demonstrations

- **Swagger Documentation**:

  - Interactive API documentation interface
  - Bearer token authorization setup
  - Request/response schema visualization
  - Try-it-out functionality

- **Docker Deployment**:

  - Docker build process logs
  - Docker Compose startup logs
  - Running containers (docker ps output)
  - Database connection logs
  - Container health checks

- **Database**:

  - PostgreSQL table structures
  - Entity relationships (Users, Tasks, Customers)
  - Data visualization with sample records
  - Migration logs

- **Testing**:
  - Jest unit test results
  - E2E test execution
  - Test coverage reports
  - Postman collection test runs

## 🛠 API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
  - Body: `{ email, password, name, role }`
  - Returns: `{ user, access_token }`
- `POST /auth/login` - Login and receive JWT token
  - Body: `{ email, password }`
  - Returns: `{ user, access_token }`

### Users (Admin only - requires JWT + Admin role)

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `DELETE /users/:id` - Delete user

### Customers (requires JWT authentication)

- `POST /customers` - Create a new customer
  - Body: `{ name, email, company, contact }`
- `GET /customers` - Get all customers
- `GET /customers/:id` - Get customer by ID
- `PATCH /customers/:id` - Update customer
  - Body: `{ name?, email?, company?, contact? }`
- `DELETE /customers/:id` - Delete customer (Admin only)

### Tasks (requires JWT authentication)

- `POST /tasks` - Create a new task
  - Body: `{ title, description, status, dueDate, assignedToId, customerId }`
- `GET /tasks` - Get all tasks with filtering
  - Query params: `?status=done&title=meeting&customerId=xxx&assignedToId=xxx`
  - Admins see all tasks, Users see only their assigned tasks
- `GET /tasks/:id` - Get task by ID
- `PATCH /tasks/:id` - Update task
  - Body: `{ title?, description?, status?, dueDate?, assignedToId?, customerId? }`
- `DELETE /tasks/:id` - Delete task

## 🔧 Advanced Features

### Authentication & Security

- **JWT Authentication**: Secure token-based authentication with 24-hour expiration
- **Password Hashing**: Bcrypt password hashing with salt rounds
- **Role-Based Access Control (RBAC)**: USER and ADMIN roles with route-level protection
- **Custom Guards**: JwtAuthGuard and RolesGuard for authorization
- **Custom Decorators**: @Roles() for role specification, @CurrentUser() for user extraction
- **DTO Validation**: class-validator and class-transformer for input sanitization

### Database & ORM

- **PostgreSQL**: Enterprise-grade relational database
- **TypeORM**: Powerful ORM with entity relationships and migrations
- **Auto-Migration**: Automatic schema synchronization in development
- **Entity Relationships**:
  - User (1-to-Many) Tasks - One user can have many assigned tasks
  - Customer (1-to-Many) Tasks - One customer can have many related tasks
- **UUID Primary Keys**: Secure and distributed-friendly identifiers
- **Timestamps**: Automatic createdAt and updatedAt on all entities

### API Features

- **Advanced Filtering**: Filter tasks by status, title, customer, or assigned user
- **Search Functionality**: Title-based search with partial matching
- **Query Builder**: Complex database queries with TypeORM QueryBuilder
- **Error Handling**: Comprehensive error responses with proper HTTP status codes
- **Validation Pipeline**: Global ValidationPipe for all incoming requests

### Docker & Deployment

- **Multi-Stage Build**: Optimized production Docker images
- **Docker Compose**: Easy local development with database
- **Environment Configuration**: Flexible .env file management
- **Volume Persistence**: Database data survives container restarts
- **Service Networking**: Isolated network for secure service communication
- **Hot-Reload**: Development mode with file watching

### Documentation & Testing

- **Swagger/OpenAPI**: Interactive API documentation at `/api/docs`
- **Unit Tests**: Jest-based unit testing for services
- **E2E Tests**: End-to-end testing with Supertest
- **Test Coverage**: Code coverage reporting
- **Postman Collection**: Pre-built API collection for quick testing

### Architecture & Best Practices

- **Modular Design**: Feature-based module organization
- **Dependency Injection**: NestJS built-in DI container
- **TypeScript**: Strong typing and compile-time error checking
- **ESLint & Prettier**: Code quality and formatting
- **Clean Code**: Following SOLID principles and NestJS conventions

## 💡 Usage Examples

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

Response:

```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "admin@example.com",
    "name": "Admin User",
    "role": "admin",
    "createdAt": "2024-10-30T10:00:00.000Z",
    "updatedAt": "2024-10-30T10:00:00.000Z"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
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
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "admin@example.com",
    "name": "Admin User",
    "role": "admin"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Create a Customer

```bash
curl -X POST http://localhost:3000/customers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Raj Kumar",
    "email": "raj@techcorp.com",
    "company": "Tech Corp India",
    "contact": "+91-9876543210"
  }'
```

Response:

```json
{
  "id": "650e8400-e29b-41d4-a716-446655440001",
  "name": "Raj Kumar",
  "email": "raj@techcorp.com",
  "company": "Tech Corp India",
  "contact": "+91-9876543210",
  "createdAt": "2024-10-30T10:05:00.000Z",
  "updatedAt": "2024-10-30T10:05:00.000Z"
}
```

### 4. Create a Task

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Follow-up call with Raj Kumar",
    "description": "Discuss Q4 sales targets and contract renewal",
    "status": "todo",
    "dueDate": "2024-12-31",
    "assignedToId": "550e8400-e29b-41d4-a716-446655440000",
    "customerId": "650e8400-e29b-41d4-a716-446655440001"
  }'
```

Response:

```json
{
  "id": "750e8400-e29b-41d4-a716-446655440002",
  "title": "Follow-up call with Raj Kumar",
  "description": "Discuss Q4 sales targets and contract renewal",
  "status": "todo",
  "dueDate": "2024-12-31T00:00:00.000Z",
  "assignedTo": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Admin User",
    "email": "admin@example.com"
  },
  "customer": {
    "id": "650e8400-e29b-41d4-a716-446655440001",
    "name": "Raj Kumar",
    "company": "Tech Corp India"
  },
  "createdAt": "2024-10-30T10:10:00.000Z",
  "updatedAt": "2024-10-30T10:10:00.000Z"
}
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
curl -X GET "http://localhost:3000/tasks?customerId=650e8400-e29b-41d4-a716-446655440001" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Filter by assigned user
curl -X GET "http://localhost:3000/tasks?assignedToId=550e8400-e29b-41d4-a716-446655440000" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Combine multiple filters
curl -X GET "http://localhost:3000/tasks?status=in-progress&customerId=650e8400-e29b-41d4-a716-446655440001" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 6. Update Task Status

```bash
curl -X PATCH http://localhost:3000/tasks/750e8400-e29b-41d4-a716-446655440002 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "status": "done"
  }'
```

## 🧪 Testing

### Unit Tests

Run unit tests for individual services:

```bash
npm run test

# Watch mode for development
npm run test:watch

# Test specific file
npm run test auth.service.spec.ts
```

### E2E Tests

Run end-to-end tests (requires running database):

```bash
# Make sure database is running
npm run test:e2e
```

### Test Coverage

Generate and view test coverage report:

```bash
npm run test:cov

# Open coverage report in browser
open coverage/lcov-report/index.html
```

## 🌍 Environment Variables

| Variable         | Description                    | Default              | Required |
| ---------------- | ------------------------------ | -------------------- | -------- |
| `DB_HOST`        | PostgreSQL host                | `localhost`          | Yes      |
| `DB_PORT`        | PostgreSQL port                | `5432`               | Yes      |
| `DB_USERNAME`    | PostgreSQL username            | `postgres`           | Yes      |
| `DB_PASSWORD`    | PostgreSQL password            | `postgres`           | Yes      |
| `DB_DATABASE`    | PostgreSQL database name       | `crm_task_manager`   | Yes      |
| `JWT_SECRET`     | Secret key for JWT signing     | -                    | Yes      |
| `JWT_EXPIRATION` | JWT token expiration time      | `24h`                | No       |
| `PORT`           | Application HTTP port          | `3000`               | No       |
| `NODE_ENV`       | Environment (dev/prod/test)    | `development`        | No       |

**Security Note**: Always use strong, randomly generated secrets in production. Never commit `.env` files to version control.

## 🗂 Project Directory Structure

```
assignment_5/
├── src/                              # Source code directory
│   ├── auth/                         # Authentication module
│   │   ├── dto/                      # Data Transfer Objects
│   │   │   ├── register.dto.ts       # Registration validation
│   │   │   └── login.dto.ts          # Login validation
│   │   ├── auth.controller.ts        # Auth endpoints (register, login)
│   │   ├── auth.service.ts           # Auth business logic
│   │   ├── auth.service.spec.ts      # Auth unit tests
│   │   ├── auth.module.ts            # Auth feature module
│   │   └── jwt.strategy.ts           # Passport JWT strategy
│   ├── users/                        # Users module
│   │   ├── user.entity.ts            # User TypeORM entity
│   │   ├── users.controller.ts       # User endpoints
│   │   ├── users.service.ts          # User business logic
│   │   └── users.module.ts           # Users feature module
│   ├── customers/                    # Customers module
│   │   ├── dto/                      # Data Transfer Objects
│   │   │   ├── create-customer.dto.ts
│   │   │   └── update-customer.dto.ts
│   │   ├── customer.entity.ts        # Customer TypeORM entity
│   │   ├── customers.controller.ts   # Customer endpoints
│   │   ├── customers.service.ts      # Customer business logic
│   │   └── customers.module.ts       # Customers feature module
│   ├── tasks/                        # Tasks module
│   │   ├── dto/                      # Data Transfer Objects
│   │   │   ├── create-task.dto.ts    # Task creation validation
│   │   │   ├── update-task.dto.ts    # Task update validation
│   │   │   └── filter-task.dto.ts    # Query filter validation
│   │   ├── task.entity.ts            # Task TypeORM entity
│   │   ├── tasks.controller.ts       # Task endpoints with filtering
│   │   ├── tasks.service.ts          # Task business logic
│   │   ├── tasks.service.spec.ts     # Task unit tests
│   │   └── tasks.module.ts           # Tasks feature module
│   ├── common/                       # Shared resources
│   │   ├── decorators/               # Custom decorators
│   │   │   ├── roles.decorator.ts    # @Roles() decorator
│   │   │   └── current-user.decorator.ts  # @CurrentUser() decorator
│   │   └── guards/                   # Authentication guards
│   │       ├── jwt-auth.guard.ts     # JWT verification guard
│   │       └── roles.guard.ts        # RBAC authorization guard
│   ├── app.module.ts                 # Root application module
│   ├── app.controller.ts             # Root controller
│   ├── app.service.ts                # Root service
│   └── main.ts                       # Application entry point
├── test/                             # Test directory
│   ├── jest-e2e.json                 # E2E test configuration
│   └── app.e2e-spec.ts               # E2E test suite
├── screens/                          # Screenshots (if available)
│   ├── authentication/               # Auth screenshots
│   ├── api-testing/                  # API test screenshots
│   ├── swagger/                      # Swagger docs screenshots
│   └── docker/                       # Docker deployment screenshots
├── Dockerfile                        # Multi-stage Docker build
├── docker-compose.yml                # Docker Compose configuration
├── .env.example                      # Environment template
├── .env                              # Environment variables (gitignored)
├── .gitignore                        # Git ignore rules
├── .eslintrc.js                      # ESLint configuration
├── .prettierrc                       # Prettier configuration
├── nest-cli.json                     # NestJS CLI configuration
├── tsconfig.json                     # TypeScript configuration
├── tsconfig.build.json               # TypeScript build configuration
├── package.json                      # Dependencies and scripts
├── package-lock.json                 # Locked dependencies
├── postman_collection.json           # Postman API collection
└── README.md                         # This file
```

## 🚨 Common Issues & Troubleshooting

### Database Connection Error

**Problem**: `Error: connect ECONNREFUSED 127.0.0.1:5432`

**Solutions**:

- Ensure PostgreSQL is running: `sudo service postgresql status`
- Verify database credentials in `.env` file
- Check if database `crm_task_manager` exists: `psql -U postgres -l`
- Create database if missing: `psql -U postgres -c "CREATE DATABASE crm_task_manager;"`

### Port Already in Use

**Problem**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solutions**:

```bash
# Find process using port 3000
lsof -ti:3000

# Kill the process
lsof -ti:3000 | xargs kill -9

# Or change port in .env file
PORT=3001
```

### Docker Issues

**Problem**: Docker container fails to start

**Solutions**:

```bash
# Check Docker daemon is running
sudo systemctl status docker

# View container logs
docker-compose logs -f

# Clean up old containers and volumes
docker-compose down -v

# Rebuild from scratch
docker-compose up --build --force-recreate

# Remove all stopped containers
docker container prune

# Remove unused images
docker image prune -a
```

### JWT Authentication Errors

**Problem**: `401 Unauthorized` on protected routes

**Solutions**:

- Ensure you're sending JWT token in Authorization header: `Bearer YOUR_TOKEN`
- Check token hasn't expired (24-hour default)
- Verify JWT_SECRET matches between registration and login
- Test token at http://localhost:3000/api/docs with "Authorize" button

### TypeORM Synchronization Issues

**Problem**: Database schema not matching entities

**Solutions**:

```bash
# Drop and recreate database (CAUTION: deletes all data)
psql -U postgres -c "DROP DATABASE crm_task_manager;"
psql -U postgres -c "CREATE DATABASE crm_task_manager;"

# Restart application to auto-sync schema
npm run start:dev

# Or disable synchronize and use migrations in production
```

## ✅ Evaluation Criteria Checklist

- ✅ **Functional Authentication**: JWT-based registration and login
- ✅ **Role-Based Access Control (RBAC)**: USER and ADMIN roles with guards
- ✅ **Task Module**: Complete CRUD operations with entity relationships
- ✅ **Customer Module**: CRM features with customer-task relationships
- ✅ **Filtering & Searching**: Advanced query capabilities (status, title, customer, user)
- ✅ **Unit Tests**: Jest tests for services (auth.service.spec.ts, tasks.service.spec.ts)
- ✅ **E2E Tests**: End-to-end API testing configuration
- ✅ **Dockerization**: Multi-stage Dockerfile and Docker Compose setup
- ✅ **Deployability**: Successfully deployed on AWS EC2
- ✅ **Clean Architecture**: Modular design with separation of concerns
- ✅ **Coding Standards**: ESLint, Prettier, TypeScript best practices
- ✅ **API Documentation**: Swagger/OpenAPI interactive documentation
- ✅ **Database Design**: Proper entity relationships and migrations
- ✅ **Security**: Password hashing, JWT validation, input sanitization

## 🎯 Pro Challenges (Optional Enhancements)

### 1. Activity Logs & Audit Trail

Track who created or updated tasks:

```typescript
// task.entity.ts
@Column({ nullable: true })
createdBy: string;

@Column({ nullable: true })
updatedBy: string;

@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
lastModifiedAt: Date;
```

### 2. Email Notifications

Send email notifications when tasks are assigned using Nodemailer or SendGrid:

```bash
npm install @nestjs-modules/mailer nodemailer
```

### 3. Analytics Module

Add analytics endpoints for insights:

- `GET /analytics/tasks-by-status` - Count tasks by status
- `GET /analytics/tasks-by-user` - Completed tasks per user
- `GET /analytics/overdue-tasks` - Tasks past due date
- `GET /analytics/customer-engagement` - Tasks per customer

### 4. Task Comments & Attachments

Add comments and file uploads to tasks:

- Comments entity with User and Task relationships
- File upload with multer for task attachments
- S3 or local storage for file management

### 5. Task Priority & Labels

Enhance task organization:

```typescript
@Column({ type: 'enum', enum: ['low', 'medium', 'high', 'urgent'] })
priority: string;

@Column('simple-array', { nullable: true })
labels: string[];
```

### 6. Pagination & Sorting

Add pagination and sorting to GET endpoints:

```typescript
@Get()
async findAll(
  @Query('page') page = 1,
  @Query('limit') limit = 10,
  @Query('sortBy') sortBy = 'createdAt',
  @Query('order') order = 'DESC',
) {
  return this.tasksService.findAllPaginated(page, limit, sortBy, order);
}
```

### 7. Real-time Updates with WebSockets

Add Socket.IO for real-time task updates:

```bash
npm install @nestjs/websockets @nestjs/platform-socket.io
```

## 📚 Additional Resources

### Documentation

- [NestJS Official Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [JWT Best Practices](https://jwt.io/introduction)
- [Swagger/OpenAPI Specification](https://swagger.io/specification/)

### Learning Resources

- NestJS Fundamentals Course
- Docker & Kubernetes Tutorials
- PostgreSQL Performance Tuning
- Authentication & Authorization Patterns
- RESTful API Design Principles

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Created as part of NestJS CRM Task Manager Final Project - Assignment 5

**Contact**: Available via GitHub

## 🙏 Acknowledgments

- NestJS team for the amazing framework
- TypeORM contributors for the robust ORM
- PostgreSQL community for the powerful database
- Docker team for containerization platform
- Open source community for tools and libraries

---

_Ready to build production-ready enterprise applications with NestJS? Let's get started! 🚀_
