import { rewrite } from "@/src/controllers/ai.controller";

export async function POST(
  request: Request
) {
  return rewrite(request as any);
}