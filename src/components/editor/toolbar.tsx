"use client";

import { Editor } from "@tiptap/react";

import {
  Bold,
  Italic,
  Strikethrough,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo2,
  Redo2,
  Minus,
} from "lucide-react";

interface ToolbarProps {
  editor: Editor | null;
}

export default function Toolbar({
  editor,
}: ToolbarProps) {
  if (!editor) return null;

  const btn =
    "flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:bg-violet-600 hover:text-white";

  const active =
    "bg-gradient-to-r from-violet-600 to-cyan-600 text-white border-transparent";

  return (
    <div className="glass-card overflow-x-auto rounded-2xl p-3">

      <div className="flex w-max items-center gap-2">

        {/* Undo */}

        <button
          onClick={() => editor.chain().focus().undo().run()}
          className={btn}
        >
          <Undo2 size={18} />
        </button>

        <button
          onClick={() => editor.chain().focus().redo().run()}
          className={btn}
        >
          <Redo2 size={18} />
        </button>

        <div className="mx-2 h-8 w-px bg-white/10" />

        {/* Bold */}

        <button
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
          className={`${btn} ${
            editor.isActive("bold") ? active : ""
          }`}
        >
          <Bold size={18} />
        </button>

        {/* Italic */}

        <button
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
          className={`${btn} ${
            editor.isActive("italic") ? active : ""
          }`}
        >
          <Italic size={18} />
        </button>

        {/* Strike */}

        <button
          onClick={() =>
            editor.chain().focus().toggleStrike().run()
          }
          className={`${btn} ${
            editor.isActive("strike") ? active : ""
          }`}
        >
          <Strikethrough size={18} />
        </button>

        {/* Code */}

        <button
          onClick={() =>
            editor.chain().focus().toggleCode().run()
          }
          className={`${btn} ${
            editor.isActive("code") ? active : ""
          }`}
        >
          <Code2 size={18} />
        </button>

        <div className="mx-2 h-8 w-px bg-white/10" />

        {/* Heading */}

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({
              level: 1,
            }).run()
          }
          className={`${btn} ${
            editor.isActive("heading", {
              level: 1,
            })
              ? active
              : ""
          }`}
        >
          <Heading1 size={18} />
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({
              level: 2,
            }).run()
          }
          className={`${btn} ${
            editor.isActive("heading", {
              level: 2,
            })
              ? active
              : ""
          }`}
        >
          <Heading2 size={18} />
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({
              level: 3,
            }).run()
          }
          className={`${btn} ${
            editor.isActive("heading", {
              level: 3,
            })
              ? active
              : ""
          }`}
        >
          <Heading3 size={18} />
        </button>

        <div className="mx-2 h-8 w-px bg-white/10" />

        {/* Bullet */}

        <button
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          className={`${btn} ${
            editor.isActive("bulletList")
              ? active
              : ""
          }`}
        >
          <List size={18} />
        </button>

        {/* Ordered */}

        <button
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          className={`${btn} ${
            editor.isActive("orderedList")
              ? active
              : ""
          }`}
        >
          <ListOrdered size={18} />
        </button>

        {/* Quote */}

        <button
          onClick={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
          className={`${btn} ${
            editor.isActive("blockquote")
              ? active
              : ""
          }`}
        >
          <Quote size={18} />
        </button>

        {/* HR */}

        <button
          onClick={() =>
            editor.chain().focus().setHorizontalRule().run()
          }
          className={btn}
        >
          <Minus size={18} />
        </button>

      </div>
    </div>
  );
}