import { Module } from "@nestjs/common";
import { databaseConnections } from "./database.connection";
import { TasksRepository } from "./repositories/tasks.repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { TasksEntity } from "./entities/tasks.entity";
import { tasksProviders } from "./entities/tasks.provider";



@Module({
    providers:[...databaseConnections, ...tasksProviders, TasksRepository],
    exports:[...databaseConnections, TasksRepository]
})
export class DatabaseModule{}