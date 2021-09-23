import { BaseClientService } from "@automation/httpclient";
import { JibbleClientService } from "./JibbleClient";
import { JibbleClientOptions } from "./types";

export class BaseJibbleApi extends BaseClientService<JibbleClientOptions, JibbleClientService> {
  public getAuthorizationHeader(token: string) {
    return {
      Authorization: `Bearer ${token}`
    };
  }
}
