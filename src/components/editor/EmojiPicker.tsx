"use client";

import { Editor } from "@tiptap/react";

const emojis = [
  "😀",
  "😁",
  "😂",
  "😍",
  "🔥",
  "🚀",
  "❤️",
  "👍",
  "🎉",
  "💡",
  "📌",
  "✅",
];

interface Props {
  editor: Editor | null;
}

export default function EmojiPicker({
  editor,
}: Props) {
  if (!editor) return null;

  return (
    <div className="glass-card rounded-3xl p-5">

      <h3 className="mb-4 font-semibold">
        Emoji
      </h3>

      <div className="grid grid-cols-4 gap-2">

        {emojis.map((emoji) => (

          <button
            key={emoji}
            onClick={() =>
              editor.chain().focus().insertContent(emoji).run()
            }
            className="rounded-xl p-3 text-2xl hover:bg-white/10"
          >
            {emoji}
          </button>

        ))}

      </div>

    </div>
  );
}