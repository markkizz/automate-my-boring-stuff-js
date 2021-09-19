import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { LinebotMessageService } from "./LinebotMessage.service";

import { WebhookMessageEvent } from "./types/Message"

@Controller("/linebot")
export class LinebotController {

  constructor(
    private _linebotMessageService: LinebotMessageService
  ) {}

  @HttpCode(200)
  @Post("/mrmoo")
  public async incomingMessage(
    @Body() messageEvent: WebhookMessageEvent
  ) {
    this._linebotMessageService.manageMessageEvent(messageEvent.events)
    return {}
  }

}