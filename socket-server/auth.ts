import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export interface SocketUser {
  id: string;
  email: string;
  name?: string;
}

export function verifyToken(token?: string): SocketUser {
  if (!token) {
    throw new Error("Authentication token missing.");
  }
  try {
    const decoded = jwt.verify(
      token,
      JWT_SECRET
    ) as SocketUser;

    return decoded;
  } catch {
    throw new Error("Invalid or expired token.");
  }
}