// lib/rateLimit.js - Empty file for import compatibility
export default function createRateLimiter() {
  return {
    check: async () => {
      return true // Always allow requests for testing
    }
  }
}