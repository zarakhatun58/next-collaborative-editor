import { z } from "zod";
import { SyncOperationType } from "@prisma/client";


export const createSyncSchema = z.object({
  documentId: z.string().uuid(),

  operationType: z.nativeEnum(
    SyncOperationType
  ),

 payload: z.any(),

  baseVersion: z
    .number()
    .int()
    .nonnegative(),

  clientVersion: z
    .number()
    .int()
    .nonnegative(),

  clientTimestamp: z
    .string()
    .datetime(),
});


export const queueSchema = z.object({
  documentId: z.string().uuid(),
});

export const processQueueSchema =
  z.object({
    documentId: z.string().uuid(),
  });


export const createConflictSchema =
  z.object({
    documentId: z.string().uuid(),

    localContent: z.any(),

    remoteContent: z.any(),
  });


export const resolveConflictSchema =
  z.object({
    conflictId: z.string().uuid(),
  });

  export const optionalDocumentSchema =
  z.object({
    documentId: z
      .string()
      .uuid()
      .optional(),
  });