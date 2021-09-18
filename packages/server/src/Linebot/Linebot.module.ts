import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { linebotMiddleware } from "./Linebot.middleware"
import { LinebotController } from "./Linebot.controller"


@Module({
  controllers: [LinebotController]
})
export class LinebotModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(linebotMiddleware)
      .forRoutes(LinebotController)
  }
}