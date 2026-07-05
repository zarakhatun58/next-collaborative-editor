"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

interface Document {
  id: string;
  title: string;
  version: number;
  updatedAt: string;
  owner: {
    id: string;
    name: string | null;
  };
}

interface Props {
  documents: Document[];
}

function formatTime(date: string) {
  const diff =
    Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60)
    return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24)
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

export default function RecentDocuments({
  documents,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-5 text-xl font-bold">
        Recent Documents
      </h2>

      {documents.length === 0 ? (
        <div className="py-10 text-center text-zinc-500">
          No documents found.
        </div>
      ) : (
        <div className="space-y-3">
          {documents.map((doc) => (
            <Link
              key={doc.id}
              href={`/documents/${doc.id}`}
            >
              <motion.div
                whileHover={{
                  x: 5,
                }}
                className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-black/20 p-4 transition hover:border-violet-500/40"
              >
                <div className="flex items-center gap-3">
                  <FileText className="text-cyan-400" />

                  <div>
                    <p className="font-medium">
                      {doc.title}
                    </p>

                    <p className="text-xs text-zinc-500">
                      Updated {formatTime(doc.updatedAt)}
                    </p>
                  </div>
                </div>

                <div className="text-right text-xs text-zinc-400">
                  <p>
                    v{doc.version}
                  </p>

                  <p>
                    {doc.owner.name ?? "Unknown"}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}