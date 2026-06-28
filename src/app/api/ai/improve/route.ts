import { improve } from "@/src/controllers/ai.controller";

export async function POST(
  request: Request
) {
  return improve(request as any);
}