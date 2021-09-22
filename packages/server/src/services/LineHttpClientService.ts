import { Client } from "@line/bot-sdk";

export const LineClient = "LINE_CLIENT";

export type LineClientService = Client;

export const lineClient = new Client({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
});