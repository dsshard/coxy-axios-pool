import { AxiosInstance } from 'axios'

import { AxiosPoolConfig, createAxiosPool } from './pool-api-axios'

export class RpcPool {
  private readonly pool: AxiosInstance
  private id = 0

  constructor (nodes: string[], options?: AxiosPoolConfig) {
    this.pool = createAxiosPool(nodes, options)
  }

  public async request (method: string, ...params: any): Promise<any> {
    this.id += 1
    return await this.pool.post('/', {
      jsonrpc: '2.0',
      id: this.id,
      method,
      params: params || []
    }, {
      timeout: 2000
    }).then(({ data }) => {
      if (data.error) {
        throw new Error(data.error.message)
      }
      return data.result
    })
  }
}
