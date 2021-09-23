// import { JibbleClientService } from "@/services/Jibble/JibbleClient";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
// import { REQUEST } from "@nestjs/core";
// import { Request } from "express";
import { TimeTrackerController } from "./TimeTracker.controller";
import { TimeTrackerAuthMiddleware } from "./TimeTracker.middleware";
import { TimeTrackerService } from "./TimeTracker.service";
import { JwtModule } from "@nestjs/jwt";
// import { IJibbleCredential } from "@/services/Jibble/types";
import { TimeTrackerFactory } from "./TimeTracker.factory";

const TimeTrackerJWT = JwtModule.register({
  secret: process.env.SECRET,
  signOptions: {
    expiresIn: "24h"
  }
});

export const JibbleClient = "JIBBLE_CLIENT";

@Module({
  imports: [
    TimeTrackerJWT
  ],
  controllers: [TimeTrackerController],
  providers: [
    TimeTrackerService,
    TimeTrackerFactory,
    // {
    //   provide: JibbleClient,
    //   useFactory: async (request: Request, _jwtService) => new Promise((resolve, rej) => {
    //     const client = new JibbleClientService({
    //       endpoints: {
    //         identity: process.env.JIBBLE_IDENTITY_URL,
    //         timetracker: process.env.JIBBLE_TIMETRACKER_URL
    //       }
    //     });
    //     const data = request.headers.authorization && _jwtService.decode(request.headers.authorization) as IJibbleCredential;
    //     if (data) {
    //       client.personId = data.personId;
    //       client.organizationId = data.organizationId;
    //       client.accessToken = data.accessToken;
    //       client.personAccessToken = data.personAccessToken;
    //       client.refreshToken = data.refreshToken;
    //     }
    //     resolve(client);
    //   }),
    //   inject: [REQUEST, JwtService]
    // }
  ]
})
export class TimeTrackerModule implements NestModule {

  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TimeTrackerAuthMiddleware)
      .exclude("/v1/timetracker/auth/(.*)")
      .forRoutes(TimeTrackerController);
  }

}