import { JibbleClientService } from "@/services/Jibble/JibbleClient";
import { IJibbleCredential, JibbleClientOptions } from "@/services/Jibble/types";
import { Inject, Injectable, Scope } from "@nestjs/common";
// import _isEmpty from "lodash/isEmpty";
import { REQUEST } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable({
  scope: Scope.REQUEST
})
export class TimeTrackerFactory {

  public _clientOptions: JibbleClientOptions = {
    endpoints: {
      identity: process.env.JIBBLE_IDENTITY_URL,
      timetracker: process.env.JIBBLE_TIMETRACKER_URL
    }
  };

  @Inject(REQUEST)
  private _request: Request;

  @Inject()
  private _jwtService: JwtService;

  public init() {
    const data = this._request.headers.authorization && this._jwtService.decode(
      this._request.headers.authorization
    ) as IJibbleCredential;
    if (data) {
      this._clientOptions = {
        personId: data.personId,
        organizationId: data.organizationId,
        accessToken: data.accessToken,
        personAccessToken: data.personAccessToken,
        refreshToken: data.refreshToken
      };
    }
  }

  public getClient() {
    return JibbleClientService.create(this._clientOptions);
  }

}