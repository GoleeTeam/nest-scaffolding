import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import * as https from 'https';
import { axiosRequestStartedInterceptor, axiosResponseInterceptor } from './axios-logger';

export default class AxiosClientFactory {
    static create(baseURL: string): AxiosInstance {
        const axiosClient = axios.create({
            baseURL,
            httpsAgent: new https.Agent({ keepAlive: true, keepAliveMsecs: 10000 }),
        });
        axiosRetry(axiosClient, {
            retries: 2,
            retryDelay: () => {
                return 100;
            },
        });
        axiosClient.interceptors.request.use(axiosRequestStartedInterceptor.onFulfilled);
        axiosClient.interceptors.response.use(
            axiosResponseInterceptor.onFulfilled,
            axiosResponseInterceptor.onRejected,
        );
        return axiosClient;
    }
}
