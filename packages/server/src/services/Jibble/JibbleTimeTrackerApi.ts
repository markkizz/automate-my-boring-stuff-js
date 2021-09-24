import { JibbleClientService } from "./JibbleClient";
import _cloneDeep from "lodash/cloneDeep";
import { v4 as UUIDV4 } from "uuid";
import { ClockingType, ILatestTimeEntry, JibbleClientOptions } from "./types";
import { BaseClientService } from "@automation/httpclient";

export class JibbleTimeTrackerApi extends BaseClientService<JibbleClientOptions, JibbleClientService> {

  constructor(clientOptions: JibbleClientOptions, apiClient: JibbleClientService) {
    const options = _cloneDeep(clientOptions);
    options.baseURL = clientOptions.endpoints?.timetracker;
    super(options, apiClient);
  }

  public async clocking(type: ClockingType) {
    const data = {
      id: UUIDV4(),
      personId: this.rootClient.personId,
      type,
      clientType: "Web",
      platform: {}
    };
    await this.httpClient.post("/v1/TimeEntries", data);
  }

  public async clockIn() {
    await this.clocking(ClockingType.IN);
  }

  public async clockOut() {
    await this.clocking(ClockingType.OUT);
  }

  public async getLatestTimeEntry() {
    const response = await this.httpClient.get<ILatestTimeEntry>(
      `https://time-tracking.prod.jibble.io/v1/People(${this.rootClient.personId})/LatestTimeEntry`,
      {
        params: {
          "$expand": "activity,project"
        }
      }
    );
    return response.data;
  }

}