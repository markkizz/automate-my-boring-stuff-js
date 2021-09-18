import dotenv from "dotenv"

import { meanGoogleFormAutomation } from "./pages/meanGoogleForm"

dotenv.config();

export { WorkinStatus, AutomationOptions } from "./pages/meanGoogleForm"

export default {
  meanGoogleFormAutomation
}

