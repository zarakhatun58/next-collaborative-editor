"use client";

import { useEffect, useState } from "react";
import { api } from "@/src/lib/api";
import {
  History,
  RotateCcw,
  Clock3,
  Loader2,
  User,
} from "lucide-react";

interface Version {
  id: string;
  version: number;
  createdAt: string;
  createdBy?: {
    name: string;
  };
}

interface Props {
  documentId: string;
}

export default function VersionHistory({
  documentId,
}: Props) {
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVersions();
  }, [documentId]);

  async function loadVersions() {
    try {
      const { data } = await api.get(
        `/versions/${documentId}`
      );

      setVersions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function restoreVersion(id: string) {
    try {
      await api.post(
        `/versions/${id}/restore`
      );

      loadVersions();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="glass-card rounded-3xl p-6">

      <div className="mb-6 flex items-center gap-3">
        <History className="text-violet-400" />
        <h2 className="text-xl font-bold">
          Version History
        </h2>
      </div>

      {loading && (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin text-violet-400" />
        </div>
      )}

      {!loading && versions.length === 0 && (
        <div className="rounded-xl border border-dashed border-white/10 py-10 text-center text-zinc-500">
          No versions available.
        </div>
      )}

      <div className="space-y-4">

        {versions.map((version) => (

          <div
            key={version.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-violet-500/30 hover:bg-white/10"
          >

            <div className="flex items-start justify-between">

              <div>

                <div className="flex items-center gap-2">

                  <Clock3
                    size={16}
                    className="text-cyan-400"
                  />

                  <span className="font-semibold">
                    Version {version.version}
                  </span>

                </div>

                <div className="mt-3 flex items-center gap-2 text-sm text-zinc-400">

                  <User size={15} />

                  {version.createdBy?.name ?? "Unknown"}

                </div>

                <p className="mt-2 text-xs text-zinc-500">
                  {new Date(
                    version.createdAt
                  ).toLocaleString()}
                </p>

              </div>

              <button
                onClick={() =>
                  restoreVersion(version.id)
                }
                className="rounded-xl border border-violet-500/30 px-4 py-2 text-sm text-violet-300 transition hover:bg-violet-500/20"
              >
                <div className="flex items-center gap-2">
                  <RotateCcw size={15} />
                  Restore
                </div>
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}