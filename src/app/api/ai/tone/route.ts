import { tone } from "@/src/controllers/ai.controller";
import { rateLimit } from "@/src/middleware/rate-limit.middleware";

export async function POST(
  request: Request
) {
  const limited = rateLimit(request as any);
  return tone(request as any);
}