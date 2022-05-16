import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export interface AxiosPoolConfig {
  sendAll: boolean
}

export function createAxiosPool (links: string[], initialOptions?: AxiosPoolConfig): AxiosInstance {
  const pool = new AxiosPool(links, initialOptions)
  const target = {
    get: (target: any, name: keyof AxiosPool) => {
      return async function (url: string, data: any, options: any) {
        return pool[name](url, data, options)
      }
    }
  }
  return new Proxy({}, target)
}

export class AxiosPool {
  private readonly links: string[]
  private readonly options: AxiosPoolConfig
  private currentIndex = 0

  private readonly pool: AxiosInstance[]

  constructor (links: string[], options?: AxiosPoolConfig) {
    this.options = options || {
      sendAll: false
    }
    this.links = links
    this.pool = this.links.map((baseURL) => {
      return axios.create({ baseURL })
    })
  }

  async get (url: string, options: any): Promise<any> {
    return this.request({
      method: 'get',
      url,
      ...options
    })
  }

  async post (url: string, data: any, options: any): Promise<any> {
    return this.request({
      method: 'post',
      data,
      url,
      ...options
    })
  }

  private async request (options: AxiosRequestConfig): Promise<any> {
    if (this.options.sendAll) {
      const promises = []
      for (const client of this.pool) {
        promises.push(client.request(options))
      }
      return Promise.race(promises)
    }
    const instance = this.pool[this.currentIndex]
    try {
      return await instance.request(options)
    } catch (error) {
      if (this.pool[this.currentIndex + 1]) {
        this.currentIndex += 1
        return this.request(options)
      }
      this.currentIndex = 0
      throw error
    }
  }
}
