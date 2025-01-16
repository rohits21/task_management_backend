

import { Injectable } from "@nestjs/common";
import { AutoIncrement, Column, CreatedAt, DataType, Default, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";


 export enum TaskStatus {
    Pending = 'Pending',
    InProgress = 'In Progress',
    Completed = 'Completed',
  }


  export enum TaskPriority {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
  }



  @Table({
    tableName: 'tasks',
    timestamps: true
})

export class TasksEntity extends Model<TasksEntity>{

    @PrimaryKey
    @AutoIncrement
    @Column({
        type : DataType.INTEGER,
        allowNull:false
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    title: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    description : string;

    @Default(TaskStatus.Pending)
    @Column({
        type: DataType.ENUM(...Object.values(TaskStatus)),
        allowNull:false
    })
    status : TaskStatus;

    @Column({
        type: DataType.ENUM(...Object.values(TaskPriority)),
        allowNull: false,
    })
    priority: TaskPriority;

    @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;
}

