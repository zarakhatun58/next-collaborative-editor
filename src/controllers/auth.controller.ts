import { NextRequest, NextResponse } from "next/server";
import {
  loginUser,
  registerUser,
  getCurrentUser,
} from "@/src/services/auth.service";
import { authenticate } from "../middleware/auth.middleware";
import { prisma } from "../config/prisma";

export async function register(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    const user = await registerUser(
      name,
      email,
      password
    );

    return NextResponse.json(
      {
        success: true,
        user,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Registration failed",
      },
      {
        status: 400,
      }
    );
  }
}

export async function login(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const result = await loginUser(
      email,
      password
    );

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Login failed",
      },
      {
        status: 401,
      }
    );
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