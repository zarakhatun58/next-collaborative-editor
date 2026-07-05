import { z } from "zod";


export const summarizeSchema = z.object({
  text: z
    .string()
    .min(10, "Text must be at least 10 characters."),
});


export const rewriteSchema = z.object({
  text: z
    .string()
    .min(10, "Text must be at least 10 characters."),
});


export const improveSchema = z.object({
  text: z
    .string()
    .min(10, "Text must be at least 10 characters."),
});


export const grammarSchema = z.object({
  text: z
    .string()
    .min(3, "Text must be at least 3 characters."),
});


export const continueWritingSchema = z.object({
  text: z
    .string()
    .min(10, "Text must be at least 10 characters."),
});

export const titleSchema = z.object({
  text: z
    .string()
    .min(20, "Text must be at least 20 characters."),
});


export const translateSchema = z.object({
  text: z
    .string()
    .min(3, "Text must be at least 3 characters."),

  language: z
    .string()
    .min(2, "Language is required."),
});

export const bulletSchema = z.object({
  text: z
    .string()
    .min(10, "Text must be at least 10 characters."),
});

export const toneSchema = z.object({
  text: z
    .string()
    .min(10, "Text must be at least 10 characters."),

  tone: z.enum([
    "professional",
    "friendly",
    "formal",
    "casual",
  ]),
});

export const simplifySchema = z.object({
  text: z
    .string()
    .min(10, "Text must be at least 10 characters."),
});


export const explainSchema = z.object({
  text: z
    .string()
    .min(5, "Text must be at least 5 characters."),
});