import { Injectable, Scope } from "@nestjs/common";
import automation, { WorkinStatus } from "@automation/browser-automation";

@Injectable({
  scope: Scope.REQUEST
})
export class AutomationService {

  public async automateMeanGoogleForm(workingStatus: WorkinStatus) {
    const scraped = await automation.meanGoogleFormAutomation(workingStatus, {
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      targetUrl: process.env.MEAN_GOOGLE_FORM_URL
    });
    return scraped;
  }

}