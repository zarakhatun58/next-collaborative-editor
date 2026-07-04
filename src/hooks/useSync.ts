"use client";

import { useEffect } from "react";
import { syncQueue } from "@/src/services/sync-engine.service";

export function useSync() {

  useEffect(() => {

    const sync = async () => {
      await syncQueue();
    };

    window.addEventListener("online", sync);

    if (navigator.onLine) {
      sync();
    }

    const timer = setInterval(sync, 5000);

    return () => {
      window.removeEventListener("online", sync);
      clearInterval(timer);
    };

  }, []);

}