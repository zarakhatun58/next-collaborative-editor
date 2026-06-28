import { continueText } from "@/src/controllers/ai.controller";

export async function POST(
  request: Request
) {
  return continueText(request as any);
}