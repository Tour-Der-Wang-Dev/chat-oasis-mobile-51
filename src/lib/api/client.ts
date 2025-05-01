
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from '@/hooks/use-toast';

// Default configuration for API requests
const DEFAULT_TIMEOUT = 30000; // 30 seconds
const MAX_RETRIES = 3;

// Response type interface
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

// Error type interface
export interface ApiError {
  message: string;
  code?: string | number;
  status?: number;
  data?: any;
}

// Configuration for creating API client
export interface ApiClientConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
  maxRetries?: number;
  withCredentials?: boolean;
}

/**
 * Creates an API client with error handling and retry capabilities
 */
export function createApiClient(config: ApiClientConfig = {}): {
  client: AxiosInstance;
  get: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<ApiResponse<T>>;
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<ApiResponse<T>>;
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<ApiResponse<T>>;
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<ApiResponse<T>>;
  delete: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<ApiResponse<T>>;
} {
  const {
    baseURL = '/api',
    timeout = DEFAULT_TIMEOUT,
    headers = {},
    maxRetries = MAX_RETRIES,
    withCredentials = false,
  } = config;

  // Create axios instance with default config
  const axiosInstance = axios.create({
    baseURL,
    timeout,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    withCredentials,
  });

  // Helper function to handle response
  const handleResponse = <T>(response: AxiosResponse<T>): ApiResponse<T> => {
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers as Record<string, string>,
    };
  };

  // Helper function to handle error
  const handleError = (error: any): never => {
    const axiosError = error as AxiosError;
    const apiError: ApiError = {
      message: axiosError.message || 'An unknown error occurred',
      status: axiosError.response?.status,
      code: axiosError.code,
      data: axiosError.response?.data,
    };

    // Log the error for debugging
    console.error('API Error:', apiError);

    // Show a toast with the error message
    toast({
      variant: "destructive",
      title: "Error",
      description: apiError.message,
    });

    throw apiError;
  };

  // Helper function to implement retry with exponential backoff
  const withRetry = async <T>(
    requestFn: () => Promise<AxiosResponse<T>>,
    retries = maxRetries
  ): Promise<AxiosResponse<T>> => {
    try {
      return await requestFn();
    } catch (error) {
      const axiosError = error as AxiosError;
      
      // Don't retry if we've hit our retry limit or certain status codes
      if (
        retries <= 0 ||
        axiosError.response?.status === 400 || // Bad Request
        axiosError.response?.status === 401 || // Unauthorized
        axiosError.response?.status === 403 || // Forbidden
        axiosError.response?.status === 404 || // Not Found
        axiosError.response?.status === 422    // Unprocessable Entity
      ) {
        throw error;
      }
      
      // Calculate backoff time: 2^retries * 100ms + random jitter
      const backoffTime = Math.pow(2, maxRetries - retries) * 100 + Math.random() * 100;
      
      console.log(`Retrying request in ${backoffTime.toFixed(0)}ms... (${maxRetries - retries + 1}/${maxRetries})`);
      
      // Wait for the backoff time
      await new Promise(resolve => setTimeout(resolve, backoffTime));
      
      // Retry the request
      return withRetry(requestFn, retries - 1);
    }
  };

  // Implement HTTP methods with retry capability
  const get = async <T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await withRetry<T>(() => axiosInstance.get<T>(url, config));
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  };

  const post = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await withRetry<T>(() => axiosInstance.post<T>(url, data, config));
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  };

  const put = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await withRetry<T>(() => axiosInstance.put<T>(url, data, config));
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  };

  const patch = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await withRetry<T>(() => axiosInstance.patch<T>(url, data, config));
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  };

  const deleteMethod = async <T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await withRetry<T>(() => axiosInstance.delete<T>(url, config));
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  };

  return {
    client: axiosInstance,
    get,
    post,
    put,
    patch,
    delete: deleteMethod,
  };
}

// Create default API client instance
export const apiClient = createApiClient();

// Export default methods from the default client
export const { get, post, put, patch, delete: del } = apiClient;
