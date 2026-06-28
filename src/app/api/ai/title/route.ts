import { title } from "@/src/controllers/ai.controller";

export async function POST(
  request: Request
) {
  return title(request as any);
}