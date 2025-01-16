
import { Sequelize } from 'sequelize-typescript';
import { TasksEntity } from './entities/tasks.entity';



export const databaseConnections = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
      });
      sequelize.addModels([TasksEntity]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
    