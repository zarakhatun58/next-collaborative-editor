import { z } from "zod";

// ===============================
// Create Conflict
// ===============================

export const createConflictSchema = z.object({
  documentId: z.string().uuid(),

  localContent: z.any(),

  remoteContent: z.any(),
});

// ===============================
// Resolve Conflict
// ===============================

export const resolveConflictSchema = z.object({
  conflictId: z.string().uuid(),

  content: z.any(),
});