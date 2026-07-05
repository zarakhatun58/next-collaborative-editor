import { NextRequest } from "next/server";

import {
  getOne,
  update,
  remove,
} from "@/src/controllers/document.controller";
import { rateLimit } from "@/src/middleware/rate-limit.middleware";


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
  const limited = rateLimit(req as any);
  if (limited) {
    return limited;
  }

  return getOne(req, id);
}


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

export async function PATCH(
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