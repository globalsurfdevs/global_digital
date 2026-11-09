import { Ratelimit } from "@upstash/ratelimit";
import redisClient from "./redisClient";

// Bound repeated login attempts from a single source to slow password guessing.
const authRateLimit = new Ratelimit({
  redis: redisClient,
  limiter: Ratelimit.slidingWindow(5, "15 m"),
  prefix: "auth-login",
});

export default authRateLimit;
