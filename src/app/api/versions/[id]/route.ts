import { NextRequest } from "next/server";

import {
  getOne,
  remove,
} from "@/src/controllers/version.controller";

// GET /api/versions/:id
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return getOne(req, id);
}

// DELETE /api/versions/:id
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return remove(req, id);
}