import { NextRequest } from "next/server";

import { restore } from "@/src/controllers/version.controller";

export async function POST(req: NextRequest) {
  const body = await req.json();

  return restore(req, body.versionId);
}