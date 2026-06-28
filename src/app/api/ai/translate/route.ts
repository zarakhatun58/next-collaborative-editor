import { translate } from "@/src/controllers/ai.controller";

export async function POST(
  request: Request
) {
  return translate(request as any);
}