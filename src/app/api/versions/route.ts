import { NextRequest } from "next/server";

import {
  create,
  getAll,
  restore,
} from "@/src/controllers/version.controller";

// ====================================
// GET /api/versions?documentId=xxx
// ====================================

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

  return getAll(req, documentId);
}

// ====================================
// POST /api/versions
// ====================================

export async function POST(
  req: NextRequest
) {
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

  // create() also needs body.content,
  // so recreate the request after reading it.
  const newReq = new NextRequest(req.url, {
    method: "POST",
    headers: req.headers,
    body: JSON.stringify(body),
  });

  return create(newReq, body.documentId);
}

// ====================================
// PATCH /api/versions
// ====================================

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

  return restore(
    newReq,
    body.versionId
  );
}