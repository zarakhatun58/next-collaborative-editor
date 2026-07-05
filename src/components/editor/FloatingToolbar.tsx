"use client";

import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  List,
  Heading2,
} from "lucide-react";
import { Save } from "lucide-react";
import { api } from "@/src/lib/api";

interface Props {
  editor: Editor | null;
  documentId: string;
}

export default function FloatingToolbar({ editor, documentId, }: Props) {
  if (!editor) return null;
  async function saveVersion() {
    if (!editor) return;
    try {
      const name =
        prompt("Version name");
      if (!name) return;
      await api.post("/versions", {
        documentId,
        name,
        content: editor.getHTML(),
      });
      alert("Version saved successfully.");
    } catch (error) {
      console.error(error);
      alert("Unable to save version.");
    }
  }
  return (
    <div className="glass-card fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 gap-2 rounded-2xl p-2">

      <button
        onClick={() =>
          editor.chain().focus().toggleBold().run()
        }
        className="rounded-xl p-3 hover:bg-white/10"
      >
        <Bold size={18} />
      </button>

      <button
        onClick={() =>
          editor.chain().focus().toggleItalic().run()
        }
        className="rounded-xl p-3 hover:bg-white/10"
      >
        <Italic size={18} />
      </button>

      <button
        onClick={() =>
          editor.chain().focus().toggleHeading({
            level: 2,
          }).run()
        }
        className="rounded-xl p-3 hover:bg-white/10"
      >
        <Heading2 size={18} />
      </button>

      <button
        onClick={() =>
          editor.chain().focus().toggleBulletList().run()
        }
        className="rounded-xl p-3 hover:bg-white/10"
      >
        <List size={18} />
      </button>
      <button
        onClick={saveVersion}
        className="rounded-xl p-3 hover:bg-white/10"
      >
        <Save size={18} />
      </button>

    </div>
  );
}