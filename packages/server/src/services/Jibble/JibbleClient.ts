import { BaseClientService } from "@automation/httpclient";
import { JibbleIdentityApi } from "./JibbleIdentityApi";
import { JibbleTimeTrackerApi } from "./JibbleTimeTrackerApi";
import { IJibbleCredential, JibbleClientOptions } from "./types";

export class JibbleClientService extends BaseClientService<JibbleClientOptions, JibbleClientService> {
  private readonly _credential: IJibbleCredential = {
    personId: "",
    organizationId: "",
    accessToken: "",
    personAccessToken: "",
    refreshToken: ""
  };

  constructor(clientOptions: JibbleClientOptions) {
    super(clientOptions);
    this._credential = {
      personId: clientOptions.personId,
      organizationId: clientOptions.organizationId,
      accessToken: clientOptions.accessToken,
      personAccessToken: clientOptions.personAccessToken,
      refreshToken: clientOptions.refreshToken
    };
  }

  get personId() {
    return this._credential.personId;
  }

  get organizationId() {
    return this._credential.organizationId;
  }

  get accessToken() {
    return this._credential.accessToken;
  }

  get personAccessToken() {
    return this._credential.personAccessToken;
  }

  get refreshToken() {
    return this._credential.refreshToken;
  }

  public readonly identity: JibbleIdentityApi = new JibbleIdentityApi(this);
  public readonly timetracker: JibbleTimeTrackerApi = new JibbleTimeTrackerApi(this);

  public static create(
    clientOptions: JibbleClientOptions
  ) {
    return new JibbleClientService(clientOptions);
  }
}