import { AutomationService } from "@/services/AutomationService";
import { WorkinStatus } from "@automation/browser-automation";
import { Inject, Injectable, Scope } from "@nestjs/common";

import { TextEventMessage } from "./types/Message"

@Injectable({
  scope: Scope.REQUEST
})
export class LinebotMessageService {

  @Inject()
  private _automationService: AutomationService

  public async manageMessageEvent(events: TextEventMessage[]) {

    await Promise.all(events.map(async (event) => {
      if (event.type === "message" && event.message.type === "text") {
        await this.manageMessageType(event)
      } else {
        Promise.resolve()
      }
    }))

  }

  public async manageMessageType(event: TextEventMessage) {
    const { message } = event
    console.log("--------- incoming event ---------")
    console.log(event)
    if (message.text === WorkinStatus.In) {
        const urlScraped = await this._automationService.automateMeanGoogleForm(WorkinStatus.In)
        console.log("getting url ---->", urlScraped)
    } else {
      throw new Error("No text message to be matched.")
    }
  }

}