import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import dayjs from "dayjs"

export interface ILoggerOptions {
  prefix?: string
}

export function generateInterceptorRequestLogger(
  onRequestConfig?: (conf: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>,
) {
  return (config: AxiosRequestConfig) => {
    const now = dayjs(new Date()).valueOf();
    (config as any).meta.requestStart = now;
    return onRequestConfig ? onRequestConfig(config) : config;
  }
}

export function generateInterceptorResponseLogger(
  onFulfilled?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>,
  options?: ILoggerOptions
) {

  return (axiosResponse: AxiosResponse) => {
    const now = dayjs(new Date());
    const then = (axiosResponse.config as any)?.meta?.requestStart as number || 0;
    const responseTime = (then !== 0 ? now.valueOf() : then) - then;
    const text = `[info] ${options?.prefix || "AxiosRequest"}@${now.format("YYYY-MM-DD hh:mm:ss")}(${responseTime}ms)  ` +
      `${(axiosResponse.config?.method)?.toUpperCase()} ${(axiosResponse.config?.url.startsWith("http") ? "" : axiosResponse.config?.baseURL) + axiosResponse.config.url} - ` +
      `${axiosResponse.status}: ${axiosResponse.statusText}`;
    console.log(text);
    return onFulfilled ? onFulfilled(axiosResponse) : axiosResponse;
  }
}

export function generateInterceptorErrorLogger(
  onReject?: (err: AxiosError) => any,
  options?: ILoggerOptions
) {
  return (axiosError: AxiosError) => {
    const now = dayjs(new Date());
    const then = (axiosError.response?.config as any)?.meta?.requestStart as number || 0;
    const responseTime = (then !== 0 ? now.valueOf() : then) - then;
    const { config, response } = axiosError;
    const status = response?.status;
    const statusText = response?.statusText;
    const data = response?.data;
    const text = `[error] ${options?.prefix || "AxiosRequest"}@${now.format("YYYY-MM-DD hh:mm:ss")}(${responseTime}ms)  ` +
      `${(response?.request?.method || response?.config?.method || "").toUpperCase()} ${response?.config?.baseURL + (response?.config?.url || config?.url)} -` +
      `${status || 500}` +
      `${response ? (data?.error || statusText) : axiosError.message}`;
    console.log(text);
    return onReject ? onReject(axiosError) : Promise.reject(axiosError);
  }
}