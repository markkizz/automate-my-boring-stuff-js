import { JibbleIdentityApi } from "./JibbleIdentityApi";
import { JibbleTimeTrackerApi } from "./JibbleTimeTrackerApi";
import { IJibbleCredential, JibbleApi, JibbleClientOptions } from "./types";

export class JibbleClientService {
  public _clientOptions: JibbleClientOptions = {};

  private _credential: IJibbleCredential = {
    personId: "",
    organizationId: "",
    accessToken: "",
    personAccessToken: "",
    refreshToken: ""
  };

  public api: JibbleApi = {};

  // use BaseClass to initialize property before contructor
  constructor(clientOptions: JibbleClientOptions) {
    this._clientOptions = clientOptions;
    this._credential = {
      personId: clientOptions.personId,
      organizationId: clientOptions.organizationId,
      accessToken: clientOptions.accessToken,
      personAccessToken: clientOptions.personAccessToken,
      refreshToken: clientOptions.refreshToken
    };
    this.api = {
      identity: new JibbleIdentityApi(this._clientOptions, this),
      timetracker: new JibbleTimeTrackerApi(
        {
          ...this._clientOptions,
          headers: {
            ...this._clientOptions.headers,
            ...(this._credential.personAccessToken && { Authorization: `Bearer ${this._credential.personAccessToken}` })
          }
        },
        this
      )
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