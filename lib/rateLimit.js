// lib/rateLimit.js
const rateLimitStore = new Map()

// Cleanup interval - remove old entries every hour
setInterval(() => {
  const now = Date.now()
  const keys = Array.from(rateLimitStore.keys()) // Convert to array first
  keys.forEach((key) => {
    const record = rateLimitStore.get(key)
    if (record && now > record.resetTime) {
      rateLimitStore.delete(key)
    }
  })
}, 60 * 60 * 1000) // Clean up every hour

export default function rateLimit(options = {}) {
  const interval = options.interval || 60 * 1000 // Default: 1 minute
  const limit = options.limit || 5 // Default: 5 requests per interval

  return {
    check: async (token) => {
      const now = Date.now()
      const record = rateLimitStore.get(token)

      if (!record) {
        // First request
        rateLimitStore.set(token, {
          count: 1,
          resetTime: now + interval
        })
        return true
      }

      if (now > record.resetTime) {
        // Reset the counter if interval has passed
        rateLimitStore.set(token, {
          count: 1,
          resetTime: now + interval
        })
        return true
      }

      if (record.count >= limit) {
        // Rate limit exceeded
        return false
      }

      // Increment counter
      record.count++
      rateLimitStore.set(token, record)
      return true
    }
  }
}