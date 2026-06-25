"use client";

import { motion } from "framer-motion";
import { Wifi, WifiOff, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

export default function SyncStatus() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);

    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);

    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

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

      <p className="mt-4 text-2xl font-bold">
        {online ? "Online" : "Offline"}
      </p>

      <div className="mt-4 flex items-center gap-2 text-zinc-400">
        <RefreshCw size={16} />
        Last Sync: Just Now
      </div>
    </motion.div>
  );
}