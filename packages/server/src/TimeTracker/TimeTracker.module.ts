import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TimeTrackerController } from "./TimeTracker.controller";
import { TimeTrackerAuthMiddleware } from "./TimeTracker.middleware";
import { TimeTrackerService } from "./TimeTracker.service";
import { JwtModule } from "@nestjs/jwt";
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