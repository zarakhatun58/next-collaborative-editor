"use client";

import { useEffect } from "react";
import {
  useEditor,
  EditorContent,
  Editor,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

import FloatingToolbar from "./FloatingToolbar";

interface Props {
  content: string;
  onChange: (value: string) => void;
  onEditorReady?: (editor: Editor) => void;
}

export default function DocumentEditor({
  content,
  onChange,
  onEditorReady,
}: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing your document...",
      }),
    ],

    content,

    immediatelyRender: false,

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  /**
   * Give parent access to editor
   */
  useEffect(() => {
    if (editor && onEditorReady) {
      onEditorReady(editor);
    }
  }, [editor, onEditorReady]);

  /**
   * Update editor when content comes
   * from backend
   */
  useEffect(() => {
    if (!editor) return;

    if (editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div className="glass-card overflow-hidden rounded-3xl">

      <EditorContent
        editor={editor}
        className="ProseMirror"
      />

      <FloatingToolbar
        editor={editor}
      />

    </div>
  );
}