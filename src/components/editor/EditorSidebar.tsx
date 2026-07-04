"use client";

import { Editor } from "@tiptap/react";

import AIPanel from "./ai-panel";
import VersionHistory from "./version-history";
import Collaborators from "./DocumentHeader/collaborators";
import DocumentInfo from "./DocumentInfo";
import Comments from "./comments";
import Presence from "./Presence";

interface Props {
  editor: Editor | null;
  content: string;
}

export default function EditorSidebar({
  editor,
  content,
}: Props) {
  return (
    <div className="space-y-6">

      <AIPanel editor={editor} />

      <DocumentInfo
        content={content}
      />

      <Presence
        users={[
          {
            id: "1",
            name: "Jahanara",
            color: "#7C3AED",
          },
          {
            id: "2",
            name: "Rahul",
            color: "#06B6D4",
          },
        ]}
      />

      <Comments
        comments={[
          {
            id: "1",
            author: "Rahul",
            text: "Looks good.",
            createdAt: "2 min ago",
          },
        ]}
      />

      <VersionHistory documentId={""} />

      <Collaborators users={[]} />

    </div>
  );
}