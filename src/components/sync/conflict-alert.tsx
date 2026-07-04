"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { api } from "@/src/lib/api";

interface Conflict {
  id: string;
  documentId: string;
  resolved: boolean;
  createdAt: string;
}



export default function ConflictAlert() {
  const [conflicts, setConflicts] = useState<Conflict[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConflicts();

    const timer = setInterval(loadConflicts, 5000);

    return () => clearInterval(timer);
  }, []);

  async function loadConflicts() {
    try {
     const { data } = await api.get("/sync/conflict");
      setConflicts(data.conflicts ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function resolveConflict(id: string) {
    try {
      await api.patch("/sync/conflict", {
        conflictId: id,
      });

      loadConflicts();
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) return null;

  const unresolved = conflicts.filter(
    (c) => !c.resolved
  );

  if (unresolved.length === 0) {
    return (
      <div className="rounded-3xl border border-green-500/20 bg-green-500/5 p-5">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="text-green-400" />

          <div>
            <h3 className="font-semibold text-green-400">
              No Conflicts
            </h3>

            <p className="mt-1 text-sm text-zinc-400">
              Local and remote documents are synchronized.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-orange-500/20 bg-orange-500/5 p-5">
      <div className="flex items-start gap-3">
        <AlertTriangle className="text-orange-400" />

        <div className="flex-1">
          <h3 className="font-semibold text-orange-400">
            {unresolved.length} Conflict
            {unresolved.length > 1 ? "s" : ""} Detected
          </h3>

          <div className="mt-4 space-y-3">

            {unresolved.map((conflict) => (
              <div
                key={conflict.id}
                className="rounded-xl border border-orange-500/20 p-3"
              >
                <p className="text-xs text-zinc-400">
                  {new Date(
                    conflict.createdAt
                  ).toLocaleString()}
                </p>

                <button
                  onClick={() =>
                    resolveConflict(conflict.id)
                  }
                  className="mt-3 rounded-lg bg-orange-500 px-3 py-2 text-sm font-medium text-white hover:bg-orange-600"
                >
                  Mark Resolved
                </button>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}