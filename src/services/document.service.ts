import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";

export async function createDocument(
  title: string,
  content: string,
  ownerId: string
) {
  console.log({
    title,
    content,
    ownerId,
  });

  return prisma.document.create({
    data: {
      title,
      content,
      ownerId,
    },
  });
}

export async function getDocuments(
  userId: string,
  search?: string
) {
  return prisma.document.findMany({
    where: {
      AND: [
        {
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

        search
          ? {
              title: {
                contains: search,
                mode: "insensitive",
              },
            }
          : {},
      ],
    },

    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },

      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },

    orderBy: {
      updatedAt: "desc",
    },
  });
}

export async function getDocumentById(
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
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

  if (!document) {
    throw new Error("Document not found");
  }

  return document;
}

export async function updateDocument(
  documentId: string,
  data: {
    title?: string;
    content?: string;
  },
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
    throw new Error(
      "You don't have permission to edit this document."
    );
  }

  // -----------------------------
  // SAVE CURRENT VERSION
  // -----------------------------
await prisma.documentVersion.create({
  data: {
    documentId,
    createdById: userId,
    name: `Version ${document.version}`,
    content:
      (document.content ??
        Prisma.JsonNull) as
        | Prisma.InputJsonValue
        | typeof Prisma.JsonNull,
  },
});

  // -----------------------------
  // UPDATE DOCUMENT
  // -----------------------------
const updatedDocument =
  await prisma.document.update({
    where: {
      id: documentId,
    },
    data: {
      ...(data.title !== undefined && {
        title: data.title,
      }),
      ...(data.content !== undefined && {
        content: data.content,
      }),
      version: {
        increment: 1,
      },
      lastEditedBy: userId,
    },
  });

await prisma.documentVersion.create({
  data: {
    documentId,
    createdById: userId,
    name: `Version ${updatedDocument.version}`,
    content:
      (updatedDocument.content ??
        Prisma.JsonNull) as
        | Prisma.InputJsonValue
        | typeof Prisma.JsonNull,
  },
});

return updatedDocument;
}

export async function deleteDocument(
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
      "Only the owner can delete this document."
    );
  }

  await prisma.document.delete({
    where: {
      id: documentId,
    },
  });

  return {
    success: true,
    message: "Document deleted successfully.",
  };
}

export async function shareDocument(
  documentId: string,
  ownerId: string,
  userEmail: string,
  role: "EDITOR" | "VIEWER"
) {
  const owner =
    await prisma.document.findFirst({
      where: {
        id: documentId,
        ownerId,
      },
    });

  if (!owner) {
    throw new Error(
      "Only the owner can share this document."
    );
  }

  const user =
    await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

  if (!user) {
    throw new Error("User not found.");
  }

  return prisma.documentMember.upsert({
    where: {
      documentId_userId: {
        documentId,
        userId: user.id,
      },
    },
    update: {
      role,
    },
    create: {
      documentId,
      userId: user.id,
      role,
    },
  });
}

export async function getmembers(
  documentId: string
) {
  return prisma.documentMember.findMany({
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
  });
}