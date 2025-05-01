
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { apiClient } from '../client';
import { userService } from '../services/userService';
import { useApi } from '@/hooks/use-api';

// Setup mock for axios
const mockAxios = new MockAdapter(axios);

describe('API Integration Tests', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch user profile and validate the response', async () => {
    // Mock the profile endpoint
    mockAxios.onGet('/api/users/profile').reply(200, {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      avatar: 'https://example.com/avatar.jpg',
    });
    
    // Test the user service directly
    const profile = await userService.fetchProfile();
    
    expect(profile).toEqual({
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      avatar: 'https://example.com/avatar.jpg',
    });
  });

  it('should reject with validation error when response format is invalid', async () => {
    // Mock an invalid response
    mockAxios.onGet('/api/users/profile').reply(200, {
      id: 123, // Should be a string UUID, not a number
      name: 'Jane Doe',
      email: 'invalid-email', // Invalid email format
    });
    
    // Test that validation fails
    await expect(userService.fetchProfile()).rejects.toThrow('Invalid API response format');
  });

  it('should handle API errors with retry mechanism', async () => {
    // Instead of using networkErrorOnce (which doesn't exist), we'll use a different approach
    // First request: network error
    mockAxios.onGet('/api/users/profile').replyOnce(config => {
      return [0, null, {}, 'Network Error'];
    });
    
    // Second request: network error again
    mockAxios.onGet('/api/users/profile').replyOnce(config => {
      return [0, null, {}, 'Network Error'];
    });
    
    // Third request: success
    mockAxios.onGet('/api/users/profile').replyOnce(200, {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    });
    
    // Mock setTimeout for faster tests
    vi.useFakeTimers();
    
    // Start the API call
    const profilePromise = userService.fetchProfile();
    
    // Fast-forward through the retry delays
    vi.runAllTimers();
    
    // Verify successful response after retries
    const profile = await profilePromise;
    expect(profile).toEqual({
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    });
    
    vi.useRealTimers();
  });

  it('should integrate useApi hook with user service', async () => {
    // Mock successful profile response
    mockAxios.onGet('/api/users/profile').reply(200, {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    });
    
    // Setup success callback
    const onSuccess = vi.fn();
    
    // Render the hook
    const { result, waitForNextUpdate } = renderHook(() => 
      useApi(userService.fetchProfile, { onSuccess })
    );
    
    // Execute the API call
    act(() => {
      result.current.execute();
    });
    
    // Wait for the API call to complete
    await waitForNextUpdate();
    
    // Verify hook state
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual({
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    });
    expect(result.current.error).toBeNull();
    expect(onSuccess).toHaveBeenCalledWith(result.current.data);
  });

  it('should update user profile via the API', async () => {
    // Setup mock for profile update
    const updatedProfile = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Jane Updated',
      email: 'jane.updated@example.com',
    };
    
    mockAxios.onPut('/api/users/profile', { name: 'Jane Updated' })
      .reply(200, updatedProfile);
    
    // Test update functionality
    const result = await userService.updateProfile({ name: 'Jane Updated' });
    
    expect(result).toEqual(updatedProfile);
  });
});
