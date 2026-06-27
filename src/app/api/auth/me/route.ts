import { NextRequest } from "next/server";
import { me } from "@/src/controllers/auth.controller";

export async function GET(req: NextRequest) {
  return me(req);
}