"use client";

import { useState } from "react";
import { api } from "@/src/lib/api";
import { MessageCircle, Send } from "lucide-react";

interface Props {
  documentId: string;
  onAdded?: () => void;
}

export default function CommentPanel({
  documentId,
  onAdded,
}: Props) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function addComment() {
    if (!comment.trim()) return;

    try {
      setLoading(true);

      await api.post(`/documents/${documentId}/comments`, {
        text: comment,
      });

      setComment("");

      onAdded?.();

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass-card rounded-3xl p-5">

      <div className="mb-5 flex items-center gap-2">

        <MessageCircle size={18} />

        <h3 className="font-semibold">
          Add Comment
        </h3>

      </div>

      <textarea
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none"
        placeholder="Write a comment..."
      />

      <button
        disabled={loading}
        onClick={addComment}
        className="btn-gradient mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3"
      >
        <Send size={18} />

        {loading ? "Posting..." : "Post Comment"}

      </button>

    </div>
  );
}