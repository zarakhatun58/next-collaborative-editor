"use client";

import {
  Clock3,
  Type,
  AlignLeft,
} from "lucide-react";

interface Props {
  content: string;
}

export default function DocumentInfo({
  content,
}: Props) {
  const plain = content
    .replace(/<[^>]*>/g, "")
    .trim();

  const words =
    plain.length === 0
      ? 0
      : plain.split(/\s+/).length;

  const characters = plain.length;

  const readingTime = Math.max(
    1,
    Math.ceil(words / 200)
  );

  return (
    <div className="glass-card rounded-3xl p-6">

      <h3 className="mb-5 text-lg font-bold">
        Document Info
      </h3>

      <div className="space-y-5">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <Type size={18} />

            Words

          </div>

          <span>{words}</span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <AlignLeft size={18} />

            Characters

          </div>

          <span>{characters}</span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <Clock3 size={18} />

            Reading

          </div>

          <span>{readingTime} min</span>

        </div>

      </div>

    </div>
  );
}