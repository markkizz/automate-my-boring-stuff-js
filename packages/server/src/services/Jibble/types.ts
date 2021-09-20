import { BaseClientOptions } from "@automation/httpclient";

export interface JibbleClientOptions extends BaseClientOptions {
  accessToken: string
}

export interface IUserAccessTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  refresh_token: string;
  scope: string;
}

export interface IOrganizationIdResponse {
  "@odata.context": string;
  value: {
    name: string;
    status: string;
    id: string;
  }[];
}

export interface IPersonIdResponse {
  "@odata.context": string;
  value: {
    userId: string;
    organizationId: string;
    title: null;
    status: string;
    id: string;
  }[];
}

export interface IPersonAccessTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  refresh_token: string;
  scope: string;
  personId: string;
  organizationId: string;
}