"use client";

import { Wifi, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";

export default function ConnectionStatus() {
  const [online, setOnline] =
    useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);

    const onlineHandler = () =>
      setOnline(true);

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

  return (
    <div className="flex items-center gap-2">
      {online ? (
        <>
          <Wifi
            size={16}
            className="text-green-500"
          />
          <span className="text-green-500">
            Online
          </span>
        </>
      ) : (
        <>
          <WifiOff
            size={16}
            className="text-red-500"
          />
          <span className="text-red-500">
            Offline
          </span>
        </>
      )}
    </div>
  );
}