import { NextRequest } from "next/server";
import { rateLimit } from "@/src/middleware/rate-limit.middleware";
import { resolve }  from "@/src/controllers/conflict.controller";

export async function POST(
  req: NextRequest
) {
  const limited = rateLimit(req as any);

  if (limited) {
    return limited;
  }

  return resolve(req);
}