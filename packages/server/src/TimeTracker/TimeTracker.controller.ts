import { Body, Controller, Post } from "@nestjs/common";
import { TimeTrackerService } from "./TimeTracker.service";
import { LoginRequest } from "./types/Request";

@Controller("/v1/timetracker")
export class TimeTrackerController {

  constructor(
    private _timeTrackerService: TimeTrackerService
  ) {

  }

  @Post("/auth/login")
  public async login(
    @Body() loginRequest: LoginRequest
  ) {
    const response = await this._timeTrackerService.login(loginRequest.username, loginRequest.password);
    return response;
  }

}