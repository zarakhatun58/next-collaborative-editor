"use client";

import { useEffect, useState,useMemo } from "react";
import { api } from "@/src/lib/api";
import Toolbar from "@/src/components/editor/toolbar";
import { Editor as TiptapEditor } from "@tiptap/react";
import Editor from "@/src/components/editor/editor";
import AIPanel from "@/src/components/editor/ai-panel";
import EditorFooter from "@/src/components/editor/EditorFooter";
import Collaborators from "@/src/components/editor/DocumentHeader/collaborators";
import DocumentHeader from "@/src/components/editor/DocumentHeader/DocumentHeader";
import VersionHistory from "@/src/components/editor/version-history";
import { useParams } from "next/navigation";

export default function DocumentsPage() {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [online, setOnline] = useState(navigator.onLine);
  const [editor, setEditor] = useState<TiptapEditor | null>(null);
  const params = useParams();
  const documentId = params.id as string;
  useEffect(() => {
    const onlineHandler = () => setOnline(true);
    const offlineHandler = () => setOnline(false);

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);
  useEffect(() => {
  if (!documentId) return;

  async function loadDocument() {
    try {
      setLoading(true);

      const { data } = await api.get(
        `/documents/${documentId}`
      );

      setTitle(data.title ?? "");
      setContent(data.content ?? "");

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  loadDocument();

}, [documentId]);
  useEffect(() => {
  if (!documentId || loading) return;

  const timer = setTimeout(async () => {
    try {
      setSaving(true);

      await api.patch(`/documents/${documentId}`, {
        title,
        content,
      });

    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }, 800);

  return () => clearTimeout(timer);

}, [title, content, documentId, loading]);
const plainText = useMemo(() => {
  return content.replace(/<[^>]*>/g, " ");
}, [content]);

const words = useMemo(() => {
  return plainText
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}, [plainText]);

const characters = plainText.length;

const readingTime = Math.max(
  1,
  Math.ceil(words / 200)
);
  return (
    <div className="space-y-6">

      <DocumentHeader
        title={title}
        updatedAt="2 minutes ago"
        online={online}
        saving={saving}
        collaborators={4}
        onTitleChange={setTitle}
        onVersionHistory={() => { }}
        onAI={() => { }}
      />

      <Toolbar editor={editor} />

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">

        <Editor
          content={content}
          onChange={setContent}
          onEditorReady={setEditor}
        />

        <div className="space-y-6">

          <AIPanel editor={editor} />

          <VersionHistory documentId={documentId} />

          <Collaborators />

        </div>

      </div>
    <EditorFooter
  words={words}
  characters={characters}
  readingTime={readingTime}
  saving={saving}
/>
    </div>
  );
}