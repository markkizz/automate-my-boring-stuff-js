import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TimeTrackerController } from "./TimeTracker.controller";
import { TimeTrackerHttp } from "./TimeTracker.http";
import { TimeTrackerAuthMiddleware } from "./TimeTracker.middleware";
import { TimeTrackerService } from "./TimeTracker.service";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET
    }),
  ],
  controllers: [TimeTrackerController],
  providers: [
    TimeTrackerHttp,
    TimeTrackerService
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