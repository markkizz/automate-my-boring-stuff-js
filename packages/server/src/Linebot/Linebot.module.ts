import { Module, NestModule } from "@nestjs/common";

import { MrMooLinebotController } from "./MrMoo/v1/MrMoo.controller";
import { MrMooLinebotMessageService } from "./MrMoo/v1/MrMoo.service";
import { AutomationService } from "@/services/AutomationService";
import { LineClient, lineClient } from "@/services/LineHttpClientService";

@Module({
  controllers: [MrMooLinebotController],
  providers: [
    MrMooLinebotMessageService,
    AutomationService,
    {
      provide: LineClient,
      useValue: lineClient
    }
  ],
  exports: [MrMooLinebotMessageService]
})
export class LinebotModule implements NestModule {
  public configure(/* consumer: MiddlewareConsumer */) {
    //
  }
}