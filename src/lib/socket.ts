// src/lib/socket.ts

export const SOCKET_EVENTS = {
  JOIN_DOCUMENT: "join-document",
  LEAVE_DOCUMENT: "leave-document",
  DOCUMENT_UPDATE: "document-update",
  RECEIVE_UPDATE: "receive-update",
  USER_TYPING: "user-typing",
  USER_STOPPED_TYPING: "user-stopped-typing",
  CURSOR_MOVE: "cursor-move",
} as const;

export interface DocumentUpdatePayload {
  documentId: string;
  content: string;
  version: number;
  userId: string;
}

export interface CursorPayload {
  documentId: string;
  userId: string;
  x: number;
  y: number;
}

export interface TypingPayload {
  documentId: string;
  userId: string;
}