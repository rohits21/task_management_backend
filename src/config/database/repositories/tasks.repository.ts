import { TasksEntity } from "../entities/tasks.entity";
import { Injectable , Inject} from "@nestjs/common";

@Injectable()
export class TasksRepository{

    constructor(
         @Inject('TASKS_REPOSITORY') 
         private taskEntity : typeof TasksEntity) { }


    async createNewTask(taskData : Partial<TasksEntity>): Promise<TasksEntity>{
        return await this.taskEntity.create<TasksEntity>(taskData);
    }

    async fetchAllTasks() : Promise<TasksEntity[]>{
        return await this.taskEntity.findAll();
    }

    async findTaskById(id:number) : Promise<TasksEntity>{
        return await this.taskEntity.findByPk(id);
    }

    async updateTask(
        id:number, 
        taskData : Partial<TasksEntity>
    ): Promise<TasksEntity>{

        const task = await this.findTaskById(id);
        if(!task){
            throw new Error("Task not found")
        }
        return await  task.update(taskData)
    }

    async deleteTask(id:number ) : Promise<void>{
        const task = await this.findTaskById(id);
        if(!task){
            throw new Error("Task not found")
        }
        await task.destroy();
    }
}