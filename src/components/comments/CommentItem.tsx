"use client";

import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface Comment {
  id: string;
  message: string;
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    email: string;
  };
}

interface Props {
  comment: Comment;
  currentUserId: string;
  onDelete: (id: string) => void;
}

export default function CommentItem({
  comment,
  currentUserId,
  onDelete,
}: Props) {
  const canDelete =
    comment.user.id === currentUserId;

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
      }}
      className="rounded-2xl border border-white/10 bg-black/20 p-4"
    >
      <div className="flex items-start justify-between">

        <div>

          <p className="font-semibold">
            {comment.user.name ??
              comment.user.email}
          </p>

          <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-300">
            {comment.message}
          </p>

          <p className="mt-3 text-xs text-zinc-500">
            {new Date(
              comment.createdAt
            ).toLocaleString()}
          </p>

        </div>

        {canDelete && (
          <button
            onClick={() =>
              onDelete(comment.id)
            }
            className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10"
          >
            <Trash2 size={16} />
          </button>
        )}

      </div>
    </motion.div>
  );
}