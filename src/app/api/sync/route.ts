import { NextRequest } from "next/server";

import {
  create,
} from "@/src/controllers/sync.controller";

// POST /api/sync
export async function POST(
  req: NextRequest
) {
  return create(req);
}