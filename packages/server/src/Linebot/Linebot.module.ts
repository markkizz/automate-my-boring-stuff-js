import { Module, NestModule } from "@nestjs/common";

import { LinebotController } from "./Linebot.controller"
import { LinebotMessageService } from "./LinebotMessage.service";
import { AutomationService } from "@/services/AutomationService";

@Module({
  controllers: [LinebotController],
  providers: [LinebotMessageService, AutomationService],
  exports: [LinebotMessageService]
})
export class LinebotModule implements NestModule {
  public configure(/* consumer: MiddlewareConsumer */) {
    //
  }
}