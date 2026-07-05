import { prisma } from "@/src/config/prisma";

export async function getDashboard(userId: string) {
  const [
    totalDocuments,
    ownedDocuments,
    sharedDocuments,
    totalVersions,
    recentDocuments,
  ] = await Promise.all([

    prisma.document.count({
      where: {
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
    }),

    prisma.document.count({
      where: {
        ownerId: userId,
      },
    }),

    prisma.document.count({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
    }),

    prisma.documentVersion.count({
      where: {
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
    }),

    prisma.document.findMany({
      where: {
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

      select: {
        id: true,
        title: true,
        updatedAt: true,
        version: true,
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
      },

      orderBy: {
        updatedAt: "desc",
      },

      take: 5,
    }),

  ]);

  // unique collaborators

  const members = await prisma.documentMember.findMany({
    where: {
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

    select: {
      userId: true,
    },
  });

  const collaborators =
    new Set(
      members.map(
        (m) => m.userId
      )
    ).size;

  return {

    stats: {
      documents: totalDocuments,
      owned: ownedDocuments,
      shared: sharedDocuments,
      collaborators,
      versions: totalVersions,
    },
    recentDocuments,

  };
}