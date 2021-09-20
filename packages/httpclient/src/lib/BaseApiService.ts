import { BaseClientService } from "./BaseClientService";

export class BaseApiService<T extends BaseClientService> {
  constructor(
    protected apiClient: T
  ) {

  }
}