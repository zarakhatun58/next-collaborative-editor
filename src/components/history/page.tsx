"use client";

import { useEffect, useState } from "react";
import { api } from "@/src/lib/api";
import { useParams } from "next/navigation";
import VersionCompare from "./version-compare";
import VersionTimeline from "./version-timeline";

export default function HistoryPage() {
  const params = useParams();
  const documentId = params.id as string;

  const [versions, setVersions] = useState<any[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<any>(null);

  async function loadVersions() {
    try {
      const { data } = await api.get(
        `/versions?documentId=${documentId}`
      );

      setVersions(data);

      if (data.length) {
        setSelectedVersion(data[0]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadVersions();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Version History
        </h1>

        <p className="mt-2 text-zinc-400">
          Restore any previous version safely.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
        <VersionTimeline
          versions={versions}
          selected={selectedVersion}
          onSelect={setSelectedVersion}
          reload={loadVersions}
        />

        <VersionCompare
          version={selectedVersion}
          onRestore={loadVersions}
        />
      </div>
    </div>
  );
}