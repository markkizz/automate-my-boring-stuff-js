import { ClockingType } from "@/services/Jibble/types";
import { IsEmail, IsIn, IsString } from "class-validator";

export class LoginRequest {
  @IsString()
  @IsEmail()
  public username: string;

  @IsString()
  public password: string;
}

export class ClockingRequest {
  @IsString()
  @IsIn(["In", "Out"])
  public type: ClockingType;
}