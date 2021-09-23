import { Injectable, NestMiddleware, Scope } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable({
  scope: Scope.REQUEST
})
export class TimeTrackerAuthMiddleware implements NestMiddleware {

  public async use(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization?.split(" ")?.[1];
    if (authToken) {
      request.headers.authorization = authToken;
    }
    next();
  }
}