import puppeteer, { BrowserConnectOptions, BrowserLaunchArgumentOptions, LaunchOptions, Product } from "puppeteer"
import _random from "lodash.random"
import { eventLog } from "@/utils"

export enum WorkinStatus {
  In = "เข้ามาทำงาน",
  Out = "เลิกงาน"
}

export type AutomationOptions = LaunchOptions & BrowserLaunchArgumentOptions & BrowserConnectOptions & {
  product?: Product
  extraPrefsFirefox?: Record<string, unknown>
  targetUrl?: string
}

export async function meanGoogleFormAutomation(workingStatus: WorkinStatus = WorkinStatus.In, options?: AutomationOptions) {
  console.log(`------------ Begining Mean Automation @${new Date().toLocaleString()}-------------`)
  try {
    const browser = await puppeteer.launch({...options, slowMo: 250, timeout: 6000})
    const page = await browser.newPage()
    const googleForm = options.targetUrl
      ? options.targetUrl
      : "https://docs.google.com/forms/d/e/1FAIpQLSfixHCPJAibiKvt1trmklhwIOENLiaayUg8ewr1K3dO8ViW5Q/viewform?usp=sf_link"
    console.log(`----------- goto ${googleForm} ------------`)
    await page.goto(googleForm, {
      waitUntil: "networkidle2"
    })
    await page.waitForNavigation()
    await page.waitForSelector("body")

    // 1. ชื่อ-นามสกุล
    eventLog("begin", "select employee")
    const selectEmployee = await page.$(`[role="listbox"]`)
    await selectEmployee.click()
    const mean = await page.waitForSelector(`[role="option"][data-value="3M-OP-0037 น.ส.สายเพชร ดำรงวงศ์สว่าง"]`)
    eventLog("query", "found mean", "ok")
    await mean.click()
    eventLog("click", "select mean", "ok")

    // 2. เข้างาน หรือ เลิกงาน
    eventLog("begin", "working status")
    const allCheckbox = await page.$$(".freebirdFormviewerComponentsQuestionRadioChoice.freebirdFormviewerComponentsQuestionRadioOptionContainer")
    eventLog("check", `working status is ${workingStatus}`)
    const statusIndex = workingStatus === WorkinStatus.In ? 0 : 1
    const checkbox = allCheckbox[statusIndex]
    await checkbox.click()
    eventLog("click", "working status", "ok")

    let randTemperature = "0"
    if (workingStatus === WorkinStatus.In) {
      // 3. วัดอุณหภูมิ (องศาเซลเซียส)- เฉพาะตอนเข้างานเท่านั้น
      eventLog("begin", "typing temperature")
      randTemperature = _random(35, 36.5, true).toFixed(1)
      const temperatureInput = await page.$("input[type=text]")
      // const randTemperature = randomBetweenNumber(36, 35)
      eventLog("random", `temperature is ${randTemperature}`, "ok")
      await temperatureInput.type(randTemperature)
      eventLog("type", "typing temperature", "ok")
    }

    // 4. สังเกตุอาการตนเองเบื้องต้น
    eventLog("begin", "sysptom status")
    await allCheckbox[allCheckbox.length - 1].click()
    eventLog("click", "sysptom status", "ok")

    eventLog("begin", "submit form")
    const buttonSubmit = await page.$(".freebirdFormviewerViewNavigationLeftButtons > [role=button]")
    await buttonSubmit.click()
    eventLog("click", "submit form", "ok")

    await page.waitForNavigation()
    eventLog("change page", "navigate to the next page", "ok")

    // Click to check location
    eventLog("begin", "get google script url")
    await page.waitForSelector(".freebirdFormviewerViewResponseConfirmationMessage > a")
    const urlEl = await page.$(".freebirdFormviewerViewResponseConfirmationMessage > a")
    const googlescriptUrl = await page.evaluate((el: Element) => el.innerHTML, urlEl)
    eventLog("Final !", `URL is ${googlescriptUrl}`, "ok")
    console.log("------------ Finish ------------")

    await page.close()
    await browser.close()
    return {
      url: googlescriptUrl,
      temperature: randTemperature
    }
  } catch (error) {
    console.log(error)
    // page.screenshot({
    //   path: "./error-screenshot.png",
    //   fullPage: true
    // })
    throw {
      message: "Something went wrong with automation."
    }
  }
}