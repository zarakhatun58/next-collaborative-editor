import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma";

export interface AuthUser {
  userId: string;
  email: string;
}

export async function authenticate(
  req: NextRequest
): Promise<AuthUser> {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as AuthUser;

    return decoded;
  } catch {
    throw new Error("Invalid token");
  }
}

export async function me(req: NextRequest) {
  try {
    const auth = await authenticate(req);

    const user = await prisma.user.findUnique({
      where: {
        id: auth.userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }
}