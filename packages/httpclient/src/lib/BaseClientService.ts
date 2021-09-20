import { HttpClient } from "./HttpClient";
import { BaseClientOptions } from "./types";

export class BaseClientService<T extends BaseClientOptions = BaseClientOptions> {
  private _httpClient: HttpClient

  get httpClient(): HttpClient {
    return this._httpClient
  }

  constructor(
    public readonly clientOptions: T,
    public readonly rootClient?: HttpClient
  ) {
    this._httpClient = HttpClient.create(clientOptions)
  }
}