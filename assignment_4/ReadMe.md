# Assignment 4: NestJS Blog API with Database Integration

Welcome to the fourth assignment of the NestJS course! This assignment will help you build a complete Blog API with Posts and Users management, including database integration, TypeORM entities, CRUD operations, data validation, DTOs, and search functionality.

> **Updates: Code is Deployed**
>
> As per mentor's feedback on submission, code is deployed on Vercel
>
> [Click Here to view Vercel app](https://nest-blog-assignment-4.vercel.app/)

## 📁 Project Structure

### Code Implementation

- **Location**: `./blog/`
- **Description**: Complete NestJS application with Blog API implementation using TypeORM and SQLite database
- **Key Components**:
  - **Posts API**: Full CRUD operations for blog posts with search functionality
  - **Users API**: User management with DTOs and validation
  - **Database Integration**: TypeORM entities for Posts and Users with SQLite database
  - Complete testing setup with unit and e2e tests

### Database Schema

- **Location**: `./db/`
- **Contents**:
  - `blog_db.sql` - SQL schema for the blog database

### Screenshots & Documentation

- **Location**: `./screens/`
- **Contents**:
  - Postman screenshots showing API endpoints (GET, POST, PUT, DELETE for posts and users)
  - phpMyAdmin screenshots showing database tables and data
  - Terminal outputs demonstrating command execution and server startup
  - API testing screenshots for posts creation, retrieval, search, and user management

## 🚀 Getting Started

1. **Navigate to the project directory**:

   ```bash
   cd blog
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the application**:

   ```bash
   npm run start:dev
   ```

4. **Test the APIs**: Use Postman or curl to test the endpoints (see screenshots in `./screens/` folder)

5. **Database**: The application uses SQLite database (`blog.db`) which is created automatically

## 📋 What You'll Learn

- ✅ Building a Blog API with Posts and Users using TypeORM
- ✅ Database integration with SQLite and entity relationships
- ✅ Creating and using DTOs for data validation and transfer
- ✅ Implementing controllers with comprehensive HTTP methods
- ✅ Understanding NestJS module system and dependency injection
- ✅ Search functionality for posts
- ✅ Project configuration and structure for database-driven applications
- ✅ Testing API endpoints with Postman
- ✅ Database schema design and management

## 🔍 Key Files to Explore

### Core Application Files

- `src/main.ts` - Application entry point
- `src/app.module.ts` - Root application module
- `src/app.controller.ts` - Main application controller

### Feature Modules

- **Posts Module**:

  - `src/posts/posts.controller.ts` - Posts API with full CRUD and search
  - `src/posts/posts.service.ts` - Business logic for post operations
  - `src/posts/post.entity.ts` - Post entity for database mapping
  - `src/posts/dto/post.dto.ts` - Post data validation DTO
  - `src/posts/posts.module.ts` - Posts feature module

- **Users Module**:

  - `src/user/user.controller.ts` - Users API controller
  - `src/user/user.service.ts` - User business logic
  - `src/user/user.entity.ts` - User entity for database mapping
  - `src/user/dto/user.dto.ts` - User data validation DTO
  - `src/user/user.module.ts` - Users feature module

### Database Files

- `db/blog_db.sql` - SQL schema for creating database tables

## 📸 Screenshots Overview

The `./screens/` folder contains screenshots showing:

- **Posts API**:

  - GET requests to retrieve all posts and search posts
  - POST requests to create new posts with validation
  - Post management and search functionality

- **Users API**:

  - GET requests for user data retrieval
  - POST requests for user creation
  - User management screenshots

- **Database**:

  - phpMyAdmin views of posts and users tables
  - Database structure and data visualization

- **Terminal & Logs**:

  - Server startup logs
  - API response logs
  - Command execution outputs

- **Postman Collections**:
  - Complete API testing workflows
  - Request/response validation examples
  - Search functionality demonstrations

## 🛠 API Endpoints

### Posts Endpoints

- `GET /posts` - Retrieve all posts
- `GET /posts/search` - Search posts by title or content
- `GET /posts/:id` - Retrieve single post
- `POST /posts` - Create new post
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

### Users Endpoints

- `GET /users` - Retrieve all users
- `GET /users/search` - Search users by name or email
- `GET /users/:id` - Retrieve single user
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## 🔧 Advanced Features

- **TypeORM Integration**: Database ORM for entity management
- **SQLite Database**: File-based database for easy setup
- **Search Functionality**: Query-based search for posts and users
- **DTO Validation**: Comprehensive data validation using class-validator
- **Entity Relationships**: Proper database schema with entities
- **Error Handling**: Proper error responses and status codes
- **Modular Architecture**: Well-organized modules for scalability
- **TypeScript Support**: Full TypeScript implementation with strict typing

---

_Ready to explore NestJS with database integration? Let's get started! 🎯_
