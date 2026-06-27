import { register } from "@/src/controllers/auth.controller";
import { NextRequest } from "next/server";


export async function POST(req: NextRequest) {
  return register(req);
}