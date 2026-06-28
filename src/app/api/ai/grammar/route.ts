import { grammar } from "@/src/controllers/ai.controller";

export async function POST(
  request: Request
) {
  return grammar(request as any);
}