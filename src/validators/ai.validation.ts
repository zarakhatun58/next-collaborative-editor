import { z } from "zod";

// ===============================
// Summarize
// ===============================

export const summarizeSchema = z.object({
  text: z
    .string()
    .min(10, "Text must be at least 10 characters."),
});

// ===============================
// Rewrite
// ===============================

export const rewriteSchema = z.object({
  text: z
    .string()
    .min(10, "Text must be at least 10 characters."),
});

// ===============================
// Improve Writing
// ===============================

export const improveSchema = z.object({
  text: z
    .string()
    .min(10, "Text must be at least 10 characters."),
});

// ===============================
// Grammar
// ===============================

export const grammarSchema = z.object({
  text: z
    .string()
    .min(3, "Text must be at least 3 characters."),
});

// ===============================
// Continue Writing
// ===============================

export const continueWritingSchema = z.object({
  text: z
    .string()
    .min(10, "Text must be at least 10 characters."),
});
// ===============================
// Generate Title
// ===============================

export const titleSchema = z.object({
  text: z
    .string()
    .min(20, "Text must be at least 20 characters."),
});

// ===============================
// Translate
// ===============================

export const translateSchema = z.object({
  text: z
    .string()
    .min(3, "Text must be at least 3 characters."),

  language: z
    .string()
    .min(2, "Language is required."),
});
// ===============================
// Bullet Points
// ===============================

export const bulletSchema = z.object({
  text: z
    .string()
    .min(10, "Text must be at least 10 characters."),
});