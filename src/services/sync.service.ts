import { prisma } from "@/src/config/prisma";
import { Prisma, SyncOperationType } from "@prisma/client";
import { mergeDocument } from "@/src/services/merge.service";


const MAX_DOCUMENT_SIZE = 2 * 1024 * 1024; 
const MAX_TITLE_LENGTH = 200;


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

  const currentDocument =
    await prisma.document.findUnique({
      where: {
        id: documentId,
      },
    });

  if (!currentDocument) {
    throw new Error("Document not found.");
  }

  // ---------------------------------
  // Parse Payload
  // ---------------------------------

  const incoming = payload as {
    title: string;
    content: string;
  };

  // ---------------------------------
  // Payload Validation
  // ---------------------------------

  if (
    typeof incoming.title !== "string" ||
    typeof incoming.content !== "string"
  ) {
    throw new Error("Invalid payload.");
  }

  if (!incoming.title.trim()) {
    throw new Error("Title is required.");
  }

  if (
    incoming.title.length >
    MAX_TITLE_LENGTH
  ) {
    throw new Error(
      "Title exceeds maximum length."
    );
  }

  const contentSize =
    Buffer.byteLength(
      incoming.content,
      "utf8"
    );

  if (
    contentSize >
    MAX_DOCUMENT_SIZE
  ) {
    throw new Error(
      "Document exceeds maximum allowed size (2MB)."
    );
  }

  if (
    baseVersion < 0 ||
    clientVersion < 0
  ) {
    throw new Error(
      "Invalid version number."
    );
  }

  if (
    Number.isNaN(
      clientTimestamp.getTime()
    )
  ) {
    throw new Error(
      "Invalid client timestamp."
    );
  }

  let finalContent =
    incoming.content;

  // ---------------------------------
  // Conflict Detection
  // ---------------------------------

  if (
    baseVersion !==
    currentDocument.version
  ) {
    const serverContent =
      typeof currentDocument.content ===
      "string"
        ? currentDocument.content
        : JSON.stringify(
            currentDocument.content
          );

    let merge;

    try {
      merge = mergeDocument({
        baseContent: serverContent,
        localContent:
          incoming.content,
        remoteContent:
          serverContent,
      });
    } catch {
      throw new Error(
        "Unable to merge document."
      );
    }

    finalContent =
      merge.mergedContent;

    if (merge.conflict) {
      await prisma.conflict.create({
        data: {
          documentId,

          localContent:
            incoming.content as Prisma.InputJsonValue,

          remoteContent:
            (currentDocument.content ??
              Prisma.JsonNull) as
              | Prisma.InputJsonValue
              | typeof Prisma.JsonNull,
        },
      });
    }
  }

  // ---------------------------------
  // Update Document
  // ---------------------------------

  const updatedDocument =
    await prisma.document.update({
      where: {
        id: documentId,
      },
      data: {
        title: incoming.title,
        content:
          finalContent as Prisma.InputJsonValue,
        version: {
          increment: 1,
        },
        lastEditedBy: userId,
      },
    });

  // ---------------------------------
  // Prevent Duplicate Sync Operations
  // ---------------------------------

  const existing =
    await prisma.syncOperation.findFirst({
      where: {
        documentId,
        operationType,
        clientTimestamp,
      },
    });

  if (existing) {
    return {
      operation: existing,
      document: updatedDocument,
    };
  }

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


export async function getPendingOperations(
  documentId: string,
  userId: string
) {
  const document =
    await prisma.document.findFirst({
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

export async function processQueue(
  documentId: string,
  userId: string
) {
  const document =
    await prisma.document.findFirst({
      where: {
        id: documentId,
        ownerId: userId,
      },
    });

  if (!document) {
    throw new Error(
      "Only the owner can process sync."
    );
  }

  const pending =
    await prisma.syncOperation.count({
      where: {
        documentId,
        processed: false,
      },
    });

  if (pending === 0) {
    return {
      success: true,
      message:
        "No pending operations.",
    };
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
    processed: pending,
    message:
      "Queue processed successfully.",
  };
}

export async function createConflict(
  documentId: string,
  userId: string,
  localContent: Prisma.InputJsonValue,
  remoteContent: Prisma.InputJsonValue
) {
  const document =
    await prisma.document.findFirst({
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
              },
            },
          },
        ],
      },
    });

  if (!document) {
    throw new Error("Access denied.");
  }

  // Prevent duplicate unresolved conflicts

  const existing =
    await prisma.conflict.findFirst({
      where: {
        documentId,
        resolved: false,
      },
    });

  if (existing) {
    return existing;
  }

  return prisma.conflict.create({
    data: {
      documentId,
      localContent,
      remoteContent,
    },
  });
}

export async function getConflicts(
  documentId: string,
  userId: string
) {
  const document =
    await prisma.document.findFirst({
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

export async function resolveConflict(
  conflictId: string,
  userId: string
) {
  const conflict =
    await prisma.conflict.findFirst({
      where: {
        id: conflictId,

        document: {
          OR: [
            {
              ownerId: userId,
            },
            {
              members: {
                some: {
                  userId,
                  role: {
                    in: [
                      "OWNER",
                      "EDITOR",
                    ],
                  },
                },
              },
            },
          ],
        },
      },
    });

  if (!conflict) {
    throw new Error(
      "Conflict not found."
    );
  }

  if (conflict.resolved) {
    return conflict;
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