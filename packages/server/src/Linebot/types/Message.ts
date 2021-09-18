import { MessageEvent } from "@line/bot-sdk"

export interface WebhookMessageEvent {
  destination: string
  events: MessageEvent[]
}