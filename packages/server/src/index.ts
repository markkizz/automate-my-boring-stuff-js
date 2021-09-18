import "reflect-metadata"
import dotenv from "dotenv"
// import automation, { WorkinStatus } from "@markkizz/browser-automation";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter, NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./Application/App.module";
import express, { Express } from "express";

dotenv.config()

const server = express();

const createNestServer = async (expressInstance: Express) => {
  try {
    const app = await NestFactory.create<NestExpressApplication>(
      AppModule,
      new ExpressAdapter(expressInstance)
    );
    await app.init()
    const port = process.env.PORT || 3000
    app.listen(port)
    console.log(`Server started on port ${port}`)
  } catch (error) {
    console.log("[error] Server broken")
    console.log(error)
  }
}

createNestServer(server)
