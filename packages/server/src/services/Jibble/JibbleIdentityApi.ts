import { stringify } from "query-string";
import FormData from "form-data";
// import { BaseClientService } from "@automation/httpclient";
import { JibbleClientService } from "./JibbleClient";
import { IOrganizationIdResponse, IPersonAccessTokenResponse, IPersonIdResponse, IUserAccessTokenResponse, JibbleClientOptions } from "./types";
import _cloneDeep from "lodash/cloneDeep";
import { BaseJibbleApi } from "./BaseJibbleApi";

export class JibbleIdentityApi extends BaseJibbleApi {

  public static create(clientOptions: JibbleClientOptions, apiClient: JibbleClientService) {
    const options = _cloneDeep(clientOptions);
    options.baseURL = clientOptions.endpoints.identity;
    return new JibbleIdentityApi(options, apiClient);
  }

  public async getUserAccessToken(username: string, password: string) {
    const data = stringify({
      client_id: "ro.client",
      grant_type: "password",
      username,
      password
    }, {
      skipEmptyString: true,
      skipNull: true
    });
    const response = await this.httpClient.post<
      string,
      IUserAccessTokenResponse
    >("/connect/token", data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    return response.data;
  }

  public async getOrganizationId() {
    const response = await this.httpClient.get<IOrganizationIdResponse>(
      "/v1/Organizations",
      {
        headers: {
          ...this.getAuthorizationHeader(
            this.rootClient.accessToken
          )
        }
      }
    );
    return response.data;
  }

  public async getPersonId() {
    const response = await this.httpClient.get<
      IPersonIdResponse
    >(
      `/v1/People?$filter=organizationId eq+${this.rootClient.organizationId}`,
      {
        headers: {
          ...this.getAuthorizationHeader(
            this.rootClient.accessToken
          )
        }
      }
    );
    return response.data;
  }

  public async getPersonAccessToken(username: string, password: string) {
    const data = new FormData();
    data.append("client_id", "ro.client");
    data.append("grant_type", "password");
    data.append("refresh_token", this.clientOptions.refreshToken);
    data.append("acr_values", `prsid:${this.rootClient.personId}`);
    data.append("username", username);
    data.append("password", password);

    const response = await this.httpClient.post<
      FormData,
      IPersonAccessTokenResponse
    >("/connect/token", data, {
      headers: {
        ...data.getHeaders(),
        ...this.getAuthorizationHeader(
          this.rootClient.personAccessToken
        )
      }
    });
    return response.data;
  }
}