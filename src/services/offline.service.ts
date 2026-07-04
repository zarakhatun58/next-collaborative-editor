
import { db } from "@/src/lib/db";

import type {
  LocalDocument,
  QueueItem,
} from "@/src/lib/db";

// ==============================
// Save Local Document
// ==============================

export async function saveLocalDocument(
  document: Omit<LocalDocument, "updatedAt">
) {
  await db.documents.put({
    ...document,
    updatedAt: Date.now(),
  });
}

// ==============================
// Get Local Document
// ==============================

export async function getLocalDocument(
  id: string
) {
  return db.documents.get(id);
}

// ==============================
// Get All Local Documents
// ==============================

export async function getLocalDocuments() {
  return db.documents
    .orderBy("updatedAt")
    .reverse()
    .toArray();
}

// ==============================
// Delete Local Document
// ==============================

export async function deleteLocalDocument(
  id: string
) {
  await db.documents.delete(id);
}

// ==============================
// Queue Operation
// ==============================

export async function queueOperation({
  documentId,
  operation,
  payload,
  baseVersion,
  clientVersion,
}: Omit<QueueItem, "id" | "createdAt" | "retryCount" | "synced">) {
  return db.syncQueue.add({
    documentId,
    operation,
    payload,
    baseVersion,
    clientVersion,
    retryCount: 0,
    synced: false,
    createdAt: Date.now(),
  });
}

// ==============================
// Pending Queue
// ==============================

export async function getPendingOperations() {
  return db.syncQueue
    .filter(item => !item.synced)
    .toArray();
}

// ==============================
// Mark Synced
// ==============================

export async function markSynced(
  id: number
) {
  return db.syncQueue.update(id, {
    synced: true,
  });
}

// ==============================
// Increase Retry Count
// ==============================

export async function incrementRetry(
  id: number
) {
  const item = await db.syncQueue.get(id);

  if (!item) return;

  return db.syncQueue.update(id, {
    retryCount: item.retryCount + 1,
  });
}

// ==============================
// Remove Synced Queue
// ==============================

export async function clearSyncedOperations() {
  const synced = await db.syncQueue
    .filter(item => item.synced)
    .toArray();

  for (const item of synced) {
    if (item.id) {
      await db.syncQueue.delete(item.id);
    }
  }
}

// ==============================
// Queue Count
// ==============================

export async function getQueueCount() {
 const pending = await db.syncQueue
  .filter(item => !item.synced)
  .toArray();

return pending.length;
}

