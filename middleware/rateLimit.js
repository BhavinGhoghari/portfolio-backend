/**
 * Simple in-memory rate limiter
 * Prevents spam on the contact form and login endpoints
 */
const rateLimitMap = new Map()

/**
 * @param {number} maxRequests - max requests per window
 * @param {number} windowMs   - time window in ms
 */
function rateLimit(maxRequests = 10, windowMs = 60 * 1000) {
  return (req, res, next) => {
    const key = req.ip || req.connection.remoteAddress || 'unknown'
    const now = Date.now()

    if (!rateLimitMap.has(key)) {
      rateLimitMap.set(key, { count: 1, start: now })
      return next()
    }

    const record = rateLimitMap.get(key)

    // Reset window if expired
    if (now - record.start > windowMs) {
      rateLimitMap.set(key, { count: 1, start: now })
      return next()
    }

    if (record.count >= maxRequests) {
      const retryAfter = Math.ceil((windowMs - (now - record.start)) / 1000)
      res.setHeader('Retry-After', retryAfter)
      return res.status(429).json({
        success: false,
        message: `Too many requests. Try again in ${retryAfter} seconds.`,
      })
    }

    record.count++
    next()
  }
}

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, record] of rateLimitMap.entries()) {
    if (now - record.start > 5 * 60 * 1000) rateLimitMap.delete(key)
  }
}, 5 * 60 * 1000)

module.exports = rateLimit
