"use client";

import { Pencil } from "lucide-react";

interface User {
  id: string;
  typing: boolean;
}

interface Props {
  users: User[];
}

export default function TypingIndicator({
  users,
}: Props) {

  const active = users.filter(
    (u) => u.typing
  );

  if (active.length === 0) {
    return null;
  }

  return (
    <div className="glass-card flex items-center gap-3 rounded-2xl px-4 py-3">

      <Pencil
        size={16}
        className="animate-pulse text-violet-400"
      />

      <span className="text-sm text-zinc-300">

        {active.length === 1
          ? "Someone is typing..."
          : `${active.length} people are typing...`}

      </span>

    </div>
  );
}