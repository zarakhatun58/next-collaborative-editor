import { NextRequest } from "next/server";

import {
  process,
} from "@/src/controllers/sync.controller";

// POST /api/sync/process
export async function POST(
  req: NextRequest
) {
  return process(req);
}