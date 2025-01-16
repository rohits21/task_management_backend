# Task Management Application

## Introduction

The **Task Management Application** is a robust, scalable platform designed to manage and organize tasks efficiently. Built using the NestJS framework, it leverages Redis for caching, RabbitMQ for message queuing, and MySQL for persistent storage. The application supports advanced logging and can be monitored using PM2 for production readiness.

---

## Prerequisites

Before setting up the application, ensure you have the following installed on your system:

1. **Node.js** (>=16.x) and **npm** (>=8.x)
2. **MySQL** (>=8.x)
3. **Redis** (>=6.x)
4. **RabbitMQ** (>=3.x)
5. **PM2** (for process management)

---

## Installation Guide

### Step 1: Clone the Repository

```bash
git clone https://github.com/rohits21/task_management_backend
cd task_management_backend
```

### Step 2: Install Dependencies

Run the following command to install all necessary packages:

```bash
npm install
```

### Step 3: Environment Configuration

Create a `.env` file in the root of the project and add your environment-specific configuration. Below is an example structure:

```env
PORT=<application-port>
DB_HOST=<mysql-host>
DB_PORT=<mysql-port>
DB_USER=<mysql-username>
DB_PASS=<mysql-password>
DB_NAME=<mysql-database>

RABBITMQ_HOST=<rabbitmq-host>
RABBITMQ_PORT=<rabbitmq-port>
RABBITMQ_USERNAME=<rabbitmq-username>
RABBITMQ_PASSWORD=<rabbitmq-password>
RABBITMQ_EXCHANGE=<rabbitmq-exchange>
RABBITMQ_QUEUE=<rabbitmq-queue>
RABBITMQ_ROUTINGKEY=<rabbitmq-routing-key>

REDIS_HOST=<redis-host>
REDIS_PORT=<redis-port>
```

### Step 4: Database Setup

1. Start MySQL and create a new database:

```sql
CREATE DATABASE tasksmanagementdb;
```

2. Update the `.env` file with your MySQL configuration.
3. Run migrations or initialize the database schema if necessary.

### Step 5: Connect RabbitMQ and Redis

Ensure RabbitMQ and Redis are running locally or on configured hosts. Update the `.env` file with their respective connection details.

---

## Running the Application

### Using PM2

1. Ensure PM2 is installed globally:

```bash
npm install -g pm2
```

2. Start the application using the PM2 ecosystem file:

```bash
pm2 start pm2-ecosystem.config.ts
```

3. Monitor the application:

```bash
pm2 status
```

4. View logs:

```bash
pm2 logs
```

### Without PM2

Start the application in development mode:

```bash
npm run start:dev
```

---

## Logging

Logs are generated using Winston and stored in a separate file `logs/app.log`. They include detailed information about API requests, responses, and errors with timestamps.

---

## Example .env Configuration

Below is an example structure of the `.env` file 

```env
PORT=<your-port>
DB_HOST=<your-database-host>
DB_PORT=<your-database-port>
DB_USER=<your-database-user>
DB_PASS=<your-database-password>
DB_NAME=<your-database-name>

RABBITMQ_HOST=<your-rabbitmq-host>
RABBITMQ_PORT=<your-rabbitmq-port>
RABBITMQ_USERNAME=<your-rabbitmq-username>
RABBITMQ_PASSWORD=<your-rabbitmq-password>
RABBITMQ_EXCHANGE=<your-rabbitmq-exchange>
RABBITMQ_QUEUE=<your-rabbitmq-queue>
RABBITMQ_ROUTINGKEY=<your-rabbitmq-routing-key>

REDIS_HOST=<your-redis-host>
REDIS_PORT=<your-redis-port>
```

---

## Additional Notes

1. Ensure all external dependencies (Redis, RabbitMQ, MySQL) are properly configured and accessible from your environment.
2. Use `.env` files responsibly and avoid committing them to version control.

For further assistance, feel free to reach out to the me `rohit.sahu@nagarro.com`.

---


