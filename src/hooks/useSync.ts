"use client";

import { useEffect } from "react";

import { syncQueue } from "@/src/services/sync-engine.service";

export function useSync(
  token: string
) {
  useEffect(() => {
    const handleOnline =
      async () => {
        await syncQueue(token);
      };

    window.addEventListener(
      "online",
      handleOnline
    );

    if (navigator.onLine) {
      handleOnline();
    }

    return () => {
      window.removeEventListener(
        "online",
        handleOnline
      );
    };
  }, [token]);
}