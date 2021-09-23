import { applyDecorators, UseGuards, createParamDecorator, ExecutionContext } from "@nestjs/common";
import { TimeTrackerAuthGuard } from "../TimeTracker.guard";

export function Auth() {
  return applyDecorators(
    UseGuards(TimeTrackerAuthGuard)
  );
}

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});