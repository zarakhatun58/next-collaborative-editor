import { z } from "zod";

export const createCommentSchema = z.object({
  documentId: z.string().uuid("Invalid document ID"),

  message: z
    .string()
    .trim()
    .min(1, "Comment cannot be empty")
    .max(1000, "Comment is too long"),
});

export const deleteCommentSchema = z.object({
  id: z.string().uuid("Invalid comment ID"),
});

export type CreateCommentInput =
  z.infer<typeof createCommentSchema>;

export type DeleteCommentInput =
  z.infer<typeof deleteCommentSchema>;