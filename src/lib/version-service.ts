import { db } from "./db";

export async function createSnapshot(
  documentId: string,
  content: string
) {
  await db.table("versions").add({
    documentId,
    content,
    createdAt: Date.now(),
  });
}

export async function restoreVersion(
  documentId: string,
  content: string
) {
  await db.documents.update(documentId, {
    content,
    updatedAt: Date.now(),
    synced: false,
  });
}