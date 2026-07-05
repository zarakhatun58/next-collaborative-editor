import { prisma } from "@/src/config/prisma";

export async function getNotifications(
  userId: string
) {
  const documents = await prisma.document.findMany({
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
          name: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 10,
  });

  return documents.map((doc) => ({
    id: doc.id,
    title: doc.title,
    message: `${doc.owner.name} updated "${doc.title}"`,
    createdAt: doc.updatedAt,
    unread: true,
  }));
}