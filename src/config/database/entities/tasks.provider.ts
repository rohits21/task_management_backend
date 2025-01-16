import { TasksEntity } from "./tasks.entity";

export const tasksProviders = [
    {
        provide: 'TASKS_REPOSITORY',
        useValue: TasksEntity
    }
]