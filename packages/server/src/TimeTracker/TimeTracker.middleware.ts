import { Injectable, NestMiddleware, Scope } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { TimeTrackerFactory } from "./TimeTracker.factory";

@Injectable({
  scope: Scope.REQUEST
})
export class TimeTrackerAuthMiddleware implements NestMiddleware {

  constructor(
    private _factory: TimeTrackerFactory
  ) {

  }

  public async use(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization?.split(" ")?.[1];
    if (authToken) {
      request.headers.originalAuthorization = request.headers.authorization;
      request.headers.authorization = authToken;
    }
    this._factory.init();
    next();
  }
}