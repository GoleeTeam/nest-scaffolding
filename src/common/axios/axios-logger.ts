import { Logger } from '@nestjs/common';
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const axiosLogger = new Logger('Axios');

type EnrichedAxiosRequestConfig = InternalAxiosRequestConfig & { meta: { requestStartedAt: number } };

export const axiosRequestStartedInterceptor = {
    onFulfilled: (config: EnrichedAxiosRequestConfig) => {
        config.meta = config.meta || {};
        config.meta.requestStartedAt = new Date().getTime();
        return config;
    },
};

export const axiosResponseInterceptor = {
    onFulfilled: (response: AxiosResponse) => {
        if (Logger.isLevelEnabled('debug')) {
            axiosLogger.debug(
                appendHeadersAndBodyToJsonPayload(responseToGCPHttpRequestJson(response), response),
                responseToLogMessage(response),
            );
        } else {
            axiosLogger.log(responseToGCPHttpRequestJson(response), responseToLogMessage(response));
        }
        return response;
    },
    onRejected: (error: AxiosError) => {
        if (error.response) {
            axiosLogger.error(
                appendHeadersAndBodyToJsonPayload(responseToGCPHttpRequestJson(error.response), error.response),
                responseToLogMessage(error.response),
            );
        }
        return Promise.reject(error);
    },
};

function responseToLogMessage(response: AxiosResponse) {
    const method = response.config.method?.toUpperCase();
    const url = response.config.url;
    const respStatus = response.status;
    return `External HttpRequest ${method} ${respStatus} ${url}`;
}

// GCP HttpRequest format
// {
//   httpRequest: {
//     requestMethod,
//     requestUrl,
//     status,
//     userAgent,
//     latency: {
//       seconds: latencySeconds,
//     },
//     responseSize,
//   },
// }
function responseToGCPHttpRequestJson(response: AxiosResponse) {
    return {
        httpRequest: {
            requestMethod: response.config.method?.toUpperCase(),
            requestUrl: response.config.url,
            status: response.status,
            userAgent: response.config.headers['User-Agent'],
            responseSize: response.headers['content-length'] || null,
            latency: {
                seconds: calculateLatencyInSeconds(response),
            },
        },
    };
}

function appendHeadersAndBodyToJsonPayload(jsonPayload: any, response: AxiosResponse) {
    return {
        ...jsonPayload,
        requestHeaders: response.config.headers,
        requestParams: response.config.params,
        requestBody: parseJsonOrString(response.config.data),
        responseHeaders: response.headers,
        responseBody: response.data,
    };
}

function parseJsonOrString(data: string) {
    try {
        return JSON.parse(data);
    } catch (e) {
        return data;
    }
}

function calculateLatencyInSeconds(response: AxiosResponse) {
    return (new Date().getTime() - (response.config as EnrichedAxiosRequestConfig).meta.requestStartedAt) / 1000;
}
