import { AutomationService } from "@/services/AutomationService";
import { Controller, Get, HttpCode } from "@nestjs/common";

@Controller("/")
export class HealthCheckController {
  constructor(
    private _automationService: AutomationService
  ) {

  }

  @HttpCode(200)
  @Get("/")
  public async healthCheck() {
    this._automationService.automateMeanGoogleForm()
    return {
      statusCode: 200,
      message: "OK"
    }
  }
}