import { HttpClient } from "./HttpClient";
import { BaseClientOptions } from "./types";

export class BaseClientService<T extends BaseClientOptions = BaseClientOptions> {
  constructor(
    public readonly clientOptions: T,
    public readonly rootClient?: HttpClient
  ) {

  }
}