"use client";

import {
  MessageSquare,
} from "lucide-react";

interface Comment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

interface Props {
  comments: Comment[];
}

export default function Comments({
  comments,
}: Props) {
  return (
    <div className="glass-card rounded-3xl p-5">

      <div className="mb-5 flex items-center gap-2">

        <MessageSquare size={18} />

        <h3 className="font-semibold">
          Comments
        </h3>

      </div>

      <div className="space-y-4">

        {comments.length === 0 && (
          <p className="text-sm text-zinc-500">
            No comments yet.
          </p>
        )}

        {comments.map((comment) => (

          <div
            key={comment.id}
            className="rounded-xl border border-white/10 p-4"
          >

            <div className="mb-2 flex items-center justify-between">

              <span className="font-semibold">
                {comment.author}
              </span>

              <span className="text-xs text-zinc-500">
                {comment.createdAt}
              </span>

            </div>

            <p className="text-sm text-zinc-300">
              {comment.text}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}