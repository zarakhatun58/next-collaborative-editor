import { NextRequest } from "next/server";
import { register } from "@/src/controllers/auth.controller";
import { rateLimit } from "@/src/middleware/rate-limit.middleware";

export async function POST(req: NextRequest) {
   const limited = rateLimit(req);

  if (limited) {
    return limited;
  }
  return register(req);
}