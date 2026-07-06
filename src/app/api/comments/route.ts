import { NextRequest } from "next/server";

import {
  create,
  getAll,
} from "@/src/controllers/comment.controller";

import { rateLimit } from "@/src/middleware/rate-limit.middleware";

export async function GET(
  req: NextRequest
) {
  const limited = rateLimit(req as any);

  if (limited) return limited;

  return getAll(req);
}

export async function POST(
  req: NextRequest
) {
  const limited = rateLimit(req as any);

  if (limited) return limited;

  return create(req);
}