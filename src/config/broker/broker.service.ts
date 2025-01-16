import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import * as amqp from 'amqplib';


@Injectable()
export class BrokerService implements OnModuleInit, OnModuleDestroy{
  
  // RabbitMQ exchange and queue names are fetched from environment variables
    private readonly EXCHANGE_NAME = process.env.RABBITMQ_EXCHANGE;
    private readonly TASK_NOTIFICATION_QUEUE = process.env.RABBITMQ_QUEUE;
    private readonly ROUTING_KEY = process.env.RABBITMQ_ROUTINGKEY;
    private connection: amqp.Connection;
    private channel: amqp.Channel;

    
    async onModuleInit() {
        try {
          // Connect to RabbitMQ server
          this.connection = await amqp.connect({
            protocol: 'amqp',
            hostname: process.env.RABBITMQ_HOST,
            port: +process.env.RABBITMQ_PORT, 
            username: process.env.RABBITMQ_USERNAME,
            password: process.env.RABBITMQ_PASSWORD,
          });
    
          // Create a channel
          this.channel = await this.connection.createChannel();
    
          // Assert an exchange
          await this.channel.assertExchange(this.EXCHANGE_NAME, 'direct', {
            durable: true,
          });
    
          // Assert the queue
          await this.channel.assertQueue(this.TASK_NOTIFICATION_QUEUE, {
            durable: true,
          });
    
          // Bind the queue to the exchange with the routing key
          await this.channel.bindQueue(
            this.TASK_NOTIFICATION_QUEUE,
            this.EXCHANGE_NAME,
            this.ROUTING_KEY,
          );
    
          console.log(
            `RabbitMQ: Connected. Exchange "${this.EXCHANGE_NAME}" and Queue "${this.TASK_NOTIFICATION_QUEUE}" are ready.`,
          );
        } catch (error) {
          console.error('RabbitMQ: Failed to connect or initialize.', error);
          throw new Error('Failed to initialize RabbitMQ service.');
        }
      }
    
      async publishToTaskQueue(message: string): Promise<void> {
        if (!this.channel) {
          throw new Error('RabbitMQ channel is not initialized.');
        }

        try{

          this.channel.publish(
            this.EXCHANGE_NAME,
            this.ROUTING_KEY,
            Buffer.from(message),
            { persistent: true }, // Ensures message survives broker restarts
          );
      
          console.log(`Message published to "${this.EXCHANGE_NAME}" with key "${this.ROUTING_KEY}":`, message);
        }catch(error){
          console.error('RabbitMQ: Failed to publish message.', error);
          throw new Error('Failed to publish message to RabbitMQ.');
    
        }
    
      }


      async onModuleDestroy() {
        if (this.channel) {
          await this.channel.close();
        }
        if (this.connection) {
          await this.connection.close();
        }
      }
    
}