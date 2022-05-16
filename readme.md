# Axios-pool

**Install**

```shell
npm install @coxy/axios-pool
```

**Create pool**

```javascript
import { createAxiosPool } from '@coxy/axios-pool';
```

... or using CommonJS syntax:

```javascript
const { createAxiosPool } = require('@coxy/axios-pool');
```

**Params**

| value        | type                    | default value |
|--------------|-------------------------|---------------|
| sendAll      | boolean                 | true          |
| timeout      | number                  | 0             |
| ...instances | AxiosInstance or string |               |

```javascript
const instance = axios.create({ baseUrl: 'https://yahoo.com' })
const pool = createAxiosPool({sendAll: false}, 'https://google.com', instance);

const { data } = await pool.get('/')

console.log(data)

```
