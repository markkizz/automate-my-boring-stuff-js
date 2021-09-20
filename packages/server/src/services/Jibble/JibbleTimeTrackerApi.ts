import { BaseApiService } from "@automation/httpclient"
import { JibbleClientService } from "./JibbleClient"
import _cloneDeep from "lodash/cloneDeep"
import { v4 as UUIDV4 } from "uuid"
import { ClockingType } from "./types"

export class JibbleTimeTrackerApi extends BaseApiService<JibbleClientService> {

  constructor(apiClient: JibbleClientService) {
    const client = _cloneDeep(apiClient)
    client.clientOptions.baseURL = apiClient.clientOptions.endpoints.timetracker
    super(client)
  }

  public async clocking(type: ClockingType) {
    const data = {
      id: UUIDV4(),
      personId: this.apiClient,
      type,
      clientType: "Web",
      platform: {}
    }
    await this.apiClient.httpClient.post("/v1/TimeEntries", data)
  }

  public async clockIn() {
    await this.clocking(ClockingType.IN)
  }

  public async clockOut() {
    await this.clocking(ClockingType.OUT)
  }

}