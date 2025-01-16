import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl, headers, query, body } = req;
    const startTime = Date.now();

    // Log incoming request details
    this.logger.info(`Incoming Request: ${method} ${originalUrl} \n headers: ${JSON.stringify(headers)} \n body: ${JSON.stringify(body)} `, {
      timestamp: new Date().toISOString(),
      method,
      path: originalUrl,
      headers,
      query,
      body,
    });

    // Capture the response
    const originalWrite = res.write.bind(res);
    const originalEnd = res.end.bind(res);
    const chunks: Buffer[] = [];

    res.write = (chunk: any, ...args: any[]): boolean => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      return originalWrite(chunk, ...args);
    };

    res.end = (chunk: any, ...args: any[]): Response<any, Record<string, any>> => {
      if (chunk) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      }

      const responseBody = Buffer.concat(chunks).toString('utf8');
      const { statusCode } = res;
      const responseHeaders = res.getHeaders();

      // Log outgoing response details
      this.logger.info(`Outgoing Response: ${method} ${originalUrl} ${statusCode} /n ${responseBody} `, {
        timestamp: new Date().toISOString(),
        method,
        path: originalUrl,
        statusCode,
        duration: `${Date.now() - startTime}ms`,
        headers: responseHeaders,
        responseBody: responseBody || null,
      });

      return originalEnd(chunk, ...args);
    };

    next();
  }
}
