import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { MrMooLinebotMessageService } from "./MrMoo.service";

import { WebhookMessageEvent } from "../../types/Message";

@Controller("linebot/v1/mrmoo")
export class MrMooLinebotController {

  constructor(
    private _linebotMessageService: MrMooLinebotMessageService
  ) {}

  @HttpCode(200)
  @Post("/")
  public async incomingMessage(
    @Body() messageEvent: WebhookMessageEvent
  ) {
    this._linebotMessageService.manageMessageEvent(messageEvent.events);
    return {};
  }

}