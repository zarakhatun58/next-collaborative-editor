"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Loader2, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "@/src/lib/api";

interface DocumentItem {
  id: string;
  title: string;
  updatedAt: string;
}

export default function SearchBox() {
  const router = useRouter();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    if (!query.trim()) {
      setDocuments([]);
      setOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const { data } = await api.get(
          `/documents?search=${encodeURIComponent(query)}`
        );
        setDocuments(data.documents);
        setOpen(true);
        setSelectedIndex(-1);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);


  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );
  }, []);


  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (!documents.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();

      setSelectedIndex((prev) =>
        prev === documents.length - 1
          ? 0
          : prev + 1
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      setSelectedIndex((prev) =>
        prev <= 0
          ? documents.length - 1
          : prev - 1
      );
    }

    if (e.key === "Enter") {
      if (selectedIndex >= 0) {
        router.push(
          `/documents/${documents[selectedIndex].id}`
        );

        setOpen(false);

        setQuery("");
      }
    }

    if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div
      ref={wrapperRef}
      className="relative w-full"
    >
      <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />

      <input
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        onKeyDown={handleKeyDown}
        placeholder="Search documents..."
        className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-10 pr-10 text-white outline-none transition focus:border-violet-500"
      />

      {loading && (
        <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-violet-400" />
      )}

      {open && (
        <div className="absolute mt-2 max-h-80 w-full overflow-y-auto rounded-2xl border border-white/10 bg-[#111111] shadow-2xl backdrop-blur-xl">
          {documents.length === 0 ? (
            <div className="p-4 text-center text-sm text-zinc-400">
              No documents found
            </div>
          ) : (
            documents.map((doc, index) => (
              <button
                key={doc.id}
                onClick={() => {
                  router.push(
                    `/documents/${doc.id}`
                  );

                  setOpen(false);

                  setQuery("");
                }}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-white/5 ${
                  selectedIndex === index
                    ? "bg-white/10"
                    : ""
                }`}
              >
                <FileText className="h-5 w-5 text-violet-400" />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">
                    {doc.title}
                  </p>

                  <p className="text-xs text-zinc-400">
                    {new Date(
                      doc.updatedAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}