import { Injectable, Scope } from "@nestjs/common";
import automation, { WorkinStatus } from "@automation/browser-automation";

@Injectable({
  scope: Scope.REQUEST
})
export class AutomationService {

  public async automateMeanGoogleForm(workingStatus: WorkinStatus) {
    console.log("------ AutomationService -----")
    const urlScraped = await automation.meanGoogleFormAutomation(workingStatus, { args: ["--no-sandbox", "--disable-setuid-sandbox"] })
    console.log(urlScraped)
    return urlScraped
  }

}