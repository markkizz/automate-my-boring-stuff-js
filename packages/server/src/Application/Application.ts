import { BaseApplication } from "./BaseApplication";
import { Express } from "express"
import { ExpressAdapter } from "@nestjs/platform-express";

import { AppModule } from "./App.module"

export class Application extends BaseApplication {
  constructor(expressInstance: Express) {
    super(AppModule, {
      bodyParser: false
    })

    this.installAdapter(new ExpressAdapter(expressInstance))

  }


}