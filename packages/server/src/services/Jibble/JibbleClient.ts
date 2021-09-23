import { JibbleIdentityApi } from "./JibbleIdentityApi";
import { JibbleTimeTrackerApi } from "./JibbleTimeTrackerApi";
import { IJibbleCredential, JibbleClientOptions } from "./types";

export class JibbleClientService {
  private _clientOptions: JibbleClientOptions = {};

  private _credential: IJibbleCredential = {
    personId: "",
    organizationId: "",
    accessToken: "",
    personAccessToken: "",
    refreshToken: ""
  };

  public api = {
    identity: JibbleIdentityApi.create(this._clientOptions, this),
    timetracker: JibbleTimeTrackerApi.create(
      {
        ...this._clientOptions,
        headers: {
          ...this._clientOptions.headers,
          Authorization: `Bearer ${this._credential.personAccessToken}`
        }
      },
      this
    )
  };

  constructor(clientOptions: JibbleClientOptions) {
    this._clientOptions = clientOptions;
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

  set personId(value) {
    this._credential.personId = value;
  }

  get organizationId() {
    return this._credential.organizationId;
  }

  set organizationId(value) {
    this._credential.organizationId = value;
  }

  get accessToken() {
    return this._credential.accessToken;
  }

  set accessToken(value) {
    this._credential.accessToken = value;
  }

  get personAccessToken() {
    return this._credential.personAccessToken;
  }

  set personAccessToken(value) {
    this._credential.personAccessToken = value;
  }

  get refreshToken() {
    return this._credential.refreshToken;
  }

  set refreshToken(value) {
    this._credential.refreshToken = value;
  }


  public static create(
    clientOptions: JibbleClientOptions
  ) {
    return new JibbleClientService(clientOptions);
  }

}