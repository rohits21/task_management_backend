import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, ValidationPipe } from "@nestjs/common"
import { TasksEntity } from "src/config/database/entities/tasks.entity";
import { TaskModel } from "src/models/task.model";
import { AppService } from "src/services/app.service";


@Controller("tasks")
export class TasksController{

    constructor(private readonly appService : AppService){}

   
    @Post()
    async createNewTask(
        @Body(new ValidationPipe()) taskData: TaskModel
    ): Promise<TasksEntity>{
        
        try{

            return await this.appService.createNewTask(taskData) 
        }catch(error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
       
    }

    @Get()
    async getAllTasks() : Promise<TasksEntity[]>{
        try{
            return await this.appService.fetchAllTasks();

        }
        catch(error){
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Get(':id')
    async getTaskById(
        @Param('id', ParseIntPipe) id:number
    ): Promise<TasksEntity> {
        try{
            return await this.appService.fetchTaskById(id);
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND)
        }
    }

    @Put(':id')
    async updateTask(
        @Param("id", ParseIntPipe) id:number,
        @Body(new ValidationPipe()) taskData : Partial<TaskModel> 
    ): Promise<TasksEntity>{
        try{

            return await this.appService.updateTask(id, taskData);

        }catch(error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    @Delete(':id')
    async deleteTask(
        @Param('id', ParseIntPipe) id:number): Promise<string>{
            try{
                return await this.appService.deleteTask(id);
            }catch(error){
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
            }
            
        }
    

    


}