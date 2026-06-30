import { NextRequest } from "next/server";
import { restore } from "@/src/controllers/version.controller";

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;

  return restore(req, id);
}