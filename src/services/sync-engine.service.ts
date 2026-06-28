import axios from "axios";

import {
  getPendingOperations,
  markSynced,
} from "./offline.service";

const API =
  process.env.NEXT_PUBLIC_API_URL ??
  "/api";

export async function syncQueue(
  token: string
) {
  const queue =
    await getPendingOperations();

  for (const item of queue) {
    try {
      await axios.post(
        `${API}/sync`,
        {
          documentId:
            item.documentId,

          operation:
            item.operation,

          payload:
            item.payload,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (item.id !== undefined) {
        await markSynced(item.id);
      }
    } catch (error) {
      console.error(
        "Sync failed",
        error
      );
    }
  }
}