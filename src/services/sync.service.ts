import { prisma } from "@/src/config/prisma";
import { Prisma, SyncOperationType } from "@prisma/client";

// ===============================
// Create Sync Operation
// ===============================

export async function createSyncOperation(
  documentId: string,
  userId: string,
  operationType: SyncOperationType,
  payload: Prisma.InputJsonValue,
  clientTimestamp: Date
) {
  // Check permission
  const document = await prisma.document.findFirst({
    where: {
      id: documentId,
      OR: [
        { ownerId: userId },
        {
          members: {
            some: {
              userId,
              role: {
                in: ["OWNER", "EDITOR"],
              },
            },
          },
        },
      ],
    },
  });

  if (!document) {
    throw new Error("Access denied.");
  }

  return prisma.syncOperation.create({
    data: {
      documentId,
      operationType,
      payload,
      clientTimestamp,
    },
  });
}

// ===============================
// Get Pending Queue
// ===============================

export async function getPendingOperations(
  documentId: string,
  userId: string
) {
  const document = await prisma.document.findFirst({
    where: {
      id: documentId,
      OR: [
        { ownerId: userId },
        {
          members: {
            some: {
              userId,
            },
          },
        },
      ],
    },
  });

  if (!document) {
    throw new Error("Access denied.");
  }

  return prisma.syncOperation.findMany({
    where: {
      documentId,
      processed: false,
    },
    orderBy: {
      clientTimestamp: "asc",
    },
  });
}

// ===============================
// Process Queue
// ===============================

export async function processQueue(
  documentId: string,
  userId: string
) {
  const document = await prisma.document.findFirst({
    where: {
      id: documentId,
      ownerId: userId,
    },
  });

  if (!document) {
    throw new Error("Only the owner can process sync.");
  }

  await prisma.syncOperation.updateMany({
    where: {
      documentId,
      processed: false,
    },
    data: {
      processed: true,
      serverTimestamp: new Date(),
    },
  });

  return {
    success: true,
    message: "Queue processed successfully.",
  };
}

// ===============================
// Create Conflict
// ===============================

export async function createConflict(
  documentId: string,
  userId: string,
  localContent: Prisma.InputJsonValue,
  remoteContent: Prisma.InputJsonValue
) {
  const document = await prisma.document.findFirst({
    where: {
      id: documentId,
      OR: [
        { ownerId: userId },
        {
          members: {
            some: {
              userId,
            },
          },
        },
      ],
    },
  });

  if (!document) {
    throw new Error("Access denied.");
  }

  return prisma.conflict.create({
    data: {
      documentId,
      localContent,
      remoteContent,
    },
  });
}

// ===============================
// Get Conflicts
// ===============================

export async function getConflicts(
  documentId: string,
  userId: string
) {
  const document = await prisma.document.findFirst({
    where: {
      id: documentId,
      OR: [
        { ownerId: userId },
        {
          members: {
            some: {
              userId,
            },
          },
        },
      ],
    },
  });

  if (!document) {
    throw new Error("Access denied.");
  }

  return prisma.conflict.findMany({
    where: {
      documentId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// ===============================
// Resolve Conflict
// ===============================

export async function resolveConflict(
  conflictId: string,
  userId: string
) {
  const conflict = await prisma.conflict.findFirst({
    where: {
      id: conflictId,
      document: {
        ownerId: userId,
      },
    },
  });

  if (!conflict) {
    throw new Error("Conflict not found.");
  }

  return prisma.conflict.update({
    where: {
      id: conflictId,
    },
    data: {
      resolved: true,
    },
  });
}