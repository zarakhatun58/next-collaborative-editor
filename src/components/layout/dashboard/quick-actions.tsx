"use client";

import { motion } from "framer-motion";
import {
  FilePlus,
  Sparkles,
  Users,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { api } from "@/src/lib/api";
import { useState } from "react";

export default function QuickActions() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  async function createDocument() {
    try {
      setLoading(true);

      const { data } =
        await api.post("/documents", {
          title: "Untitled Document",
          content: "",
        });

      router.push(
        `/documents/${data.document.id}`
      );
    } finally {
      setLoading(false);
    }
  }

  function openAI() {
    router.push("/ai");
  }

  function inviteUser() {
    router.push("/documents");
  }

  const actions = [
    {
      title: "New Document",
      icon: FilePlus,
      onClick: createDocument,
    },
    {
      title: "AI Summary",
      icon: Sparkles,
      onClick: openAI,
    },
    {
      title: "Invite User",
      icon: Users,
      onClick: inviteUser,
    },
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-5 text-xl font-bold">
        Quick Actions
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <motion.button
              key={action.title}
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={action.onClick}
              disabled={loading}
              className="cursor-pointer rounded-2xl border border-white/10 bg-black/20 p-5 text-left transition hover:border-violet-500/30 disabled:opacity-50"
            >
              <Icon className="mb-3 h-6 w-6 text-violet-400" />

              <p className="font-medium">
                {loading &&
                action.title ===
                  "New Document"
                  ? "Creating..."
                  : action.title}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}