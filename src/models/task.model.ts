import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { TaskPriority, TaskStatus } from "src/config/database/entities/tasks.entity";

export class TaskModel {

    @IsNotEmpty()
    @IsString()
    title : string;

    @IsNotEmpty()
    @IsString()
    description : string;

    @IsEnum(TaskStatus)
    status : TaskStatus;

    @IsEnum(TaskPriority)
    priority : TaskPriority;
}