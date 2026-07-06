"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Editor as TiptapEditor } from "@tiptap/react";
import Cursor from "@/src/components/editor/Cursor";
import { useRef } from "react";
import { api } from "@/src/lib/api";
import { getSocket } from "@/src/lib/socket-client";
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
import CommentPanel from "@/src/components/comments/CommentPanel";

export default function DocumentEditorPage() {
  const params = useParams();
  const initialized = useRef(false);
  const [loaded, setLoaded] = useState(false);
  const [editor, setEditor] = useState<TiptapEditor | null>(null);
  const [version, setVersion] = useState(1);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const socket = useRef<ReturnType<typeof getSocket> | null>(null);
  const documentId = params.id as string;
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dirty, setDirty] = useState(false);

  const handleContentChange = (html: string) => {
    setContent(html);
    setDirty(true);
  };
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [queued] = useState(0);
  const [conflict] = useState(false);
  const [typingUsers, setTypingUsers] = useState<{ id: string; typing: boolean; }[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<{ id: string; email: string; }[]>([]);
  const [cursors, setCursors] = useState<{
    id: string;
    name: string;
    color: string;
    x: number;
    y: number;
  }[]>([]);
  const [updatedAt, setUpdatedAt] = useState("");
  const [online, setOnline] = useState(true);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setDirty(true);
  };
  const loadDocument = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(
        `/documents/${documentId}`
      );
      setTitle(data.document.title);
      setContent(data.document.content);
      setVersion(data.document.version);
      setUpdatedAt(data.document.updatedAt);
      setLoaded(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!documentId) return;
    const token = localStorage.getItem("token");
    if (!token) return;
    socket.current = getSocket(token);
    socket.current.emit("join-document", {
      documentId,
    });
    loadDocument();
    socket.current?.on("typing", (
      data: {
        userId: string;
        typing: boolean;
      }
    ) => {

      setTypingUsers(prev => {

        const others = prev.filter(
          u => u.id !== data.userId
        );

        if (!data.typing) {
          return others;
        }

        return [
          ...others,
          {
            id: data.userId,
            typing: true,
          },
        ];

      });

    }
    );
    socket.current.on("receive-update",
      (data: {
        content: string;
        version: number;
        userId: string;
      }) => {
        setContent(data.content);
        setVersion(data.version);
      }
    );
    socket.current.on("user-joined", (user) => {
      console.log("Joined", user);
    });
    socket.current?.on("presence",
      (
        users: {
          id: string;
          email: string;
        }[]
      ) => {
        setOnlineUsers(users);
      }
    );
    socket.current?.on("cursor-move", (
      cursor: {
        id: string;
        name: string;
        color: string;
        x: number;
        y: number;
      }
    ) => {
      setCursors((prev) => {
        const others = prev.filter(
          (c) => c.id !== cursor.id
        );

        return [...others, cursor];
      });
    }
    );
    return () => {
      socket.current?.emit("leave-document", {
        documentId,
      });

      socket.current?.off("receive-update");
      socket.current?.off("user-joined");
      socket.current?.off("user-left");
      socket.current?.off("presence");
      socket.current?.off("typing");
      socket.current?.off("cursor-move");
    };
  }, [documentId]);

  useEffect(() => {
    if (!documentId) return;

    socket.current?.emit("typing", {
      documentId,
      typing: true,
    });

    const timer = setTimeout(() => {
      socket.current?.emit("typing", {
        documentId,
        typing: false,
      });
    }, 700);

    return () => clearTimeout(timer);
  }, [content]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setOnline(window.navigator.onLine);

    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  useEffect(() => {
    if (!documentId || !loaded || !dirty) return;

    if (!initialized.current) {
      initialized.current = true;
      return;
    }
    const timer = setTimeout(async () => {
      try {
        if (!title.trim()) return;
        setSaving(true);

        const { data } = await api.patch(`/documents/${documentId}`, {
          title,
          content,
        });
        setDirty(false);
        setUpdatedAt(data.document.updatedAt);
        setVersion(data.document.version);
      } catch (error) {
        console.error(error);
      } finally {
        setSaving(false);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [title, content, loaded]);

  useEffect(() => {
    if (!socket) return;

    const move = (e: MouseEvent) => {
      socket.current?.emit("cursor-move", {
        documentId,
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener(
      "mousemove",
      move
    );

    return () =>
      window.removeEventListener(
        "mousemove",
        move
      );
  }, [socket, documentId]);
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
        onTitleChange={handleTitleChange}
        onVersionHistory={() => { }}
        onAI={() => { }}
      />

      <Toolbar editor={editor} />

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">

        <Editor
          content={content}
          documentId={documentId}
          socket={socket.current}
          onChange={handleContentChange}
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
          <CommentPanel
            documentId={documentId}
          />
          <Collaborators users={onlineUsers} />
          {cursors.map((cursor) => (
            <Cursor
              key={cursor.id}
              x={cursor.x}
              y={cursor.y}
              name={cursor.name}
              color={cursor.color}
            />
          ))}

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