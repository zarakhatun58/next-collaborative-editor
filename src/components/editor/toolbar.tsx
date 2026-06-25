"use client";

import {
  Bold,
  Italic,
  Heading1,
  List,
} from "lucide-react";

interface Props {
  editor: any;
}

export default function Toolbar({
  editor,
}: Props) {
  if (!editor) return null;

  return (
    <div className="mb-4 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/5 p-3">
      <button
        onClick={() =>
          editor.chain().focus().toggleBold().run()
        }
        className="rounded-lg p-2 hover:bg-white/10"
      >
        <Bold size={18} />
      </button>

      <button
        onClick={() =>
          editor.chain().focus().toggleItalic().run()
        }
        className="rounded-lg p-2 hover:bg-white/10"
      >
        <Italic size={18} />
      </button>

      <button
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({ level: 1 })
            .run()
        }
        className="rounded-lg p-2 hover:bg-white/10"
      >
        <Heading1 size={18} />
      </button>

      <button
        onClick={() =>
          editor.chain().focus().toggleBulletList().run()
        }
        className="rounded-lg p-2 hover:bg-white/10"
      >
        <List size={18} />
      </button>
    </div>
  );
}