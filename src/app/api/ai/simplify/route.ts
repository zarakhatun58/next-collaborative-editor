import { simplify } from "@/src/controllers/ai.controller";

export async function POST(
  request: Request
) {
  return simplify(request as any);
}