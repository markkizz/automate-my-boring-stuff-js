import { Controller, Get, HttpCode } from "@nestjs/common";

@Controller("/")
export class HealthCheckController {

  @HttpCode(200)
  @Get("/")
  public async healthCheck() {
    return {
      statusCode: 200,
      message: "OK"
    }
  }

}