"use client";

import { useEffect, useState } from "react";
import { db, QueueItem } from "@/src/lib/db";

interface LogItem {
  id: number;
  operation: string;
  documentId: string;
  status: string;
  time: string;
}

export default function SyncLog() {
  const [logs, setLogs] = useState<LogItem[]>([]);

  useEffect(() => {
    loadLogs();

    const timer = setInterval(loadLogs, 1000);

    return () => clearInterval(timer);
  }, []);

  async function loadLogs() {
    const queue = await db.syncQueue
      .orderBy("createdAt")
      .reverse()
      .limit(10)
      .toArray();

    const formatted: LogItem[] = queue.map((item: QueueItem) => ({
      id: item.id ?? 0,
      operation: item.operation,
      documentId: item.documentId,
      status: item.synced ? "Synced" : "Pending",
      time: new Date(item.createdAt).toLocaleString(),
    }));

    setLogs(formatted);
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h3 className="mb-5 text-lg font-bold">
        Sync Activity
      </h3>

      <div className="space-y-3">

        {logs.length === 0 && (
          <div className="rounded-xl border border-dashed border-white/10 p-4 text-center text-zinc-500">
            No sync activity
          </div>
        )}

        {logs.map((log) => (
          <div
            key={log.id}
            className="rounded-xl border border-white/10 p-4"
          >
            <div className="flex items-center justify-between">

              <div>

                <div className="font-medium">
                  {log.operation}
                </div>

                <div className="text-xs text-zinc-500 mt-1">
                  {log.documentId}
                </div>

              </div>

              <div
                className={`text-sm font-medium ${
                  log.status === "Synced"
                    ? "text-green-400"
                    : "text-yellow-400"
                }`}
              >
                {log.status}
              </div>

            </div>

            <div className="mt-3 text-xs text-zinc-500">
              {log.time}
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}