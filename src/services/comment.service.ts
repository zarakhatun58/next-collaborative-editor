import { prisma } from "@/src/config/prisma";
import { Prisma } from "@prisma/client";

export async function createComment(
  documentId: string,
  userId: string,
  message: string
) {
  // Permission check
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
            },
          },
        },
      ],
    },
  });

  if (!document) {
    throw new Error(
      "You don't have permission to comment on this document."
    );
  }

  return prisma.comment.create({
    data: {
      documentId,
      userId,
      message,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

export async function getComments(
  documentId: string,
  userId: string
) {
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
            },
          },
        },
      ],
    },
  });

  if (!document) {
    throw new Error("Access denied.");
  }

  return prisma.comment.findMany({
    where: {
      documentId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function deleteComment(
  commentId: string,
  userId: string
) {
  const comment = await prisma.comment.findFirst({
    where: {
      id: commentId,
      userId,
    },
  });

  if (!comment) {
    throw new Error(
      "You can only delete your own comments."
    );
  }

  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  return {
    success: true,
    message: "Comment deleted successfully.",
  };
}