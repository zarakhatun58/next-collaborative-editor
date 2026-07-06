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
  documentId: string;
  socket: any;
  onChange: (value: string) => void;
  onEditorReady?: (
    editor: Editor
  ) => void;
}

export default function DocumentEditor({
  content,
  documentId,
  socket,
  onChange,
  onEditorReady,
}: Props) {
  

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder:
          "Start writing your document...",
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate({ editor, transaction }) {
      if (!transaction.docChanged) return;
      const html = editor.getHTML();
      onChange(html);
      socket?.emit("document-update", {
        documentId,
        content: html,
        version: Date.now(),
      });

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
    if (content === "") return;
    if (editor.getHTML() === content) return;
    editor.commands.setContent(content, {
      emitUpdate: false,
    });
  }, [content, editor]);

  useEffect(() => {
    if (!editor) return;
    if (!socket) return;
    const receiveUpdate = (
      data: {
        content: string;
      }
    ) => {

      if (
        editor.getHTML() === data.content
      ) {
        return;
      }

      editor.commands.setContent(
        data.content,
        {
          emitUpdate: false,
        }
      );

    };

    socket.on(
      "receive-update",
      receiveUpdate
    );

    return () => {

      socket.off(
        "receive-update",
        receiveUpdate
      );

    };

  }, [editor, socket]);

  if (!editor) return null;

  return (
    <div className="glass-card overflow-hidden rounded-3xl">

      <EditorContent
        editor={editor}
        className="ProseMirror"
      />

      <FloatingToolbar
        editor={editor}
        documentId={documentId}
      />

    </div>
  );
}