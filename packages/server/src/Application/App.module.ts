import { Module } from "@nestjs/common";

import { LinebotModule } from "@/Linebot/Linebot.module"
import { HealthCheckController } from "@/HealthCheck/HealthCheck.controller"
import { AutomationService } from "@/services/AutomationService";

@Module({
  imports: [LinebotModule],
  controllers: [HealthCheckController],
  providers: [AutomationService]
})
export class AppModule {}
