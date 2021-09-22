import { Injectable, Logger, NestMiddleware, HttpStatus } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private _logger = new Logger("HTTP");

  public async use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    res.on("finish", () => {
      const { statusCode, statusMessage } = res;
      const logMsg = `${method} ${originalUrl} - ${statusCode} ${statusMessage}`;
      if (statusCode >= HttpStatus.OK && statusCode < HttpStatus.BAD_REQUEST) {
        this._logger.log(logMsg);
      }
    });
    next();
  }

}