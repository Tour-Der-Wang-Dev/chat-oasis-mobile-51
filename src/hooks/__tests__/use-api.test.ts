
import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';
import { useApi } from '../use-api';

describe('useApi', () => {
  it('should handle successful API calls', async () => {
    const mockData = { id: '1', name: 'Test User' };
    const mockApiFunction = vi.fn().mockResolvedValue(mockData);
    const onSuccess = vi.fn();
    
    const { result, waitForNextUpdate } = renderHook(() => 
      useApi(mockApiFunction, { onSuccess })
    );
    
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    
    // Execute the API call
    let returnedData;
    act(() => {
      returnedData = result.current.execute();
    });
    
    // Check loading state
    expect(result.current.loading).toBe(true);
    
    // Wait for the API call to complete
    await waitForNextUpdate();
    
    // Check final state
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
    expect(onSuccess).toHaveBeenCalledWith(mockData);
    expect(await returnedData).toEqual(mockData);
  });
  
  it('should handle API errors', async () => {
    const mockError = { message: 'API Error', status: 500 };
    const mockApiFunction = vi.fn().mockRejectedValue(mockError);
    const onError = vi.fn();
    
    const { result, waitForNextUpdate } = renderHook(() => 
      useApi(mockApiFunction, { onError })
    );
    
    // Execute the API call
    let promise;
    act(() => {
      promise = result.current.execute();
    });
    
    // Check loading state
    expect(result.current.loading).toBe(true);
    
    // Wait for the API call to complete
    await waitForNextUpdate();
    
    // Check final state
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toEqual(mockError);
    expect(onError).toHaveBeenCalledWith(mockError);
    
    // The promise should reject
    await expect(promise).rejects.toEqual(mockError);
  });
  
  it('should reset state when reset is called', async () => {
    const mockData = { id: '1', name: 'Test User' };
    const mockApiFunction = vi.fn().mockResolvedValue(mockData);
    
    const { result, waitForNextUpdate } = renderHook(() => useApi(mockApiFunction));
    
    // Execute the API call
    act(() => {
      result.current.execute();
    });
    
    await waitForNextUpdate();
    
    // Check state after successful call
    expect(result.current.data).toEqual(mockData);
    
    // Reset the hook state
    act(() => {
      result.current.reset();
    });
    
    // Check state has been reset
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });
});
