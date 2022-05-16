// import { ENV } from "configs/common";

import { uuid } from './random/uuid'
import { toArray } from './data/to-array'

interface LoggerConstructorParams {
  name: string[] | string
  isUuid?: boolean
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function InjectLogger (ctr: any) {
  ctr.prototype.logger = new Logger({ name: ctr.prototype.constructor.name })
}

export class Logger {
  protected readonly prefixes: string[] = []
  private uuid: string = null

  constructor (params?: LoggerConstructorParams) {
    if (params.isUuid) {
      this.uuid = uuid(5)
    }
    if (params?.name) {
      this.prefixes.push(...toArray(params?.name))
    }
  }

  private message (type: keyof Console, ...args: any[]): void {
    if (process.env.NODE_ENV === 'test') return

    const fn: any = console[type]
    if (this.uuid) args.unshift(`[${this.uuid}]`)

    if (this.prefixes.length) {
      [...this.prefixes].reverse().forEach(prefix => {
        args.unshift(`[${prefix}]`)
      })
    }

    fn(...args)
  }

  public fork (params?: LoggerConstructorParams) {
    const name = [...this.prefixes].concat(...toArray(params.name))
    return new Logger({ ...params, name })
  }

  public resetId (): void {
    this.uuid = uuid(5)
  }

  public log (...args: any[]): void {
    this.message('log', ...args)
  }

  public warn (...args: any[]): void {
    this.message('warn', ...args)
  }

  public error (...args: any[]): void {
    this.message('error', ...args)
  }

  public info (...args: any[]): void {
    this.message('info', ...args)
  }
}

const test1 = new Logger({ name: 'push1' })
test1.log(123)

const test2 = test1.fork({ name: 'push2' })

test2.log(123)
test2.log(123)
