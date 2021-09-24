import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private _logger = new Logger("HTTP");
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    // TODO: transform http status code to http status message
    const logMsg = `${request.method} ${request.originalUrl} - ${status} ${exception.message}`;
    this._logger.error(logMsg);
    const exceptionResponse = exception.getResponse() as { statusCode: number; message: string | string[]; error: string };
    response
      .status(status)
      .json({
        statusCode: status,
        message: exceptionResponse.message,
        error: exceptionResponse?.error || exception.message,
      });
  }
}