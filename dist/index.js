"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RpcAxiosPool = exports.AxiosPool = exports.createAxiosPool = void 0;
const axios_1 = __importDefault(require("axios"));
function createAxiosPool(initialOptions, ...configs) {
    const pool = new AxiosPool(initialOptions, ...configs);
    const target = {
        get: (target, name) => async function (url, data, options) {
            return pool[name](url, data, options);
        }
    };
    return new Proxy({}, target);
}
exports.createAxiosPool = createAxiosPool;
class AxiosPool {
    constructor(options, ...configs) {
        this.currentIndex = 0;
        const instances = [];
        configs.forEach((config) => {
            if (typeof config === 'string') {
                instances.push(axios_1.default.create({ baseURL: config }));
            }
            else {
                instances.push(config);
            }
        });
        this.options = {
            sendAll: options.sendAll || true,
            timeout: options.timeout || 0
        };
        this.pool = instances;
    }
    async get(url, options) {
        return this.request(Object.assign({ method: 'get', url }, options));
    }
    async post(url, data, options) {
        return this.request(Object.assign({ method: 'post', data,
            url }, options));
    }
    async delete(url, data, options) {
        return this.request(Object.assign({ method: 'delete', data,
            url }, options));
    }
    async put(url, data, options) {
        return this.request(Object.assign({ method: 'put', data,
            url }, options));
    }
    async request(options) {
        if (this.options.sendAll) {
            const abort = new AbortController();
            const promises = [];
            for (const client of this.pool) {
                promises.push(client.request(Object.assign(Object.assign({}, options), { signal: abort.signal })));
            }
            const result = Promise.any(promises);
            result.then((response) => {
                abort.abort();
                return response;
            });
            return result;
        }
        const instance = this.pool[this.currentIndex];
        try {
            const result = await instance.request(options);
            this.currentIndex = 0;
            return result;
        }
        catch (error) {
            if (this.pool[this.currentIndex + 1]) {
                if (this.options.timeout > 0) {
                    await new Promise((resolve) => setTimeout(resolve, this.options.timeout));
                }
                this.currentIndex += 1;
                return this.request(options);
            }
            this.currentIndex = 0;
            throw error;
        }
    }
}
exports.AxiosPool = AxiosPool;
class RpcAxiosPool {
    constructor(nodes, options) {
        this.id = 0;
        this.pool = createAxiosPool(options, ...nodes);
    }
    async request(method, ...params) {
        this.id += 1;
        return await this.pool.post('/', {
            jsonrpc: '2.0',
            id: this.id,
            method,
            params: params || []
        });
    }
}
exports.RpcAxiosPool = RpcAxiosPool;
