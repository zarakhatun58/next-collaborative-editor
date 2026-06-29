import { NextRequest } from "next/server";
import { me, updateProfile } from "@/src/controllers/auth.controller";

export async function GET(req: NextRequest) {
  return me(req);
}

export async function PATCH(req:NextRequest){

 return updateProfile(req);

}