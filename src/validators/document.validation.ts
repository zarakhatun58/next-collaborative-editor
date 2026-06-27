import { z } from "zod";

export const createDocumentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(150),

  content: z.any().optional(),
});

export const updateDocumentSchema = z.object({
  title: z
    .string()
    .trim()
    .max(150)
    .optional(),

  content: z.any().optional(),

  status: z
    .enum(["ACTIVE", "ARCHIVED", "DELETED"])
    .optional(),
});