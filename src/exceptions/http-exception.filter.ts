import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  protected TAG: string = `${this.constructor.name}`;
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const  message = exception.response ? exception.response.message : 'Error';
    response
      .status(status)
      .json({
        error: {
          statusCode: status,
          message,
          timestamp: new Date().toISOString(),
          path: request.url,
        },
      });
  }
}
