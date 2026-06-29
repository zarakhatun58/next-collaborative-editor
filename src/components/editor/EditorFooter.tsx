"use client";

import {
  BookOpen,
  Clock3,
  Type,
} from "lucide-react";

interface Props {
  words: number;
  characters: number;
  readingTime: number;
  saving?: boolean;
}

export default function EditorFooter({
  words,
  characters,
  readingTime,
  saving = false,
}: Props) {
  return (
    <div className="glass-card flex flex-wrap items-center justify-between gap-4 rounded-2xl px-6 py-4 text-sm">

      <div className="flex flex-wrap gap-6">

        <div className="flex items-center gap-2 text-zinc-400">
          <BookOpen size={16} />
          {words} Words
        </div>

        <div className="flex items-center gap-2 text-zinc-400">
          <Type size={16} />
          {characters} Characters
        </div>

        <div className="flex items-center gap-2 text-zinc-400">
          <Clock3 size={16} />
          {readingTime} min read
        </div>

      </div>

      <div
        className={`font-medium ${
          saving ? "text-cyan-400" : "text-green-400"
        }`}
      >
        {saving ? "Saving..." : "Auto Saved"}
      </div>

    </div>
  );
}