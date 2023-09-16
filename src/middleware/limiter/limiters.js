import { rateLimit } from "express-rate-limit";
// Define a rate limit configuration (1 request per minute)
export const minuteLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 1, // 1 request per minute
  message: "Too many requests. Please wait a minute and try again.",
});

// Define a rate limit configuration (5 requests per day)
export const dailyLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours (1 day)
  max: 5, // 5 requests per day
  message: "Exceeded the daily request limit. Please try again tomorrow.",
});
