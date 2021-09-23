import { CanActivate, ExecutionContext, Injectable, Scope, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { JsonWebTokenError } from "jsonwebtoken";

@Injectable({
  scope: Scope.REQUEST
})
export class TimeTrackerAuthGuard implements CanActivate {

  constructor(
    private _jwtService: JwtService,
  ) {

  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const isJWTValid = this.validateToken(
      request.headers.authorization,
      request.headers.originalAuthorization as string
    );
    return isJWTValid;
  }

  public validateToken(token: string, tokenAsBearer?: string) {
    try {
      const isContainBearer = tokenAsBearer ? tokenAsBearer.includes("Bearer") : true;
      console.log("isContainBearer", isContainBearer);
      if (!isContainBearer) throw new UnauthorizedException();
      const isValid = this._jwtService.verify(token);
      if (!isValid) throw new UnauthorizedException();
      return true;
    } catch (error) {
      if (error instanceof JsonWebTokenError) throw new UnauthorizedException();
      throw error;
    }
  }
}