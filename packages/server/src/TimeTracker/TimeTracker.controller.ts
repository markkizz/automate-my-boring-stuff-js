import { Body, Controller, Post, HttpCode, Get } from "@nestjs/common";
import { Auth } from "./decorator/Auth";
import { TimeTrackerService } from "./TimeTracker.service";
import { ClockingRequest, LoginRequest } from "./types/Request";

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

  @Auth()
  @Get("/")
  public async getLatestTimeEntry() {
    const response = await this._timeTrackerService.getLatestTimeEntry();
    return response;
  }

  @HttpCode(201)
  @Auth()
  @Post("/")
  public async clocking(
    @Body() clockRequest: ClockingRequest
  ) {
    const response = await this._timeTrackerService.clocking(clockRequest.type);
    return response;
  }

}