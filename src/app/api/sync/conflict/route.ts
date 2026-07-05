import { NextRequest } from "next/server";
import { rateLimit } from "@/src/middleware/rate-limit.middleware";
import {
  conflict,
  conflicts,
  resolve,
} from "@/src/controllers/sync.controller";


export async function POST(
  req: NextRequest
) {
const limited = rateLimit(req as any);
  if (limited) {
    return limited;
  }
  return conflict(req);
}

export async function GET(
  req: NextRequest
) {
const limited = rateLimit(req as any);
  if (limited) {
    return limited;
  }
  return conflicts(req);
}


export async function PATCH(
  req: NextRequest
) {
 const limited = rateLimit(req as any);
  if (limited) {
    return limited;
  }

  return resolve(req);
}