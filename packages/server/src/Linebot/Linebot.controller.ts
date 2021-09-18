import { Body, Controller, HttpCode, Post } from "@nestjs/common";

import { WebhookMessageEvent } from "./types/Message"

@Controller("/")
export class LinebotController {

  @HttpCode(200)
  @Post("/")
  public async incomingMessage(
    @Body() messageEvent: WebhookMessageEvent
  ) {
    console.log("--------- message event ----------")
    console.log(messageEvent.events[0].message)
    return {}
  }

}