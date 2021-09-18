import { Injectable, Scope } from "@nestjs/common";
import automation, { WorkinStatus } from "@automation/browser-automation";

@Injectable({
  scope: Scope.REQUEST
})
export class AutomationService {

  public async automateMeanGoogleForm() {
    const urlScraped = await automation.meanGoogleFormAutomation(WorkinStatus.In, { args: ["--no-sandbox", "--disable-setuid-sandbox"] })
    console.log("------ AutomationService -----")
    console.log(urlScraped)
    return urlScraped
  }

}