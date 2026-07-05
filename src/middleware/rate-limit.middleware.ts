import { NextRequest, NextResponse } from "next/server";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const requests = new Map<string, RateLimitEntry>();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100;
function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  return "unknown";
}

export function rateLimit(req: NextRequest) {
  const ip = getClientIP(req);
  const now = Date.now();
  const existing = requests.get(ip);

  if (!existing || now > existing.resetAt) {
    requests.set(ip, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });

    return null;
  }

  existing.count++;

  if (existing.count > MAX_REQUESTS) {
    return NextResponse.json(
      {
        success: false,
        message: "Too many requests. Please try again later.",
      },
      {
        status: 429,
      }
    );
  }

  return null;
}

setInterval(() => {
  const now = Date.now();

  for (const [ip, entry] of requests.entries()) {
    if (now > entry.resetAt) {
      requests.delete(ip);
    }
  }
}, 5 * 60 * 1000);