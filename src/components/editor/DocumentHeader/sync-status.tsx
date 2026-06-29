"use client";

import {
  Wifi,
  WifiOff,
  RefreshCw,
  CloudCheck,
  AlertTriangle,
} from "lucide-react";

interface Props {
  online: boolean;
  syncing: boolean;
  queued?: number;
  conflict?: boolean;
}

export default function SyncStatus({
  online,
  syncing,
  queued = 0,
  conflict = false,
}: Props) {
  if (!online) {
    return (
      <div className="glass-card flex items-center gap-2 rounded-xl px-4 py-2 text-orange-400">
        <WifiOff size={16} />
        Offline
      </div>
    );
  }

  if (conflict) {
    return (
      <div className="glass-card flex items-center gap-2 rounded-xl px-4 py-2 text-red-400">
        <AlertTriangle size={16} />
        Conflict
      </div>
    );
  }

  if (syncing) {
    return (
      <div className="glass-card flex items-center gap-2 rounded-xl px-4 py-2 text-cyan-400">
        <RefreshCw
          size={16}
          className="animate-spin"
        />
        Syncing...
      </div>
    );
  }

  return (
    <div className="glass-card flex items-center gap-2 rounded-xl px-4 py-2 text-green-400">
      <CloudCheck size={16} />

      Synced

      {queued > 0 && (
        <span className="rounded-full bg-violet-500/20 px-2 py-0.5 text-xs">
          {queued}
        </span>
      )}
    </div>
  );
}