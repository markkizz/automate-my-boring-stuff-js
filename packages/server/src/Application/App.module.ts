import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";

import { LinebotModule } from "@/Linebot/Linebot.module"
import { HealthCheckController } from "@/HealthCheck/HealthCheck.controller"
import { linebotMiddleware } from "@/Linebot/Linebot.middleware";
import { JsonBodyMiddleware } from "@/middlewares/BodyParserMiddleware";
import { LoggerMiddleware } from "@/middlewares/LoggerMiddleware";

@Module({
  imports: [LinebotModule],
  controllers: [HealthCheckController],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // HACK: validate-signature in line sdk
    consumer
      .apply(linebotMiddleware)
      .forRoutes({
        path: "/linebot/webhook",
        method: RequestMethod.POST
      })
      .apply(JsonBodyMiddleware, LoggerMiddleware)
      .forRoutes("*")
  }
}
