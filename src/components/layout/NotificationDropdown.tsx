"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { api } from "@/src/lib/api";

interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  unread: boolean;
}

export default function NotificationDropdown() {
  const ref = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const [notifications, setNotifications] = useState<
    Notification[]
  >([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    try {
      const { data } =
        await api.get("/notifications");

      setNotifications(
        data.notifications
      );
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    function outside(e: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      outside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        outside
      );
  }, []);

  const unread =
    notifications.filter(
      (n) => n.unread
    ).length;

  function markAllRead() {
    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        unread: false,
      }))
    );
  }

  return (
    <div
      ref={ref}
      className="relative"
    >
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="relative rounded-xl p-2 hover:bg-white/10 cursor-pointer"
      >
        <Bell className="h-5 w-5 text-white" />

        {unread > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] text-white">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-96 rounded-2xl border border-white/10 bg-[#111] shadow-2xl">

          <div className="flex items-center justify-between border-b border-white/10 p-4">

            <h3 className="font-semibold text-white">
              Notifications
            </h3>

            <button
              onClick={markAllRead}
              className="flex items-center gap-2 text-sm text-violet-400"
            >
              <CheckCheck
                size={16}
              />

              Mark all
            </button>

          </div>

          <div className="max-h-96 overflow-y-auto">

            {notifications.length ===
            0 ? (
              <div className="p-8 text-center text-zinc-400">
                No notifications
              </div>
            ) : (
              notifications.map(
                (item) => (
                  <div
                    key={item.id}
                    className={`border-b border-white/5 p-4 transition hover:bg-white/5 ${
                      item.unread
                        ? "bg-violet-500/5"
                        : ""
                    }`}
                  >
                    <p className="font-medium text-white">
                      {item.title}
                    </p>

                    <p className="mt-1 text-sm text-zinc-400">
                      {item.message}
                    </p>

                    <p className="mt-2 text-xs text-zinc-500">
                      {new Date(
                        item.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>
                )
              )
            )}

          </div>

        </div>
      )}
    </div>
  );
}