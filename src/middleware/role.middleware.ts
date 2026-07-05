import { prisma } from "@/src/config/prisma";

export type DocumentRole =
  | "OWNER"
  | "EDITOR"
  | "VIEWER";

export async function checkDocumentRole(
  documentId: string,
  userId: string,
  allowedRoles: DocumentRole[]
) {
 
  const document = await prisma.document.findFirst({
    where: {
      id: documentId,
      ownerId: userId,
    },
  });

  if (document) {
    return true;
  }

  const member = await prisma.documentMember.findFirst({
    where: {
      documentId,
      userId,
    },
  });

  if (!member) {
    throw new Error("Access denied");
  }

  if (!allowedRoles.includes(member.role)) {
    throw new Error("Permission denied");
  }

  return true;
}