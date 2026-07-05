import { NextRequest } from "next/server";

import { dashboard } from "@/src/controllers/dashboard.controller";
import { rateLimit } from "@/src/middleware/rate-limit.middleware";

export async function GET(
  req: NextRequest
) {
  const limited = rateLimit(req as any);

  if (limited) {
    return limited;
  }

  return dashboard(req);
}