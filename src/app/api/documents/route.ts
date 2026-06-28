import { NextRequest } from "next/server";

import {
  create,
  getAll,
} from "@/src/controllers/document.controller";

// ========================
// GET /api/documents
// ========================

export async function GET(
  req: NextRequest
) {
  return getAll(req);
}

// ========================
// POST /api/documents
// ========================

export async function POST(
  req: NextRequest
) {
  return create(req);
}