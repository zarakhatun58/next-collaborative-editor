"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Editor as TiptapEditor } from "@tiptap/react";

import { api } from "@/src/lib/api";

import DocumentHeader from "@/src/components/editor/DocumentHeader/DocumentHeader";
import Toolbar from "@/src/components/editor/toolbar";
import Editor from "@/src/components/editor/editor";
import AIPanel from "@/src/components/editor/ai-panel";
import VersionHistory from "@/src/components/editor/version-history";
import Collaborators from "@/src/components/editor/DocumentHeader/collaborators";
import EditorFooter from "@/src/components/editor/EditorFooter";
import TypingIndicator from "@/src/components/editor/TypingIndicator";
import DocumentInfo from "@/src/components/editor/DocumentInfo";
import SyncStatus from "@/src/components/editor/DocumentHeader/sync-status";

export default function DocumentEditorPage() {
  const params = useParams();
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const documentId = params.id as string;

  const [editor, setEditor] =
    useState<TiptapEditor | null>(null);

  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [saving, setSaving] = useState(false);

  const [online, setOnline] = useState(
    navigator.onLine
  );
const [syncing, setSyncing] = useState(false);
const [queued] = useState(0);
const [conflict] = useState(false);

const [typingUsers] = useState([
  {
    id: "1",
    name: "Rahul",
  },
]);
  const [updatedAt, setUpdatedAt] =
    useState("");

  const loadDocument = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(
        `/documents/${documentId}`
      );

      setTitle(data.document.title);

      setContent(data.document.content);

      setUpdatedAt(data.document.updatedAt);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!documentId) return;

    loadDocument();
  }, [documentId]);

  useEffect(() => {
    const onlineHandler = () => setOnline(true);

    const offlineHandler = () =>
      setOnline(false);

    window.addEventListener(
      "online",
      onlineHandler
    );

    window.addEventListener(
      "offline",
      offlineHandler
    );

    return () => {
      window.removeEventListener(
        "online",
        onlineHandler
      );

      window.removeEventListener(
        "offline",
        offlineHandler
      );
    };
  }, []);

  useEffect(() => {
    if (!documentId) return;

    const timer = setTimeout(async () => {
      try {
        setSaving(true);

        await api.patch(
          `/documents/${documentId}`,
          {
            title,
            content,
          }
        );

        setUpdatedAt(new Date().toISOString());
      } finally {
        setSaving(false);
      }
    }, 1000);

    return () => clearTimeout(timer);

  }, [title, content]);

  if (loading) {
    return (
      <div className="glass-card flex h-[600px] items-center justify-center rounded-3xl">
        Loading document...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <DocumentHeader
        title={title}
        updatedAt={updatedAt}
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
          <SyncStatus
            online={online}
            syncing={syncing}
            queued={queued}
            conflict={conflict}
          />

          <DocumentInfo
            content={content}
          />

          <TypingIndicator
            users={typingUsers}
          />


          <VersionHistory documentId={documentId} />

          <Collaborators />

        </div>

      </div>

      <EditorFooter
        words={0}
        characters={0}
        readingTime={0}
      />

    </div>
  );
}