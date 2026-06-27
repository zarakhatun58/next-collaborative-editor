import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma";
import { NextRequest } from "next/server";


export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const existingUser =
    await prisma.user.findUnique({
      where: { email },
    });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return user;
}

export async function loginUser(
  email: string,
  password: string
) {
  const user =
    await prisma.user.findUnique({
      where: { email },
    });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const validPassword =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!validPassword) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    user,
  };
}

export async function getCurrentUser(req: NextRequest) {
  const token =
    req.headers
      .get("authorization")
      ?.replace("Bearer ", "");

  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as {
    userId: string;
  };

  const user =
    await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}