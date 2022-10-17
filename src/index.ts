import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export interface AxiosPoolConfig {
  sendAll?: boolean,
  timeout?: number
}

export function createAxiosPool (
  initialOptions?: AxiosPoolConfig,
  ...configs: Array<AxiosInstance | string>
): AxiosInstance {
  const pool = new AxiosPool(initialOptions, ...configs)
  const target = {
    get: (target, name: keyof AxiosPool) => async function (url: string, data, options: AxiosRequestConfig) {
      if (pool[name]) {
        return pool[name](url, data, options)
      }
    }
  }
  return new Proxy({}, target)
}

export class AxiosPool {
  private readonly options: AxiosPoolConfig
  private currentIndex = 0

  private readonly pool: AxiosInstance[]

  constructor (options?: AxiosPoolConfig, ...configs: Array<AxiosInstance | string>) {
    const instances = []
    configs.forEach((config) => {
      if (typeof config === 'string') {
        instances.push(axios.create({ baseURL: config }))
      } else {
        instances.push(config)
      }
    })
    this.options = {
      sendAll: options?.sendAll || true,
      timeout: options?.timeout || 0
    }
    this.pool = instances
  }

  public async get (url: string, options: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.request({
      method: 'get',
      url,
      ...options
    })
  }

  public async post (url: string, data, options: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.request({
      method: 'post',
      data,
      url,
      ...options
    })
  }

  public async delete (url: string, data, options: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.request({
      method: 'delete',
      data,
      url,
      ...options
    })
  }

  public async put (url: string, data, options: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.request({
      method: 'put',
      data,
      url,
      ...options
    })
  }

  private async request (options: AxiosRequestConfig): Promise<AxiosResponse> {
    if (this.options.sendAll) {
      const abort = new AbortController()
      const promises = []
      for (const client of this.pool) {
        promises.push(client.request({
          ...options,
          signal: abort.signal
        }))
      }

      const result = Promise.any(promises)
      result.then((response) => {
        abort.abort()
        return response
      })

      return result
    }
    const instance = this.pool[this.currentIndex]
    try {
      const result = await instance.request(options)
      this.currentIndex = 0
      return result
    } catch (error) {
      if (this.pool[this.currentIndex + 1]) {
        if (this.options.timeout > 0) {
          await new Promise((resolve) => setTimeout(resolve, this.options.timeout))
        }
        this.currentIndex += 1
        return this.request(options)
      }
      this.currentIndex = 0
      throw error
    }
  }
}

export class RpcAxiosPool {
  private readonly pool: AxiosInstance
  private id = 0

  constructor (nodes: Array<AxiosInstance | string>, options?: AxiosPoolConfig) {
    this.pool = createAxiosPool(options, ...nodes)
  }

  public async request (method: string, ...params: any): Promise<AxiosResponse> {
    this.id += 1
    return await this.pool.post('/', {
      jsonrpc: '2.0',
      id: this.id,
      method,
      params: params || []
    })
  }
}
