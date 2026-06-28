import { summarize } from "@/src/controllers/ai.controller";

export async function POST(
  request: Request
) {
  return summarize(request as any);
}