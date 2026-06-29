import { explain } from "@/src/controllers/ai.controller";

export async function POST(
  request: Request
) {
  return explain(request as any);
}