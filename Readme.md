# Task Management Application

## Introduction
The Task Management Application is a comprehensive solution for managing tasks efficiently. It provides seamless integration with RabbitMQ, Redis, and MySQL, ensuring robust performance and scalability. This guide will help you set up and run the project locally, both with and without PM2, and configure it to connect with external services.

---

## Prerequisites
Ensure the following tools and services are installed on your system:

1. **Node.js** (v16 or higher) and **npm**
   - Download and install from [Node.js Official Website](https://nodejs.org/).

2. **MySQL** (v5.7 or higher)
   - Install MySQL and ensure the server is running.
   - Set up a database named `tasksmanagementdb`.

3. **RabbitMQ** (v3.8 or higher)
   - Install RabbitMQ and ensure the service is running.
   - Default credentials: `guest`/`guest`.

4. **Redis** (v6 or higher)
   - Install Redis and ensure the service is running.

---

## Dependencies
The project uses the following dependencies:
- NestJS
- Redis
- RabbitMQ
- PM2 for process management

To install all required packages, follow the instructions in the Project Setup Guide.

---

## Project Setup Guide

### Step 1: Clone the Repository
```bash
git clone https://github.com/rohits21/task_management_backend.git
cd task_management_backend
```

### Step 2: Install Dependencies
Ensure you are in the project directory, then run:
```bash
npm install
```

### Step 3: Build the Project
Build the project to generate the `dist/` directory:
```bash
npm run build
```

---

## Connecting with Redis, RabbitMQ, and MySQL

### MySQL Configuration
1. Ensure MySQL is running and create a database:
   ```sql
   CREATE DATABASE tasksmanagementdb;
   ```
2. Update the `.env` file with your MySQL credentials.

### RabbitMQ Configuration
1. Ensure RabbitMQ is running.
2. Verify the default credentials or create a new user if required.
3. Update the `.env` file with RabbitMQ credentials and exchange/queue details.

### Redis Configuration
1. Ensure Redis is running.
2. Update the `.env` file with Redis host and port.

---

## Running the Application

### Without PM2
Start the application in development mode:
```bash
npm run start:dev
```

Or start in production mode:
```bash
npm run start:prod
```

### With PM2
Use the provided PM2 configuration file to run the application:
1. Start the application:
   ```bash
   pm2 start pm2-ecosystem.config.ts --env production
   ```
2. Monitor logs:
   ```bash
   pm2 logs
   ```
3. Save the PM2 process list:
   ```bash
   pm2 save
   ```
4. Set PM2 to start on boot:
   ```bash
   pm2 startup
   ```

---

## Example .env File
Below is a sample `.env` file configuration:

```env
PORT=2100

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=root
DB_NAME=tasksmanagementdb

RABBITMQ_HOST=localhost
RABBITMQ_PORT=5672
RABBITMQ_USERNAME=guest
RABBITMQ_PASSWORD=guest
RABBITMQ_EXCHANGE=task_exchange
RABBITMQ_QUEUE=task_notifications
RABBITMQ_ROUTINGKEY=task.notification

REDIS_HOST=localhost
REDIS_PORT=6379
```

---

## API Endpoints

### GET `/tasks`
Get all tasks.

**Response:**
```json
{
  "id": 1,
  "title": "Task 10",
  "description": "Task 10 description",
  "status": "In Progress",
  "priority": "Low",
  "createdAt": "2025-01-16T10:00:00.000Z",
  "updatedAt": "2025-01-16T10:00:00.000Z"
},
{
  "id": 2,
  "title": "Task 10",
  "description": "Task 10 description",
  "status": "In Progress",
  "priority": "Low",
  "createdAt": "2025-01-16T10:00:00.000Z",
  "updatedAt": "2025-01-16T10:00:00.000Z"
}
```

### GET `/tasks/:id`
Get task by id.

**Response:**
```json
{
  "id": 1,
  "title": "Task 10",
  "description": "Task 10 description",
  "status": "In Progress",
  "priority": "Low",
  "createdAt": "2025-01-16T10:00:00.000Z",
  "updatedAt": "2025-01-16T10:00:00.000Z"
}
```

### POST `/tasks`
Create a new task.

**Request Body:**
```json
{
  "title": "Task 10",
  "description": "Task 10 description",
  "status": "In Progress",
  "priority": "Low"
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Task 10",
  "description": "Task 10 description",
  "status": "In Progress",
  "priority": "Low",
  "createdAt": "2025-01-16T10:00:00.000Z",
  "updatedAt": "2025-01-16T10:00:00.000Z"
}
```

### PUT `/tasks/:id`
Update an existing task.

**Request Body:**
```json
{
  "title": "Updated Task Title",
  "description": "Updated description",
  "status": "Completed",
  "priority": "High"
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Updated Task Title",
  "description": "Updated description",
  "status": "Completed",
  "priority": "High",
  "createdAt": "2025-01-16T10:00:00.000Z",
  "updatedAt": "2025-01-16T12:00:00.000Z"
}
```

### DELETE `/tasks/:id`
Delete task by id.

**Response:**
```{
  "message": "Task with ID 1 deleted successfully."
}```



---

## Additional Notes
1. Ensure all services (MySQL, RabbitMQ, Redis) are running and accessible.
2. Use appropriate environment variables for different environments (development, production).
3. PM2 provides robust process management, so prefer it for production deployment.

For further assistance, feel free to reach out to the me rohit.sahu@nagarro.com.

