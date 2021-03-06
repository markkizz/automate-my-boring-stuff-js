import { ClockingType, IJibbleCredential } from "@/services/Jibble/types";
import { ForbiddenException, HttpException, Inject, Injectable, InternalServerErrorException, NotAcceptableException, Scope, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TimeTrackerFactory } from "./TimeTracker.factory";

@Injectable({
  scope: Scope.REQUEST
})
export class TimeTrackerService {

  @Inject()
  private _timeTrackerfactory: TimeTrackerFactory;

  @Inject()
  private _jwtService: JwtService;

  public async login(username: string, password: string) {
    try {
      const jibbleClient = this._timeTrackerfactory.getClient();
      const jibbleUserAuth = await jibbleClient.api.identity.getUserAccessToken(username, password);
      jibbleClient.accessToken = jibbleUserAuth.access_token;
      jibbleClient.refreshToken = jibbleUserAuth.refresh_token;
      const orgIdAuth = await jibbleClient.api.identity.getOrganizationId();
      const orgId = orgIdAuth.value?.[0]?.id;
      jibbleClient.organizationId = orgId;
      const personIdAuth = await jibbleClient.api.identity.getPersonId();
      jibbleClient.personId = personIdAuth.value?.[0]?.id;
      const personAuth = await jibbleClient.api.identity.getPersonAccessToken(username, password);

      const payload: IJibbleCredential = {
        personId: personAuth.personId,
        organizationId: personAuth.organizationId,
        accessToken: jibbleClient.accessToken,
        personAccessToken: personAuth.access_token,
        refreshToken: jibbleClient.refreshToken
      };
      const tokenSigned = this._jwtService.sign(payload);
      return {
        accessToken: tokenSigned
      };
    } catch (error) {
      if ((error.response?.status < 200 || error.response?.status >= 400) && (error.response?.data?.error_description === "invalid_username_or_password")) {
        throw new UnauthorizedException();
      }

      if ((error.response?.status < 200 || error.response?.status >= 400) && (error.response?.data?.error_description === "locked_out")) {
        throw new ForbiddenException("Your account has been locked.");
      }
      throw error;
    }
  }

  public async clocking(type: ClockingType) {
    try {
      const jibbleClient = this._timeTrackerfactory.getClient();
      const currentStatus = await this.getLatestTimeEntry();
      if (currentStatus.clockType === type) {
        throw new NotAcceptableException(`The clock status already is ${type}`);
      }
      const clockingResponse = await jibbleClient.api.timetracker.clocking(type);
      return clockingResponse;
    } catch (error) {
      if (!(error instanceof HttpException) && error.statusCode !== 401) throw new InternalServerErrorException();
      throw error;
    }
  }

  public async getLatestTimeEntry() {
    try {
      const jibbleClient = this._timeTrackerfactory.getClient();
      const latestTimeDetail = await jibbleClient.api.timetracker.getLatestTimeEntry();
      return {
        id: latestTimeDetail.id,
        currentDate: latestTimeDetail.belongsToDate,
        clockType: latestTimeDetail.type,
        time: latestTimeDetail.time,
        status: latestTimeDetail.status,
        createdAt: latestTimeDetail.createdAt,
        updatedAt: latestTimeDetail.updatedAt
      };
    } catch (error) {
      if (!(error instanceof HttpException) && error.response?.status !== 401) throw new InternalServerErrorException();
      throw error;
    }
  }

}