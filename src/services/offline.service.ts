import { db } from "@/src/lib/db";

// Save document locally

export async function saveLocalDocument(
  document: {
    id: string;
    title: string;
    content: any;
  }
) {
  await db.documents.put({
    ...document,
    updatedAt: Date.now(),
  });
}

// Read one

export async function getLocalDocument(
  id: string
) {
  return db.documents.get(id);
}

// Read all

export async function getLocalDocuments() {
  return db.documents.toArray();
}

// Delete

export async function deleteLocalDocument(
  id: string
) {
  await db.documents.delete(id);
}

// Add operation to queue

export async function queueOperation(
  operation: "CREATE" | "UPDATE" | "DELETE",
  documentId: string,
  payload: any
) {
  await db.syncQueue.add({
    operation,
    documentId,
    payload,
    synced: false,
    createdAt: Date.now(),
  });
}

// Pending queue

export async function getPendingOperations() {
  return await db.syncQueue
    .filter(item => item.synced === false)
    .toArray();
}

// Mark synced

export async function markSynced(
  id: number
) {
  await db.syncQueue.update(id, {
    synced: true,
  });
}