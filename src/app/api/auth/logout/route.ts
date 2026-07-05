import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/src/middleware/rate-limit.middleware";

export async function POST(req: NextRequest) {
  const limited = rateLimit(req);

  if (limited) {
    return limited;
  }
  return NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });
}