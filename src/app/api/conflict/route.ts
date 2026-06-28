import { NextRequest } from "next/server";

import {
  create,
  getAll,
  remove,
} from "@/src/controllers/conflict.controller";

export async function POST(
  req: NextRequest
) {
  return create(req);
}

export async function GET(
  req: NextRequest
) {
  return getAll(req);
}

export async function DELETE(
  req: NextRequest
) {
  return remove(req);
}