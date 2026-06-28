import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma";
import { NextRequest } from "next/server";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Don't return password
  const { password: _, ...safeUser } = user;

  return safeUser;
}

export async function loginUser(
  email: string,
  password: string
) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const validPassword = await bcrypt.compare(
    password,
    user.password
  );

  if (!validPassword) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user.id, user.email);

  const { password: _, ...safeUser } = user;

  return {
    success: true,
    token,
    user: safeUser,
  };
}

export async function getCurrentUser(
  req: NextRequest
) {
  const authHeader =
    req.headers.get("authorization");

  if (!authHeader) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.replace(
    "Bearer ",
    ""
  );

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as {
    userId: string;
    email: string;
  };

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const { password, ...safeUser } = user;

  return safeUser;
}

export function generateToken(
  userId: string,
  email: string
) {
  return jwt.sign(
    {
      userId,
      email,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    }
  );
}