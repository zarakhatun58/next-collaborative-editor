"use client";

import { Pencil } from "lucide-react";

interface User {
  id: string;
  name: string;
}

interface Props {
  users: User[];
}

export default function TypingIndicator({
  users,
}: Props) {
  if (!users.length) return null;

  return (
    <div className="glass-card flex items-center gap-3 rounded-2xl px-4 py-3">

      <Pencil
        size={16}
        className="animate-pulse text-violet-400"
      />

      <span className="text-sm text-zinc-300">

        {users.map((u) => u.name).join(", ")}

        {users.length === 1
          ? " is typing..."
          : " are typing..."}

      </span>

    </div>
  );
}