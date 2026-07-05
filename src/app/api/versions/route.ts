import { NextRequest } from "next/server";

import {
  create,
  getAll,
  restore,
} from "@/src/controllers/version.controller";
import { rateLimit } from "@/src/middleware/rate-limit.middleware";

export async function GET(
  req: NextRequest
) {
  const documentId =
    req.nextUrl.searchParams.get(
      "documentId"
    );

  if (!documentId) {
    return Response.json(
      {
        success: false,
        message: "documentId is required",
      },
      { status: 400 }
    );
  }
  const limited = rateLimit(req as any);

  if (limited) {
    return limited;
  }
  return getAll(req, documentId);
}


export async function POST(req: NextRequest) {
  const limited = rateLimit(req as any);

  if (limited) return limited;

  const body = await req.json();

  if (!body.documentId) {
    return Response.json(
      {
        success: false,
        message: "documentId is required",
      },
      { status: 400 }
    );
  }

  return create(req, body.documentId);
}

export async function PATCH(
  req: NextRequest
) {
  const body = await req.json();

  if (!body.versionId) {
    return Response.json(
      {
        success: false,
        message: "versionId is required",
      },
      { status: 400 }
    );
  }

  const newReq = new NextRequest(req.url, {
    method: "PATCH",
    headers: req.headers,
    body: JSON.stringify(body),
  });
   const limited = rateLimit(req as any);

  if (limited) {
    return limited;
  }

  return restore(
    newReq,
    body.versionId
  );
}