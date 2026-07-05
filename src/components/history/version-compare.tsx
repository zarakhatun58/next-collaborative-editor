"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { api } from "@/src/lib/api";

interface Props {
  version: any;
  onRestore?: () => void;
}


export default function VersionCompare({
  version,
  onRestore,
}: Props) {
  const [loading, setLoading] = useState(false);

  if (!version) {
    return (
      <div className="glass-card rounded-3xl p-8 text-center text-zinc-400">
        No Version Selected
      </div>
    );
  }

  async function restoreVersion() {
    try {
      setLoading(true);

      await api.post(
        `/versions/${version.id}/restore`
      );

      alert("Version restored successfully.");

      onRestore?.();
    } catch (error) {
      console.error(error);
      alert("Unable to restore version.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass-card rounded-3xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {version.name || "Unnamed Version"}
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Created by{" "}
            <span className="font-medium">
              {version.createdBy?.name}
            </span>
          </p>

          <p className="text-xs text-zinc-500">
            {new Date(
              version.createdAt
            ).toLocaleString()}
          </p>
        </div>
        <button
          onClick={restoreVersion}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 transition hover:bg-violet-700 disabled:opacity-50"
        >
          <RotateCcw size={18} />
          {loading
            ? "Restoring..."
            : "Restore Version"}
        </button>
      </div>
      <div
        className="prose prose-invert max-w-none rounded-xl border border-white/10 bg-black/20 p-6"
        dangerouslySetInnerHTML={{
          __html:
            typeof version.content === "string"
              ? version.content
              : "",
        }}
      />
    </div>
  );
}