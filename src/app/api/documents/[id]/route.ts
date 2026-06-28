import { NextRequest } from "next/server";

import {
  getOne,
  update,
  remove,
} from "@/src/controllers/document.controller";

// ========================
// GET /api/documents/:id
// ========================

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } = await params;

  return getOne(req, id);
}

// ========================
// PUT /api/documents/:id
// ========================

export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } = await params;

  return update(req, id);
}

// ========================
// DELETE /api/documents/:id
// ========================

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } = await params;

  return remove(req, id);
}