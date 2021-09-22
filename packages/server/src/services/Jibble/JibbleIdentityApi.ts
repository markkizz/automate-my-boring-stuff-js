import { stringify } from "query-string";
import FormData from "form-data";
import { BaseApiService } from "@automation/httpclient";
import { JibbleClientService } from "./JibbleClient";
import { IOrganizationIdResponse, IPersonAccessTokenResponse, IPersonIdResponse, IUserAccessTokenResponse } from "./types";
import _cloneDeep from "lodash/cloneDeep";

export class JibbleIdentityApi extends BaseApiService<JibbleClientService> {

  constructor(apiClient: JibbleClientService) {
    const client = _cloneDeep(apiClient);
    client.clientOptions.baseURL = apiClient.clientOptions.endpoints.identity;
    super(client);
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
    const response = await this.apiClient.httpClient.post<
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
    const response = await this.apiClient.httpClient.get<IOrganizationIdResponse>("/v1/Organizations");
    return response.data;
  }

  public async getPersonId() {
    const response = await this.apiClient.httpClient.get<
      IPersonIdResponse
    >(`/v1/People?$filter=organizationId eq+${this.apiClient.organizationId}`);
    return response.data;
  }

  public async getPersonAccessToken(
    personData: {
      username: string;
      password: string;
      // personId: string
      // refreshToken: string
    }
  ) {
    const data = new FormData();
    data.append("client_id", "ro.client");
    data.append("grant_type", "password");
    // data.append("refresh_token", personData.refreshToken);
    data.append("refresh_token", this.apiClient.clientOptions.refreshToken);
    // data.append("acr_values", `prsid:${personData.personId}`);
    data.append("acr_values", `prsid:${this.apiClient.personId}`);
    data.append("username", personData.username);
    data.append("password", personData.password);

    const response = await this.apiClient.httpClient.post<
      FormData,
      IPersonAccessTokenResponse
    >("/connect/token", data, {
      headers: {
        ...data.getHeaders()
      }
    });
    return response.data;
  }
}