import { NextRequest } from "next/server";

import { resolve }  from "@/src/controllers/conflict.controller";

export async function POST(
  req: NextRequest
) {
  return resolve(req);
}