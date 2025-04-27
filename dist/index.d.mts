import { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';

interface AxiosPoolConfig {
    sendAll?: boolean;
    timeout?: number;
    validateResponse?: (response: AxiosResponse['data']) => void;
}
declare function createAxiosPool(initialOptions?: AxiosPoolConfig, ...configs: Array<AxiosInstance | string>): AxiosInstance;
declare class AxiosPool {
    private readonly options;
    private currentIndex;
    private readonly pool;
    constructor(options?: AxiosPoolConfig, ...configs: Array<AxiosInstance | string>);
    get(url: string, options: AxiosRequestConfig): Promise<AxiosResponse>;
    post(url: string, data: any, options: AxiosRequestConfig): Promise<AxiosResponse>;
    delete(url: string, data: any, options: AxiosRequestConfig): Promise<AxiosResponse>;
    put(url: string, data: any, options: AxiosRequestConfig): Promise<AxiosResponse>;
    private request;
}
declare class RpcAxiosPool {
    private readonly pool;
    private id;
    constructor(nodes: Array<AxiosInstance | string>, options?: AxiosPoolConfig);
    request(method: string, ...params: any): Promise<AxiosResponse>;
}

export { AxiosPool, type AxiosPoolConfig, RpcAxiosPool, createAxiosPool };
