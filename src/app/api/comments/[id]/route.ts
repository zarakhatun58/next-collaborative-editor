import { NextRequest } from "next/server";

import { remove } from "@/src/controllers/comment.controller";

import { rateLimit } from "@/src/middleware/rate-limit.middleware";

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } = await params;

  const limited = rateLimit(req as any);

  if (limited) return limited;

  return remove(req, id);
}