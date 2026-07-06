"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

import { api } from "@/src/lib/api";

import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";

interface Props {
  documentId: string;
}

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

export default function CommentPanel({
  documentId,
}: Props) {
  const [comments, setComments] =
    useState<Comment[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [currentUserId, setCurrentUserId] =
    useState("");

  useEffect(() => {
    loadComments();

    const token =
      localStorage.getItem("token");

    if (token) {
      try {
        const payload = JSON.parse(
          atob(token.split(".")[1])
        );

        setCurrentUserId(
          payload.id || payload.userId
        );
      } catch {}
    }
  }, [documentId]);

  async function loadComments() {
    try {
      setLoading(true);

      const { data } = await api.get(
        `/comments?documentId=${documentId}`
      );

      setComments(
        data.comments ?? data
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createComment(
    message: string
  ) {
    try {
      await api.post("/comments", {
        documentId,
        message,
      });

      loadComments();
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteComment(
    id: string
  ) {
    try {
      await api.delete(
        `/comments/${id}`
      );

      loadComments();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

      <div className="mb-6 flex items-center gap-3">

        <MessageCircle className="text-violet-400" />

        <h2 className="text-xl font-bold">
          Comments
        </h2>

      </div>

      <CommentInput
        onSend={createComment}
      />

      <div className="mt-6 space-y-4">

        {loading ? (
          <div className="py-8 text-center text-zinc-400">
            Loading comments...
          </div>
        ) : comments.length === 0 ? (
          <div className="py-8 text-center text-zinc-500">
            No comments yet.
          </div>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              currentUserId={
                currentUserId
              }
              onDelete={
                deleteComment
              }
            />
          ))
        )}

      </div>

    </div>
  );
}