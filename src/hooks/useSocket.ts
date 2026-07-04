"use client";

import { useEffect } from "react";
import { getSocket } from "@/src/lib/socket-client";

export function useSocket(
  token: string,
  documentId: string
) {
  useEffect(() => {
    if (!token || !documentId) return;

    const socket = getSocket(token);

    socket.emit("join-document", {
      documentId,
    });

    return () => {
      socket.emit("leave-document", {
        documentId,
      });
    };
  }, [token, documentId]);
}