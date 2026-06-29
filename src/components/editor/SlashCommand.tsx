"use client";

import { Editor } from "@tiptap/react";
import {
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code2,
} from "lucide-react";

interface Props {
  editor: Editor | null;
}

const commands = [
  {
    title: "Heading 1",
    icon: Heading1,
    action: (editor: Editor) =>
      editor.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    title: "Heading 2",
    icon: Heading2,
    action: (editor: Editor) =>
      editor.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    title: "Bullet List",
    icon: List,
    action: (editor: Editor) =>
      editor.chain().focus().toggleBulletList().run(),
  },
  {
    title: "Number List",
    icon: ListOrdered,
    action: (editor: Editor) =>
      editor.chain().focus().toggleOrderedList().run(),
  },
  {
    title: "Quote",
    icon: Quote,
    action: (editor: Editor) =>
      editor.chain().focus().toggleBlockquote().run(),
  },
  {
    title: "Code Block",
    icon: Code2,
    action: (editor: Editor) =>
      editor.chain().focus().toggleCodeBlock().run(),
  },
];

export default function SlashCommand({
  editor,
}: Props) {
  if (!editor) return null;

  return (
    <div className="glass-card rounded-3xl p-4">

      <h3 className="mb-4 font-semibold">
        Slash Commands
      </h3>

      <div className="space-y-2">

        {commands.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              onClick={() => item.action(editor)}
              className="flex w-full items-center gap-3 rounded-xl p-3 hover:bg-white/10"
            >
              <Icon size={18} />

              {item.title}
            </button>
          );
        })}

      </div>

    </div>
  );
}