"use client";

import { motion } from "framer-motion";
import { Clock, RotateCcw } from "lucide-react";

const versions = [
  {
    id: 1,
    version: "v1.0",
    author: "Jahanara",
    time: "2 hours ago",
  },
  {
    id: 2,
    version: "v1.1",
    author: "Rahul",
    time: "1 hour ago",
  },
  {
    id: 3,
    version: "v1.2",
    author: "Amit",
    time: "15 min ago",
  },
];

export default function VersionTimeline() {
  return (
    <div className="space-y-4">
      {versions.map((version, index) => (
        <motion.div
          key={version.id}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg">
                {version.version}
              </h3>

              <p className="mt-2 text-zinc-400">
                Edited by {version.author}
              </p>

              <div className="mt-2 flex items-center gap-2 text-sm text-zinc-500">
                <Clock size={14} />
                {version.time}
              </div>
            </div>

            <button className="flex items-center gap-2 rounded-xl border border-violet-500/30 px-4 py-2 text-sm hover:bg-violet-500/10">
              <RotateCcw size={16} />
              Restore
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}