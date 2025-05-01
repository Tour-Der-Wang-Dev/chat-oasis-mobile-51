
import { get, post, put, ApiResponse } from '../client';
import { validateApiResponse, userSchema, userResponseSchema } from '../validators';
import { z } from 'zod';

// Types
export type User = z.infer<typeof userSchema>;

// User endpoints
const USER_ENDPOINTS = {
  FETCH_PROFILE: '/users/profile',
  UPDATE_PROFILE: '/users/profile',
  FETCH_USER: (userId: string) => `/users/${userId}`,
};

/**
 * Service for user-related API calls
 */
export const userService = {
  /**
   * Fetch the current user's profile
   */
  async fetchProfile(): Promise<User> {
    const response = await get<User>(USER_ENDPOINTS.FETCH_PROFILE);
    return validateApiResponse(response, userResponseSchema).data;
  },
  
  /**
   * Update the current user's profile
   */
  async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await put<User>(USER_ENDPOINTS.UPDATE_PROFILE, userData);
    return validateApiResponse(response, userResponseSchema).data;
  },
  
  /**
   * Fetch a specific user by ID
   */
  async fetchUser(userId: string): Promise<User> {
    const response = await get<User>(USER_ENDPOINTS.FETCH_USER(userId));
    return validateApiResponse(response, userResponseSchema).data;
  }
};
