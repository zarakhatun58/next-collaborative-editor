"use client";

import { useEffect, useState } from "react";
import { api } from "@/src/lib/api";

import VersionTimeline from "@/src/components/history/version-timeline";
import VersionCompare from "@/src/components/history/version-compare";

interface Document {
  id: string;
  title: string;
}

export default function HistoryPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] =
    useState<Document | null>(null);

  const [versions, setVersions] = useState<any[]>([]);
  const [selectedVersion, setSelectedVersion] =
    useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDocuments();
  }, []);

  useEffect(() => {
    if (selectedDocument) {
      loadVersions(selectedDocument.id);
    }
  }, [selectedDocument]);

  async function loadDocuments() {
    try {
      const { data } = await api.get("/documents");

      const docs = data.documents ?? data;

      setDocuments(docs);

      if (docs.length > 0) {
        setSelectedDocument(docs[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function loadVersions(documentId: string) {
    try {
     const { data } = await api.get(
        `/versions?documentId=${documentId}`
      );

      const items = data.versions ?? data;

      setVersions(items);

      if (items.length > 0) {
        setSelectedVersion(items[0]);
      } else {
        setSelectedVersion(null);
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
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
          reload={() =>
            selectedDocument &&
            loadVersions(selectedDocument.id)
          }
        />

        <VersionCompare
          version={selectedVersion}
        />
      </div>
    </div>
  );
}