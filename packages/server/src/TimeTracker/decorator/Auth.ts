import { applyDecorators, UseGuards } from "@nestjs/common";
import { TimeTrackerAuthGuard } from "../TimeTracker.guard";

export function Auth() {
  return applyDecorators(
    UseGuards(TimeTrackerAuthGuard)
  );
}