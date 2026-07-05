import { NextRequest } from "next/server";
import { restore } from "@/src/controllers/version.controller";
import { rateLimit } from "@/src/middleware/rate-limit.middleware";
export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;

  const limited = rateLimit(req as any);
  if (limited) {
    return limited;
  }

  return restore(req, id);
}