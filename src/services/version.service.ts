import { prisma } from "@/src/config/prisma";
import { Prisma } from "@prisma/client";

// ===============================
// Create Version Snapshot
// ===============================

export async function createVersion(
  documentId: string,
  userId: string,
  name: string | undefined,
  content: any
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
    throw new Error(
      "You don't have permission to create a version."
    );
  }

  return prisma.documentVersion.create({
    data: {
      documentId,
      createdById: userId,
      name,
      content,
    },
  });
}

// ===============================
// Get All Versions
// ===============================

export async function getVersions(
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

  return prisma.documentVersion.findMany({
    where: {
      documentId,
    },
    include: {
      createdBy: {
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

// ===============================
// Get One Version
// ===============================

export async function getVersionById(
  versionId: string,
  userId: string
) {
  const version = await prisma.documentVersion.findFirst({
    where: {
      id: versionId,
      document: {
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
    },
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (!version) {
    throw new Error("Version not found.");
  }

  return version;
}

// ===============================
// Restore Version
// ===============================

export async function restoreVersion(
  versionId: string,
  userId: string
) {
  const version = await prisma.documentVersion.findFirst({
    where: {
      id: versionId,
      document: {
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
    },
  });

  if (!version) {
    throw new Error(
      "Version not found or access denied."
    );
  }

  return prisma.document.update({
  where: {
    id: version.documentId,
  },
  data: {
    content: version.content as Prisma.InputJsonValue,
    lastEditedBy: userId,
  },
});
}

// ===============================
// Delete Version
// ===============================

export async function deleteVersion(
  versionId: string,
  userId: string
) {
  const version = await prisma.documentVersion.findFirst({
    where: {
      id: versionId,
      document: {
        ownerId: userId,
      },
    },
  });

  if (!version) {
    throw new Error(
      "Only the owner can delete a version."
    );
  }

  await prisma.documentVersion.delete({
    where: {
      id: versionId,
    },
  });

  return {
    success: true,
    message: "Version deleted successfully.",
  };
}