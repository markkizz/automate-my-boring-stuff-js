import { JibbleClientService } from "@/services/Jibble/JibbleClient";
import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { IJibbleCredential } from "@/services/Jibble/types";

@Injectable({
  scope: Scope.REQUEST
})
export class TimeTrackerHttp extends JibbleClientService {

  constructor(
    @Inject(REQUEST) _request: Request,
    _jwtService: JwtService
  ) {
    super({
      endpoints: {
        identity: process.env.JIBBLE_IDENTITY_URL,
        timetracker: process.env.JIBBLE_TIMETRACKER_URL
      }
    });
    if (_request.headers.authorization) {
      const authToken = _request.headers.authorization.split(" ")?.[1];
      const data = _jwtService.decode(authToken) as IJibbleCredential;
      this.personId = data.personId;
      this.organizationId = data.organizationId;
      this.accessToken = data.accessToken;
      this.personAccessToken = data.personAccessToken;
      this.refreshToken = data.refreshToken;
    }
  }

}