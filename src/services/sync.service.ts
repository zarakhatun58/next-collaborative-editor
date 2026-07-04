import { prisma } from "@/src/config/prisma";
import { Prisma, SyncOperationType } from "@prisma/client";
import { mergeDocument } from "@/src/services/merge.service";
// ===============================
// Create Sync Operation
// ===============================

export async function createSyncOperation(
  documentId: string,
  userId: string,
  operationType: SyncOperationType,
  payload: Prisma.InputJsonValue,
  baseVersion: number,
  clientVersion: number,
  clientTimestamp: Date
) {
  // ---------------------------------
  // Permission
  // ---------------------------------

  const document = await prisma.document.findFirst({
    where: {
      id: documentId,
      OR: [
        {
          ownerId: userId,
        },
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

  // ---------------------------------
  // Current document
  // ---------------------------------

  const currentDocument = await prisma.document.findUnique({
    where: {
      id: documentId,
    },
  });

  if (!currentDocument) {
    throw new Error("Document not found.");
  }

  const incoming = payload as {
    title: string;
    content: string;
  };

  let finalContent = incoming.content;

  // ---------------------------------
  // Conflict Detection
  // ---------------------------------

  if (baseVersion !== currentDocument.version) {

    const serverContent =
      typeof currentDocument.content === "string"
        ? currentDocument.content
        : JSON.stringify(currentDocument.content);

    const merge = mergeDocument({
      baseContent: serverContent,
      localContent: incoming.content,
      remoteContent: serverContent,
    });

    finalContent = merge.mergedContent;

    if (merge.conflict) {

      await prisma.conflict.create({
        data: {
          documentId,

          localContent:
            incoming.content as Prisma.InputJsonValue,

          remoteContent:
            (currentDocument.content ??
              Prisma.JsonNull) as Prisma.InputJsonValue | typeof Prisma.JsonNull,
        },
      });

    }

  }

  // ---------------------------------
  // Update document
  // ---------------------------------

  const updatedDocument =
    await prisma.document.update({
      where: {
        id: documentId,
      },
      data: {
        title: incoming.title,
        content: finalContent as Prisma.InputJsonValue,
        version: {
          increment: 1,
        },
        lastEditedBy: userId,
      },
    });

  // ---------------------------------
  // Save Sync Operation
  // ---------------------------------

  const operation =
    await prisma.syncOperation.create({
      data: {
        documentId,
        operationType,
        payload,
        clientTimestamp,
        processed: true,
        serverTimestamp: new Date(),
      },
    });

  return {
    operation,
    document: updatedDocument,
  };
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
// Get All Conflicts
// ===============================

export async function getAllConflicts(
  userId: string
) {
  return prisma.conflict.findMany({
    where: {
      resolved: false,
      document: {
        OR: [
          {
            ownerId: userId,
          },
          {
            members: {
              some: {
                userId,
              },
            },
          },
        ],
      },
    },
    include: {
      document: {
        select: {
          id: true,
          title: true,
        },
      },
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