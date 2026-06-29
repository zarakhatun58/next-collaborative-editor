"use client";

import { useState } from "react";

import {
  Sparkles,
  Wand2,
  FileText,
  Languages,
  BookOpen,
  List,
  Loader2,
} from "lucide-react";

import { callAI } from "@/src/lib/ai";

interface Props {
  editor: any;
}

export default function AIPanel({
  editor,
}: Props) {
  const [loading, setLoading] =
    useState<string | null>(null);
  const [message, setMessage] = useState("");
  async function run(endpoint: string) {
    if (!editor) return;

    const text = editor.getText();

    if (!text.trim()) {
      setMessage("Please write something first.");
      return;
    }

    try {
      setLoading(endpoint);
      setMessage("");

      const data = await callAI(endpoint, text);

      editor.commands.setContent(data.result);

      setMessage("✅ AI completed successfully.");

    } catch (error) {
      console.error(error);

      setMessage("❌ AI request failed.");
    } finally {
      setLoading(null);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }

  const Item = ({
    icon: Icon,
    title,
    endpoint,
  }: any) => (
    <button
      onClick={() => run(endpoint)}
      disabled={loading !== null}
      className="
      flex
      w-full
      items-center
      gap-3
      rounded-xl
      border
      border-white/10
      bg-white/5
      px-4
      py-3
      transition
      hover:bg-white/10
      disabled:opacity-60
      "
    >
      {loading === endpoint ? (
        <Loader2
          size={18}
          className="animate-spin"
        />
      ) : (
        <Icon size={18} />
      )}

      <span>{title}</span>
    </button>
  );

  return (
    <div className="glass-card rounded-3xl p-5">

      <h2 className="mb-5 flex items-center gap-2 text-lg font-bold">

        <Sparkles className="text-violet-400" />

        AI Assistant

      </h2>
      {message && (
        <div
          className={`mb-4 rounded-xl border p-3 text-sm ${message.includes("❌")
              ? "border-red-500/30 bg-red-500/10 text-red-300"
              : "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
            }`}
        >
          {message}
        </div>
      )}
      <div className="space-y-3">

        <Item
          icon={FileText}
          title="Summarize"
          endpoint="summarize"
        />

        <Item
          icon={Wand2}
          title="Rewrite"
          endpoint="rewrite"
        />

        <Item
          icon={Sparkles}
          title="Grammar Fix"
          endpoint="grammar"
        />

        <Item
          icon={BookOpen}
          title="Improve Writing"
          endpoint="improve"
        />

        <Item
          icon={Languages}
          title="Translate"
          endpoint="translate"
        />

        <Item
          icon={List}
          title="Bullet Points"
          endpoint="bullets"
        />

      </div>

    </div>
  );
}