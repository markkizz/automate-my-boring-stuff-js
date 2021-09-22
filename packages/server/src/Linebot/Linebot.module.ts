import { Module, NestModule } from "@nestjs/common";

import { LinebotController } from "./Linebot.controller";
import { LinebotMessageService } from "./LinebotMessage.service";
import { AutomationService } from "@/services/AutomationService";
import { LineClient, lineClient } from "@/services/LineHttpClientService";

@Module({
  controllers: [LinebotController],
  providers: [
    LinebotMessageService,
    AutomationService,
    {
      provide: LineClient,
      useValue: lineClient
    }
  ],
  exports: [LinebotMessageService]
})
export class LinebotModule implements NestModule {
  public configure(/* consumer: MiddlewareConsumer */) {
    //
  }
}