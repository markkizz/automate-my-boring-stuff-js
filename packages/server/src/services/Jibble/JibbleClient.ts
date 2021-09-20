import { BaseClientService } from "@automation/httpclient"
import { JibbleIdentityApi } from "./JibbleIdentityApi";
import { JibbleClientOptions } from "./types";

export class JibbleClientService extends BaseClientService<JibbleClientOptions, JibbleClientService> {
  public readonly identity: JibbleIdentityApi = new JibbleIdentityApi(this)

  public static create(
    clientOptions: JibbleClientOptions
  ) {
    return new JibbleClientService(clientOptions)
  }
}