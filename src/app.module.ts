import { MiddlewareConsumer, Module} from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { DatabaseModule } from './config/database/database.module';
import { TasksController } from './controllers/tasks.controller';
import { ConfigModule } from '@nestjs/config';
import { RedisCacheModule } from './config/redis/cache.module';
import { BrokerModule } from './config/broker/broker.module';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './config/logger/winston.config';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './middlewares/http-exception.filter';
import { LoggingMiddleware } from './middlewares/logging.middleware';



@Module({
  imports: [
   WinstonModule.forRoot(winstonConfig),
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule, 
    RedisCacheModule, 
    BrokerModule],
  controllers: [AppController,TasksController],
  providers: [AppService, {provide : APP_FILTER, useClass: HttpExceptionFilter}],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
