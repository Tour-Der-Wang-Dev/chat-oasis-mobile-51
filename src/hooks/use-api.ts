
import { useState, useCallback } from 'react';
import { ApiError } from '@/lib/api/client';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
}

/**
 * Hook for making API calls with loading, error, and data state management
 */
export function useApi<TData = unknown, TParams = unknown>(
  apiFunction: (params?: TParams) => Promise<TData>,
  options: UseApiOptions<TData> = {}
) {
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(
    async (params?: TParams) => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await apiFunction(params);
        setData(result);
        
        if (options.onSuccess) {
          options.onSuccess(result);
        }
        
        return result;
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError);
        
        if (options.onError) {
          options.onError(apiError);
        }
        
        throw apiError;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction, options]
  );

  return {
    execute,
    data,
    error,
    loading,
    reset: useCallback(() => {
      setData(null);
      setError(null);
      setLoading(false);
    }, []),
  };
}

export default useApi;
