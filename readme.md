# @coxy/axios-pool

`@coxy/axios-pool` is a small but powerful library for managing multiple Axios instances with built-in failover, load balancing, and parallel request capabilities.

## Features

- **Failover handling**: Automatically retries requests with the next instance if the first one fails.
- **Parallel request mode**: Send requests to all instances at once and use the fastest valid response.
- **Custom response validation**: Plug in your logic to verify responses.
- **RPC support**: Send JSON-RPC 2.0 requests easily across multiple nodes.

## Installation

```bash
npm install @coxy/axios-pool
```

## Quick Start

### Basic Usage

```typescript
import { createAxiosPool } from '@coxy/axios-pool'

const pool = createAxiosPool(
  { sendAll: true },
  'https://node1.example.com',
  'https://node2.example.com'
)

const response = await pool.get('/health')
```

### Usage with Failover (sendAll: false)

```typescript
import { createAxiosPool } from '@coxy/axios-pool'

const pool = createAxiosPool(
  { sendAll: false, timeout: 1000 },
  'https://primary-node.example.com',
  'https://backup-node.example.com'
)

const response = await pool.post('/data', { key: 'value' })
```

### Validating Responses

```typescript
import { createAxiosPool } from '@coxy/axios-pool'

const pool = createAxiosPool(
  {
    sendAll: true,
    validateResponse: (data) => {
      if (!data || typeof data !== 'object' || data.status !== 'ok') {
        throw new Error('Invalid response')
      }
    },
  },
  'https://node1.example.com',
  'https://node2.example.com'
)

const response = await pool.get('/check')
```

### JSON-RPC over Axios Pool

```typescript
import { RpcAxiosPool } from '@coxy/axios-pool'

const rpcPool = new RpcAxiosPool([
  'https://rpc1.example.com',
  'https://rpc2.example.com'
])

const blockNumber = await rpcPool.request('eth_blockNumber')
```

## API

### `createAxiosPool(initialOptions?: AxiosPoolConfig, ...configs: (AxiosInstance | string)[]): AxiosInstance`
Creates a dynamic Axios proxy with failover and/or parallel strategies.

#### AxiosPoolConfig Options:
- `sendAll?: boolean` — If `true`, sends requests to all instances and returns the first valid one. Defaults to `true`.
- `timeout?: number` — Delay in milliseconds before retrying the next instance (when `sendAll: false`). Defaults to `0`.
- `validateResponse?: (data: any) => void` — Optional function to validate the returned response.

### `RpcAxiosPool`
Wrapper for sending JSON-RPC 2.0 requests using an Axios pool.

#### Constructor:
```typescript
new RpcAxiosPool(nodes: (AxiosInstance | string)[], options?: AxiosPoolConfig)
```

#### Methods:
- `request(method: string, ...params: any[]): Promise<AxiosResponse>` — Sends a JSON-RPC 2.0 request.

## License

MIT

---

> Fun fact: Axios itself is named after the Greek word "ἄξιος" (áxios), meaning "worthy" — reflecting its goal to be a worthy HTTP client!

