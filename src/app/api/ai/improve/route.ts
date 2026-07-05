import { improve } from "@/src/controllers/ai.controller";
import { rateLimit } from "@/src/middleware/rate-limit.middleware";
export async function POST(
  request: Request
) {
  const limited = rateLimit(request as any);

  if (limited) {
    return limited;
  }

  return improve(request as any);
}