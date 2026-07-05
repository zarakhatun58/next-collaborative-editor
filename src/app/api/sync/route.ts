import { NextRequest } from "next/server";
import { rateLimit } from "@/src/middleware/rate-limit.middleware";
import {
  create,
} from "@/src/controllers/sync.controller";

export async function POST(
  req: NextRequest
) {
  const limited = rateLimit(req as any);
  if (limited) {
    return limited;
  }
  return create(req);
}