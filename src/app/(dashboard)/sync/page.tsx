"use client";

import ConflictAlert from "@/src/components/sync/conflict-alert";
import SyncLog from "@/src/components/sync/sync-log";
import SyncQueue from "@/src/components/sync/sync-queue";
import SyncStatus from "@/src/components/sync/sync-status";

export default function SyncPage() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-4xl font-bold">
          Synchronization Center
        </h1>

        <p className="mt-2 text-zinc-400">
          Monitor offline synchronization status.
        </p>
      </div>

      <ConflictAlert />

      <div className="grid gap-6 lg:grid-cols-3">
        <SyncStatus />
        <SyncQueue />
        <SyncLog />
      </div>

    </div>
  );
}