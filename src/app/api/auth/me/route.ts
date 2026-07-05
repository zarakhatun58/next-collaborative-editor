import { NextRequest } from "next/server";
import { me, updateProfile } from "@/src/controllers/auth.controller";
import { rateLimit } from "@/src/middleware/rate-limit.middleware";

export async function GET(req: NextRequest) {
   const limited = rateLimit(req);

  if (limited) {
    return limited;
  }

  return me(req);
}

export async function PATCH(req:NextRequest){
const limited = rateLimit(req);

  if (limited) {
    return limited;
  }
 return updateProfile(req);

}