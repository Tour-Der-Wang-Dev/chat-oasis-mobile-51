
// Global test setup
import { afterEach, vi } from 'vitest';

// Mock console.error to prevent React warnings from cluttering test output
const originalConsoleError = console.error;
console.error = (...args) => {
  // Filter out specific React warnings if needed
  if (args[0]?.includes?.('Warning:')) {
    return;
  }
  originalConsoleError(...args);
};

// Clean up after each test
afterEach(() => {
  vi.clearAllMocks();
});
