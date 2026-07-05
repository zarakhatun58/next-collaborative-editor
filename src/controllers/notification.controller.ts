import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/src/services/auth.service";
import { getNotifications } from "@/src/services/notification.service";

export async function getAll(
  req: NextRequest
) {
  try {

    const user =
      await getCurrentUser(req);

    const notifications =
      await getNotifications(user.id);

    return NextResponse.json({
      success: true,
      notifications,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load notifications",
      },
      {
        status: 400,
      }
    );
  }
}