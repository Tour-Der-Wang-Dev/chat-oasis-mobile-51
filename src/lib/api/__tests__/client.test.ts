
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import { createApiClient, ApiResponse } from '../client';

// Mock axios
vi.mock('axios', () => {
  return {
    create: vi.fn(() => ({
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    })),
  };
});

// Mock toast
vi.mock('@/hooks/use-toast', () => ({
  toast: vi.fn(),
}));

describe('API Client', () => {
  let mockAxios: any;
  let apiClient: ReturnType<typeof createApiClient>;

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Setup mock axios
    mockAxios = axios.create();
    apiClient = createApiClient({
      baseURL: 'https://api.example.com',
      timeout: 5000,
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should create an axios instance with the correct config', () => {
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://api.example.com',
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: false,
    });
  });

  it('should handle successful GET requests', async () => {
    const mockResponse = {
      data: { id: '1', name: 'Test User' },
      status: 200,
      statusText: 'OK',
      headers: { 'content-type': 'application/json' },
    };
    
    mockAxios.get.mockResolvedValueOnce(mockResponse);
    
    const result = await apiClient.get('/users/1');
    
    expect(mockAxios.get).toHaveBeenCalledWith('/users/1', undefined);
    expect(result).toEqual({
      data: { id: '1', name: 'Test User' },
      status: 200,
      statusText: 'OK',
      headers: { 'content-type': 'application/json' },
    });
  });

  it('should retry failed requests with exponential backoff', async () => {
    // Mock a network error, then success on retry
    const networkError = new Error('Network Error');
    networkError.name = 'NetworkError';
    
    const mockResponse = {
      data: { id: '1', name: 'Test User' },
      status: 200,
      statusText: 'OK',
      headers: { 'content-type': 'application/json' },
    };
    
    // First call fails, second call succeeds
    mockAxios.get.mockRejectedValueOnce(networkError);
    mockAxios.get.mockResolvedValueOnce(mockResponse);
    
    // Mock setTimeout
    vi.useFakeTimers();
    
    const resultPromise = apiClient.get('/users/1');
    
    // Fast-forward timers to simulate backoff
    vi.runAllTimers();
    
    const result = await resultPromise;
    
    expect(mockAxios.get).toHaveBeenCalledTimes(2);
    expect(mockAxios.get).toHaveBeenCalledWith('/users/1', undefined);
    expect(result).toEqual(mockResponse);
    
    vi.useRealTimers();
  });
});
