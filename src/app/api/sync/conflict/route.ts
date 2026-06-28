import { NextRequest } from "next/server";

import {
  conflict,
  conflicts,
  resolve,
} from "@/src/controllers/sync.controller";

// POST /api/sync/conflict
export async function POST(
  req: NextRequest
) {
  return conflict(req);
}

// GET /api/sync/conflict
export async function GET(
  req: NextRequest
) {
  return conflicts(req);
}

// PATCH /api/sync/conflict
export async function PATCH(
  req: NextRequest
) {
  return resolve(req);
}