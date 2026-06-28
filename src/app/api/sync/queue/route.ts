import { NextRequest } from "next/server";

import {
  queue,
} from "@/src/controllers/sync.controller";

// GET /api/sync/queue
export async function GET(
  req: NextRequest
) {
  return queue(req);
}