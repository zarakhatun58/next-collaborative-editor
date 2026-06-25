"use client";

import { motion } from "framer-motion";

const queue = [
  "Document update",
  "Title change",
  "Version snapshot",
];

export default function SyncQueue() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h3 className="mb-5 text-lg font-bold">
        Pending Queue
      </h3>

      <div className="space-y-3">
        {queue.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ x: 4 }}
            className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-3"
          >
            {item}
          </motion.div>
        ))}
      </div>
    </div>
  );
}