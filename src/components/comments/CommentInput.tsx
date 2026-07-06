"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  onSend: (message: string) => Promise<void>;
}

export default function CommentInput({
  onSend,
}: Props) {
  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit() {
    if (!message.trim()) return;

    try {
      setLoading(true);

      await onSend(message);

      setMessage("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">

      <textarea
        rows={3}
        value={message}
        placeholder="Write a comment..."
        onChange={(e) =>
          setMessage(e.target.value)
        }
        className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 p-4 text-sm outline-none transition focus:border-violet-500"
      />

      <div className="flex justify-end">

        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.97,
          }}
          disabled={
            loading ||
            !message.trim()
          }
          onClick={handleSubmit}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3 font-medium transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send size={16} />

          {loading
            ? "Sending..."
            : "Send"}
        </motion.button>

      </div>

    </div>
  );
}