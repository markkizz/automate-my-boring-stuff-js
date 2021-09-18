// import { Express } from "express"
import { AbstractHttpAdapter, NestFactory } from "@nestjs/core"
import { NestExpressApplication } from "@nestjs/platform-express"
import { NestApplicationOptions } from "@nestjs/common"

/* eslint-disable @typescript-eslint/ban-types */
export abstract class BaseApplication {
  private _middlewares: Function[] = []
  private _serverAdapter: AbstractHttpAdapter
  private _server: NestExpressApplication
  private _entryModule: unknown
  private _serverOptions?: NestApplicationOptions

  constructor(appModule: unknown, options?: NestApplicationOptions) {
    this._entryModule = appModule
    this._serverOptions = options
  }

  public installAdapter<T extends AbstractHttpAdapter>(httpAdapter: T) {
    this._serverAdapter = httpAdapter
  }

  public useMiddleware<T extends Function>(middleware: T) {
    this._middlewares.push(middleware)
  }

  public async start(port?: string | number): Promise<void> {
    try {
      let args: unknown[]
      if (this._serverAdapter) {
        args = [this._entryModule, this._serverAdapter, this._serverOptions]
      } else {
        args = [this._entryModule, this._serverOptions]
      }
      // eslint-disable-next-line prefer-spread
      this._server = await NestFactory.create.apply(NestFactory, args)

      this._middlewares.length !== 0 && this._server.use(...this._middlewares)

      await this._server.init()
      this._server.listen(port)
      console.log(`Server started on port ${port}`)
    } catch (error) {
      console.log("[error] Server broken")
      console.log(error)
    }
  }
}