# Assignment 3: NestJS Products, Users & Orders API

Welcome to the third assignment of the NestJS course! This assignment will help you build a comprehensive API with multiple entities including Products, Users, and Orders with CRUD operations, data validation, DTOs, and advanced features like logging.

> **Updates: Code is Deployed**
>
> As per mentor's feedback on submission, code is deployed on Vercel
>
> [Click Here to view Vercel app](https://nest-qa94.vercel.app/)

## 📁 Project Structure

### Code Implementation

- **Location**: `./products/`
- **Description**: Complete NestJS application with Products, Users, and Orders API implementation
- **Key Components**:
  - **Products API**: Full CRUD operations for product management
  - **Users API**: User management with DTOs and validation
  - **Orders API**: Order processing with response DTOs
  - **Logger Module**: Custom logging service for enhanced debugging
  - Complete testing setup with unit and e2e tests

### Screenshots & Documentation

- **Location**: `./screens/`
- **Contents**:
  - Postman screenshots showing all API endpoints (GET, POST, PUT, DELETE)
  - Terminal outputs demonstrating command execution and server startup
  - API testing screenshots for products, users, and orders
  - Validation screenshots for request/response handling

## 🚀 Getting Started

1. **Navigate to the project directory**:

   ```bash
   cd products
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

## 📋 What You'll Learn

- ✅ Building multiple APIs (Products, Users, Orders) with full CRUD operations
- ✅ Creating and using DTOs for data validation and transfer
- ✅ Implementing controllers with comprehensive HTTP methods
- ✅ Understanding NestJS module system and dependency injection
- ✅ Custom logger implementation for better debugging
- ✅ Advanced project structure with multiple feature modules
- ✅ Testing API endpoints with Postman
- ✅ Project configuration and structure for complex API development

## 🔍 Key Files to Explore

### Core Application Files

- `src/main.ts` - Application entry point
- `src/app.module.ts` - Root application module
- `src/app.controller.ts` - Main application controller

### Feature Modules

- **Products Module**:

  - `src/products/products.controller.ts` - Products API with full CRUD
  - `src/products/products.service.ts` - Business logic for products
  - `src/products/product.dto.ts` - Product data validation
  - `src/products/products.module.ts` - Products feature module

- **Users Module**:

  - `src/users/users.controller.ts` - Users API controller
  - `src/users/users.service.ts` - User business logic
  - `src/users/user.dto.ts` - User data validation
  - `src/users/users.module.ts` - Users feature module

- **Orders Module**:

  - `src/orders/orders.controller.ts` - Orders API controller
  - `src/orders/orders.service.ts` - Order processing logic
  - `src/orders/order.dto.ts` & `src/orders/order-response.dto.ts` - Order DTOs
  - `src/orders/orders.module.ts` - Orders feature module

- **Logger Module**:
  - `src/logger/logger.service.ts` - Custom logging service
  - `src/logger/logger.module.ts` - Logger feature module

## 📸 Screenshots Overview

The `./screens/` folder contains screenshots showing:

- **Products API**:

  - GET requests to retrieve all products and single product
  - POST requests to create new products with validation
  - Product data management screenshots

- **Users API**:

  - GET requests for user data retrieval
  - POST requests for user creation
  - User management screenshots

- **Orders API**:

  - GET requests for order information
  - Order processing screenshots

- **Terminal & Logs**:

  - Server startup logs
  - API response logs with custom logger
  - Command execution outputs

- **Postman Collections**:
  - Complete API testing workflows
  - Request/response validation examples
  - Error handling demonstrations

## 🛠 API Endpoints

### Products Endpoints

- `GET /products` - Retrieve all products
- `GET /products/:id` - Retrieve single product
- `POST /products` - Create new product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### Users Endpoints

- `GET /users` - Retrieve all users
- `GET /users/:id` - Retrieve single user
- `POST /users` - Create new user

### Orders Endpoints

- `GET /orders` - Retrieve all orders
- `GET /orders/:id` - Retrieve single order
- `POST /orders` - Create new order

## 🔧 Advanced Features

- **Custom Logger**: Integrated logging service for better debugging
- **DTO Validation**: Comprehensive data validation using class-validator
- **Error Handling**: Proper error responses and status codes
- **Modular Architecture**: Well-organized modules for scalability
- **TypeScript Support**: Full TypeScript implementation with strict typing

---

_Ready to explore advanced NestJS features? Let's get started! 🎯_
