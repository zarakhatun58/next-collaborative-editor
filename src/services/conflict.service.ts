import { prisma } from "@/src/config/prisma";
import { Prisma } from "@prisma/client";

export async function createConflict(
  documentId: string,
  localContent: any,
  remoteContent: any
) {
  return prisma.conflict.create({
    data: {
      documentId,
      localContent: localContent as Prisma.InputJsonValue,
      remoteContent: remoteContent as Prisma.InputJsonValue,
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
    throw new Error("Access denied");
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

export async function resolveConflict(
  conflictId: string,
  userId: string,
  content: any
) {
  const conflict =
    await prisma.conflict.findUnique({
      where: {
        id: conflictId,
      },
      include: {
        document: true,
      },
    });

  if (!conflict) {
    throw new Error("Conflict not found");
  }

  const allowed =
    conflict.document.ownerId === userId ||
    (
      await prisma.documentMember.findFirst({
        where: {
          documentId: conflict.documentId,
          userId,
          role: {
            in: ["OWNER", "EDITOR"],
          },
        },
      })
    );

  if (!allowed) {
    throw new Error("Permission denied");
  }

  await prisma.document.update({
    where: {
      id: conflict.documentId,
    },
    data: {
      content: content as Prisma.InputJsonValue,
      lastEditedBy: userId,
    },
  });

  return prisma.conflict.update({
    where: {
      id: conflictId,
    },
    data: {
      resolved: true,
    },
  });
}

export async function deleteConflict(
  conflictId: string
) {
  return prisma.conflict.delete({
    where: {
      id: conflictId,
    },
  });
}