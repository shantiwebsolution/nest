# Assignment 2: NestJS Users API

Welcome to the second assignment of the NestJS course! This assignment will help you build a complete Users API with CRUD operations, data validation, and DTOs.

> **Updates: Code is Deployed**
>
> As per mentor's feed back on submition code is deployeed on vercel
>
> [ Click Here to view vercel app](https://nest-iota-ten.vercel.app/)

## 📁 Project Structure

### Code Implementation

- **Location**: `./users/`
- **Description**: Complete NestJS application with Users API implementation
- **Key Components**:
  - Users controller for handling HTTP requests (GET, POST)
  - Users service for business logic and data management
  - Users module for organization
  - User DTO for data validation and transfer
  - Complete testing setup with unit and e2e tests

### Screenshots & Documentation

- **Location**: `./screens/`
- **Contents**:
  - Postman screenshots showing API endpoints (GET and POST requests)
  - Terminal outputs demonstrating command execution and server startup
  - Validation screenshots for request/response handling

## 🚀 Getting Started

1. **Navigate to the project directory**:

   ```bash
   cd users
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the application**:

   ```bash
   npm run start:dev
   ```

4. **Test the API**: Use Postman or curl to test the endpoints (see screenshots in `./screens/` folder)

## 📋 What You'll Learn

- ✅ Building a complete Users API with CRUD operations
- ✅ Creating and using DTOs for data validation
- ✅ Implementing controllers with GET and POST endpoints
- ✅ Understanding NestJS module system and dependency injection
- ✅ Testing API endpoints with Postman
- ✅ Project configuration and structure for API development

## 🔍 Key Files to Explore

- `src/main.ts` - Application entry point
- `src/app.module.ts` - Root application module
- `src/users/users.controller.ts` - Users API controller with GET and POST endpoints
- `src/users/users.service.ts` - Business logic for user operations
- `src/users/user.dto.ts` - Data Transfer Object for validation
- `src/users/users.module.ts` - Users feature module

## 📸 Screenshots Overview

The `./screens/` folder contains screenshots showing:

- Postman GET request to retrieve users
- Postman POST requests to create users with validation
- Terminal outputs showing server startup and API responses
- Request/response validation examples
- API testing and debugging workflows

---

_Ready to explore NestJS? Let's get started! 🎯_
