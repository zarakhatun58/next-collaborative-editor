import { bullets } from "@/src/controllers/ai.controller";

export async function POST(
  request: Request
) {
  return bullets(request as any);
}