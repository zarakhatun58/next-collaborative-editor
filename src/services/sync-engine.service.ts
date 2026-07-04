import { api } from "@/src/lib/api";
import { db } from "@/src/lib/db";

export async function syncQueue() {
  if (typeof window === "undefined") return;
  if (!navigator.onLine) return;

  const pending = await db.syncQueue
    .filter(item => !item.synced)
    .toArray();

  for (const item of pending) {
    try {
      // Create sync operation
      await api.post("/sync", {
        documentId: item.documentId,
        operationType: item.operation,
        payload: item.payload,
        baseVersion: item.baseVersion,
        clientVersion: item.clientVersion,
        clientTimestamp: item.createdAt,
      });

      // Process queue on server
      const { data } = await api.post("/sync/process", {
        documentId: item.documentId,
      });

      // Update local document if returned
      if (data.document) {
        await db.documents.put({
          id: data.document.id,
          title: data.document.title,
          content: data.document.content,
          version: data.document.version,
          synced: true,
          updatedAt: Date.now(),
        });
      }

      if (item.id) {
        await db.syncQueue.update(item.id, {
          synced: true,
        });
      }
    } catch (err) {
      console.error("Sync failed", err);
      break;
    }
  }
}