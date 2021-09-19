import { AutomationService } from "@/services/AutomationService";
import { LineClient, LineClientService } from "@/services/LineHttpClientService";
import { WorkinStatus } from "@automation/browser-automation";
import { Inject, Injectable, Scope } from "@nestjs/common";

import { TextEventMessage } from "./types/Message"

@Injectable({
  scope: Scope.REQUEST
})
export class LinebotMessageService {

  @Inject(LineClient)
  private _lineClient: LineClientService

  @Inject()
  private _automationService: AutomationService

  public async manageMessageEvent(events: TextEventMessage[]) {

    await Promise.all(events.map(async (event) => {
      if (event.type === "message" && event.message.type === "text") {
        await this.manageMessageTextType(event)
      } else {
        try {
          await this._lineClient.replyMessage(event.replyToken, {
            type: "text",
            text: "ตอนนี้คุณหมูยังไม่มีฟังก์ชั่นอื่นนอกเหนือจากในเมนูนะครับป๋ม $",
            emojis: [{
              index: 60,
              productId: "5ac1bfd5040ab15980c9b435",
              emojiId: "024"
            }]
          })
        } catch (error) {
          console.log("[error] reply default message:", error)
          throw error
        }
        Promise.resolve()
      }
    }))

  }

  public async manageMessageTextType(event: TextEventMessage) {
    const { message } = event
    console.log("--------- incoming event ---------")
    console.log(event)
    if (message.text === WorkinStatus.In || message.text === WorkinStatus.Out) {
      await this.automateClockInClockOut(event, message.text)
    } else {
      throw new Error("No text message to be matched.")
    }
  }

  public async automateClockInClockOut(event: TextEventMessage, workingStatus: WorkinStatus) {
    try {
      if (!event.source.userId) {
        console.log("[error]: Cannot identify user", event)
        throw {
          status: 404,
          message: "Cannot identify user"
        }
      }
      await this._lineClient.pushMessage(event.source.userId, {
        type: "text",
        text: `แปปนะครับผม $ คุณหมูกำลัง ${event.message.text} ให้`,
        emojis: [{
          index: 12,
          productId: "5ac21e6c040ab15980c9b444",
          emojiId: "040"
        }]
      })
      const scrapedInfo = await this._automationService.automateMeanGoogleForm(workingStatus)
      await this._lineClient.replyMessage(event.replyToken, {
        type: "text",
        text: `${workingStatus} เสร็จแล้ววว \n- url: ${scrapedInfo.url} \n- temperature: ${scrapedInfo.temperature}`
      })

    } catch (error) {
      console.log("[error] automateClockInClockOut", error)
      throw {
        status: 500,
        message: "Internal server error"
      }
    }
  }

}