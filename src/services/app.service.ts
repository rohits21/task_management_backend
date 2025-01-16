import { Injectable } from '@nestjs/common';
import { BrokerService } from 'src/config/broker/broker.service';
import { TasksEntity } from 'src/config/database/entities/tasks.entity';
import { TasksRepository } from 'src/config/database/repositories/tasks.repository';
import { RedisService } from 'src/config/redis/redis.service';
import { TaskModel } from 'src/models/task.model';

@Injectable()
export class AppService {


  constructor(
    private readonly taskRepository: TasksRepository,
    private readonly redisService: RedisService,
    private readonly brokerService: BrokerService

  ) { }

  // Key used for caching tasks
  private readonly CACHE_KEY = 'alltasks:1';


  getHello(): string {
    return '<h1>Welcome to Task Management API</h1>';
  }


  async createNewTask(taskData: TaskModel): Promise<TasksEntity> {
    try {
      const newTask = await this.taskRepository.createNewTask(taskData);
      const message = JSON.stringify({ action: 'create task', task: newTask });
      await this.brokerService.publishToTaskQueue(message);
      return newTask;
    } catch (error) {
      console.error('Error creating new task', { taskData, error });
      throw new Error('Failed to create new task');
    }
  }

  async fetchAllTasks(): Promise<TasksEntity[]> {

    try {
      const cachedTasks = await this.redisService.get<TasksEntity[]>(this.CACHE_KEY);

      if (cachedTasks) {
        console.log('Returning tasks from cache.');
        return cachedTasks;
      }

      const allTasks = await this.taskRepository.fetchAllTasks();

      await this.redisService.set(this.CACHE_KEY, allTasks);

      return allTasks;
    } catch (error) {
      console.error('Error fetching tasks', error);
      throw new Error('Failed to fetch tasks');
    }

  }

  async fetchTaskById(id: number): Promise<TasksEntity> {

    try {
      const task = await this.taskRepository.findTaskById(id);
      if (!task) {
        throw new Error("Task not found");
      }
      return task;
    }
    catch (error) {
      console.error(`Error fetching task with ID: ${id}`, error);
      throw new Error(`Failed to fetch task with ID: ${id}`);
    }
  }

  async updateTask(
    id: number,
    taskData: Partial<TasksEntity>
  ): Promise<TasksEntity> {

    try {
      const updatedTask = await this.taskRepository.updateTask(id, taskData);
      const message = JSON.stringify({ action: 'update task', task: updatedTask });
      await this.brokerService.publishToTaskQueue(message)
      return updatedTask;
    }

    catch (error) {
      console.error(`Error updating task with ID: ${id}`, { taskData, error });
      throw new Error('Failed to update task');
    }

  }

  async deleteTask(id: number): Promise<string> {

    try {
      await this.taskRepository.deleteTask(id);


      const message = JSON.stringify({ action: 'delete', taskId: id });
      await this.brokerService.publishToTaskQueue(message);
      return `Task with ID ${id} deleted successfully.`;
    }

    catch (error) {
      console.error(`Error deleting task with ID: ${id}`, error);
      throw new Error(`Failed to delete task with ID: ${id}`);

    }

  }
}
