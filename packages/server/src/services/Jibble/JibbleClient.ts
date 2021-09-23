import { BaseClientService } from "@automation/httpclient";
import { JibbleIdentityApi } from "./JibbleIdentityApi";
import { JibbleTimeTrackerApi } from "./JibbleTimeTrackerApi";
import { IJibbleCredential, JibbleClientOptions } from "./types";

export class JibbleClientService extends BaseClientService<JibbleClientOptions, JibbleClientService> {
  private _credential: IJibbleCredential = {
    personId: "",
    organizationId: "",
    accessToken: "",
    personAccessToken: "",
    refreshToken: ""
  };

  private _jibbleClientMode: "user" | "person" = "user";

  constructor(clientOptions: JibbleClientOptions) {
    super(clientOptions);
    this._credential = {
      personId: clientOptions.personId,
      organizationId: clientOptions.organizationId,
      accessToken: clientOptions.accessToken,
      personAccessToken: clientOptions.personAccessToken,
      refreshToken: clientOptions.refreshToken
    };
    this._setAuthorizationHeader();
  }

  get mode() {
    return this._jibbleClientMode;
  }

  set mode(value) {
    this._jibbleClientMode = value;
    this._setAuthorizationHeader();
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
    this._setAuthorizationHeader();
  }

  get personAccessToken() {
    return this._credential.personAccessToken;
  }

  set personAccessToken(value) {
    this._credential.personAccessToken = value;
    this._setAuthorizationHeader();
  }

  get refreshToken() {
    return this._credential.refreshToken;
  }

  set refreshToken(value) {
    this._credential.refreshToken = value;
  }

  public readonly identity: JibbleIdentityApi = new JibbleIdentityApi(this);
  public readonly timetracker: JibbleTimeTrackerApi = new JibbleTimeTrackerApi(this);

  public static create(
    clientOptions: JibbleClientOptions
  ) {
    return new JibbleClientService(clientOptions);
  }

  private _getAuthorizationHeader(token?: string) {
    return token ? {
      authorization: `Bearer ${token}`
    } : {};
  }

  private _setAuthorizationHeader() {
    this.httpClient._http.defaults.headers = {
      ...this.httpClient._http.defaults.headers,
      ...this._getAuthorizationHeader(
        this._jibbleClientMode === "user"
          ? this._credential.accessToken
          : this._credential.personAccessToken
      )
    };
  }

}