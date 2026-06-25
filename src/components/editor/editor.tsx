"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

export default function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing...",
      }),
    ],
    content: `
      <h1>Untitled Document</h1>
      <p>Start typing here...</p>
    `,
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <EditorContent
        editor={editor}
        className="prose prose-invert max-w-none min-h-[600px] focus:outline-none"
      />
    </div>
  );
}