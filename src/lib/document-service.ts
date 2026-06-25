import { db } from "./db";

export async function createDocument() {
  const document = {
    id: crypto.randomUUID(),
    title: "Untitled Document",
    content: "",
    updatedAt: Date.now(),
    synced: false,
  };

  await db.documents.add(document);

  await db.syncQueue.add({
    documentId: document.id,
    type: "CREATE",
    payload: document,
    timestamp: Date.now(),
  });

  return document;
}

export async function saveDocument(
  id: string,
  content: string
) {
  await db.documents.update(id, {
    content,
    updatedAt: Date.now(),
    synced: false,
  });

  await db.syncQueue.add({
    documentId: id,
    type: "UPDATE",
    payload: { content },
    timestamp: Date.now(),
  });
}