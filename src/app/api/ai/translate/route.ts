import { translate } from "@/src/controllers/ai.controller";
import { rateLimit } from "@/src/middleware/rate-limit.middleware";

export async function POST(
  request: Request
) {
  const limited = rateLimit(request as any);

  if (limited) {
    return limited;
  }

  return translate(request as any);
}