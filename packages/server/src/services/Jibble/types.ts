import { BaseClientOptions } from "@automation/httpclient";
import { JibbleIdentityApi } from "./JibbleIdentityApi";
import { JibbleTimeTrackerApi } from "./JibbleTimeTrackerApi";

export interface JibbleApi {
  identity?: JibbleIdentityApi;
  timetracker?: JibbleTimeTrackerApi;
}

export interface IJibbleCredential {
  personId?: string;
  organizationId?: string;
  accessToken?: string;
  personAccessToken?: string;
  refreshToken?: string;
}

export interface JibbleClientOptions extends BaseClientOptions {
  endpoints?: {
    identity?: string;
    timetracker?: string;
  };
  personId?: string;
  organizationId?: string;
  accessToken?: string;
  personAccessToken?: string;
  refreshToken?: string;
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

export enum ClockingType {
  IN = "In",
  OUT = "Out"
}

export interface ILatestTimeEntry {
  "@odata.context": string;
  belongsToDate: Date;
  localTime: Date;
  personId: string;
  organizationId: string;
  projectId: null;
  activityId: null;
  locationId: null;
  kioskId: null;
  breakId: null;
  clientType: string;
  type: ClockingType;
  time: Date;
  offset: string;
  autoClockOutTime: null;
  clockInOutReminderTime: null;
  isOffline: boolean;
  isFaceRecognized: null;
  faceSimilarity: null;
  isAutomatic: boolean;
  isManual: boolean;
  isUnusual: boolean;
  isEndOfDay: boolean;
  note: null;
  status: string; // "Active"
  createdAt: Date;
  updatedAt: Date;
  isLocked: boolean;
  id: string;
  coordinates: null;
  picture: null;
  platform: {
    clientVersion: null;
    os: null;
    deviceModel: null;
    deviceName: null;
  };
  activity: null;
  project: null;
}