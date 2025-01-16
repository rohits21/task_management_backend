import {
    Catch,
    ExceptionFilter,
    ArgumentsHost,
    HttpException,
    Inject,
  } from '@nestjs/common';
  import { Logger } from 'winston';
  import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
  
  @Catch(HttpException)
  export class HttpExceptionFilter implements ExceptionFilter {
    constructor(
      @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}
  
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
      const status = exception.getStatus();
  
      const errorResponse = {
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        status,
        message: exception.message,
      };
  
      this.logger.error(
        `HTTP Error: ${status} ${request.method} ${request.url} - ${errorResponse.message}`,
        { errorResponse },
      );
  
      response.status(status).json(errorResponse);
    }
  }
  