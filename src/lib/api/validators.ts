
import { z } from 'zod';

/**
 * Helper function to validate API response against a Zod schema
 */
export function validateApiResponse<T>(data: unknown, schema: z.ZodType<T>): T {
  try {
    return schema.parse(data);
  } catch (error) {
    console.error('API response validation error:', error);
    throw new Error('Invalid API response format');
  }
}

/**
 * Helper function to create API response schemas with proper error handling
 */
export function createApiSchema<T>(dataSchema: z.ZodType<T>) {
  return z.object({
    data: dataSchema,
    status: z.number(),
    statusText: z.string(),
    headers: z.record(z.string()),
  });
}

// Example schema for user data
export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().url().optional(),
});

// Example response schema for a user
export const userResponseSchema = createApiSchema(userSchema);

// Example schema for error responses
export const errorSchema = z.object({
  message: z.string(),
  code: z.union([z.string(), z.number()]).optional(),
  status: z.number().optional(),
  data: z.any().optional(),
});
