import { BaseApplication } from "./BaseApplication";
import { Express } from "express";
import { ExpressAdapter } from "@nestjs/platform-express";

import { AppModule } from "./App.module";
import { HttpExceptionFilter } from "./ExceptionHandler";

export class Application extends BaseApplication {
  constructor(expressInstance: Express) {
    super(AppModule, {
      bodyParser: false,
      cors: {
        origin: "*",
        allowedHeaders: [
          "X-Line-Signature",
          "x-line-signature",
          "authorization",
        ]
      }
    });

    this.installAdapter(new ExpressAdapter(expressInstance));

    this.useFilter(HttpExceptionFilter);

  }

}