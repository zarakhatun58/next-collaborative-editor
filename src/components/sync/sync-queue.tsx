"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db, QueueItem } from "@/src/lib/db";

export default function SyncQueue() {
  const [queue, setQueue] = useState<QueueItem[]>([]);

  useEffect(() => {
    loadQueue();
  }, []);

  async function loadQueue() {
    const items = await db.syncQueue
      .filter(item => !item.synced)
      .toArray();

    setQueue(items);
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h3 className="mb-5 text-lg font-bold">
        Pending Queue ({queue.length})
      </h3>

      <div className="space-y-3">

        {queue.length === 0 && (
          <div className="text-zinc-400">
            Queue Empty
          </div>
        )}

        {queue.map(item => (
          <motion.div
            key={item.id}
            whileHover={{ x: 4 }}
            className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-3"
          >
            {item.operation} - {item.documentId}
          </motion.div>
        ))}

      </div>
    </div>
  );
}