import { z } from "zod";



export const createConflictSchema = z.object({
  documentId: z.string().uuid(),

  localContent: z.any(),

  remoteContent: z.any(),
});


export const resolveConflictSchema = z.object({
  conflictId: z.string().uuid(),

  content: z.any(),
});