import { NextRequest, NextResponse } from "next/server";

import { getCurrentUser } from "@/src/services/auth.service";
import { getDashboard } from "@/src/services/dashboard.service";

export async function dashboard(
  req: NextRequest
) {
  try {
    const user = await getCurrentUser(req);

    const data = await getDashboard(
      user.id
    );

    return NextResponse.json(
      {
        success: true,
        ...data,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to load dashboard",
      },
      {
        status: 500,
      }
    );
  }
}