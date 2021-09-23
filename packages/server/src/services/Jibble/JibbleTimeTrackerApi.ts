import { JibbleClientService } from "./JibbleClient";
import _cloneDeep from "lodash/cloneDeep";
import { v4 as UUIDV4 } from "uuid";
import { ClockingType, JibbleClientOptions } from "./types";
import { BaseJibbleApi } from "./BaseJibbleApi";

export class JibbleTimeTrackerApi extends BaseJibbleApi {

  public static create(clientOptions: JibbleClientOptions, apiClient: JibbleClientService) {
    const options = _cloneDeep(clientOptions);
    options.baseURL = clientOptions.endpoints.timetracker;
    return new JibbleTimeTrackerApi(options, apiClient);
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

}