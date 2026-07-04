"use client";

import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket(token: string) {
  if (socket) return socket;

  socket = io(
    process.env.NEXT_PUBLIC_SOCKET_URL!,
    {
      transports: ["websocket"],
      autoConnect: true,

      auth: {
        token,
      },
    }
  );

  return socket;
}

export function disconnectSocket() {
  socket?.disconnect();
  socket = null;
}