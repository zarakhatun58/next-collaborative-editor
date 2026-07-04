"use client";

import { motion } from "framer-motion";
import { Wifi, WifiOff, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

import { db } from "@/src/lib/db";

export default function SyncStatus() {
  const [online, setOnline] = useState(true);
  const [pending, setPending] = useState(0);
  const [lastSync, setLastSync] = useState<string>("Never");

  useEffect(() => {
    setOnline(navigator.onLine);
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    loadStatus();
    const timer = setInterval(loadStatus, 1000);
    return () => {
      clearInterval(timer);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  async function loadStatus() {
    const queue = await db.syncQueue
      .filter((item) => !item.synced)
      .toArray();
    setPending(queue.length);
    const synced = await db.syncQueue
      .filter((item) => item.synced)
      .toArray();

    if (synced.length > 0) {
      const latest = synced.reduce((a, b) =>
        a.createdAt > b.createdAt ? a : b
      );
      setLastSync(
        new Date(latest.createdAt).toLocaleTimeString()
      );
    }
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-3xl border border-white/10 bg-white/5 p-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">
          Sync Status
        </h3>

        {online ? (
          <Wifi className="text-green-500" />
        ) : (
          <WifiOff className="text-red-500" />
        )}
      </div>

      <div className="mt-6 space-y-4">

        <div>
          <p className="text-sm text-zinc-400">
            Network
          </p>

          <p className="text-xl font-bold">
            {online ? "Online" : "Offline"}
          </p>
        </div>

        <div>
          <p className="text-sm text-zinc-400">
            Pending Queue
          </p>

          <p className="text-xl font-bold text-yellow-400">
            {pending}
          </p>
        </div>

        <div className="flex items-center gap-2 text-zinc-400">
          <RefreshCw size={16} />
          <span>
            Last Sync: {lastSync}
          </span>
        </div>

      </div>
    </motion.div>
  );
}