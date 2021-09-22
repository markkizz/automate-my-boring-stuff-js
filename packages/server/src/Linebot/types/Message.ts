import { EventMessage, ReplyableEvent, TextEventMessage as SDKTextEventMessage } from "@line/bot-sdk";

export interface WebhookMessageEvent {
  destination: string;
  events: TextEventMessage[];
}

export type MessageEvent<T extends EventMessage = EventMessage> = {
  type: "message";
  message: T;
} & ReplyableEvent;

export type TextEventMessage = MessageEvent<SDKTextEventMessage>;