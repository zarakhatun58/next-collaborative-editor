import { tone } from "@/src/controllers/ai.controller";

export async function POST(
  request: Request
) {
  return tone(request as any);
}