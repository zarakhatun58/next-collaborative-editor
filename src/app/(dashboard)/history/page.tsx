"use client";

import { useEffect, useState } from "react";
import { api } from "@/src/lib/api";
import { useParams } from "next/navigation";
import VersionTimeline from "@/src/components/history/version-timeline";
import VersionCompare from "@/src/components/history/version-compare";

export default function HistoryPage() {
  const [versions, setVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState<any>(null);
const params = useParams();
  const documentId = params.id as string;


  useEffect(() => {
    loadVersions();
  }, []);

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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Version History
        </h1>

        <p className="mt-2 text-zinc-400">
          Restore any previous version.
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
        />
      </div>
    </div>
  );
}