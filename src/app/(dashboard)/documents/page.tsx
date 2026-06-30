"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Clock3, Plus } from "lucide-react";
import { api } from "@/src/lib/api";

interface Document {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    try {
      setLoading(true);

      const { data } = await api.get("/documents");

      setDocuments(data.documents ?? data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createDocument() {
    try {
      const { data } = await api.post("/documents", {
        title: "Untitled Document",
        content: "",
      });

      window.location.href = `/documents/${data.document.id}`;
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) {
    return (
      <div className="flex h-72 items-center justify-center">
        Loading documents...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold">
            Documents
          </h1>

          <p className="mt-2 text-zinc-400">
            Create and manage your documents.
          </p>
        </div>

        <button
          onClick={createDocument}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 px-5 py-3 font-semibold"
        >
          <Plus size={18} />
          New Document
        </button>

      </div>

      {documents.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/10 p-16 text-center">

          <FileText
            className="mx-auto mb-4 text-zinc-500"
            size={48}
          />

          <h2 className="text-xl font-semibold">
            No documents found
          </h2>

          <p className="mt-2 text-zinc-500">
            Create your first collaborative document.
          </p>

        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {documents.map((doc) => (
            <Link
              key={doc.id}
              href={`/documents/${doc.id}`}
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-violet-500/40 hover:bg-white/10"
            >
              <div className="flex items-center gap-3">

                <FileText className="text-violet-400" />

                <h2 className="truncate text-lg font-semibold">
                  {doc.title || "Untitled"}
                </h2>

              </div>

              <p className="mt-4 line-clamp-3 text-sm text-zinc-400">
                {doc.content
                  ? doc.content.replace(/<[^>]*>/g, "").slice(0, 120)
                  : "Empty document"}
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm text-zinc-500">

                <Clock3 size={15} />

                {new Date(doc.updatedAt).toLocaleString()}

              </div>

            </Link>
          ))}

        </div>
      )}
    </div>
  );
}