import { NextRequest } from "next/server";
import {
  process,
} from "@/src/controllers/sync.controller";
import { rateLimit } from "@/src/middleware/rate-limit.middleware";

// POST /api/sync/process
export async function POST(
  req: NextRequest
) {
  const limited = rateLimit(req as any);
  if (limited) {
    return limited;
  }
  return process(req);
}