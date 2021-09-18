import dotenv from "dotenv"
import { middleware } from "@line/bot-sdk";

dotenv.config()

export const linebotMiddleware = middleware({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
})