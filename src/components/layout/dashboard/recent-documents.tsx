"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const docs = [
  {
    id: 1,
    title: "Project Proposal",
    updated: "2 min ago",
  },
  {
    id: 2,
    title: "Meeting Notes",
    updated: "15 min ago",
  },
  {
    id: 3,
    title: "Architecture Design",
    updated: "1 hour ago",
  },
];

export default function RecentDocuments() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-5 text-xl font-bold">
        Recent Documents
      </h2>

      <div className="space-y-3">
        {docs.map((doc) => (
          <motion.div
            key={doc.id}
            whileHover={{
              x: 5,
            }}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 p-4"
          >
            <div className="flex items-center gap-3">
              <FileText className="text-cyan-400" />

              <div>
                <p className="font-medium">
                  {doc.title}
                </p>

                <p className="text-xs text-zinc-500">
                  Updated {doc.updated}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}