import { NextRequest } from "next/server";

import {
  create,
  getAll,
  remove,
} from "@/src/controllers/conflict.controller";
import { rateLimit } from "@/src/middleware/rate-limit.middleware";

export async function POST(
  req: NextRequest
) {
  const limited = rateLimit(req as any);

  if (limited) {
    return limited;
  }

  return create(req);
}

export async function GET(
  req: NextRequest
) {
  const limited = rateLimit(req as any);

  if (limited) {
    return limited;
  }

  return getAll(req);
}

export async function DELETE(
  req: NextRequest
) {
  const limited = rateLimit(req as any);

  if (limited) {
    return limited;
  }

  return remove(req);
}