"use client";

import { useEffect, useRef } from "react";
import { api } from "@/src/lib/api";

interface Props {
  documentId: string;
  title: string;
  content: string;
  enabled?: boolean;
  delay?: number;
  onSaving?: () => void;
  onSaved?: () => void;
  onError?: () => void;
}

export default function Autosave({
  documentId,
  title,
  content,
  enabled = true,
  delay = 1000,
  onSaving,
  onSaved,
  onError,
}: Props) {
  const firstRender = useRef(true);

  useEffect(() => {
    if (!enabled) return;

    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const timer = setTimeout(async () => {
      try {
        onSaving?.();

        await api.patch(`/documents/${documentId}`, {
          title,
          content,
        });

        onSaved?.();
      } catch (err) {
        console.error(err);
        onError?.();
      }
    }, delay);

    return () => clearTimeout(timer);

  }, [
    title,
    content,
    documentId,
    delay,
    enabled,
    onSaving,
    onSaved,
    onError,
  ]);

  return null;
}