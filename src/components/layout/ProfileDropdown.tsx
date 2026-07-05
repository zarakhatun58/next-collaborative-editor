"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { api } from "@/src/lib/api";
import LogoutButton from "../logout-button";

interface CurrentUser {
  id: string;
  name: string;
  email: string;
}

export default function ProfileDropdown() {

  const ref = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const [user, setUser] =
    useState<CurrentUser | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {

      const { data } =
        await api.get("/auth/me");

      setUser(data.user);

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {

    function outside(
      e: MouseEvent
    ) {
      if (
        ref.current &&
        !ref.current.contains(
          e.target as Node
        )
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

  const initials =
    user?.name
      ?.split(" ")
      .map((x) => x[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <div
      ref={ref}
      className="relative"
    >
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 font-bold text-white"
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-72 rounded-2xl border border-white/10 bg-[#111] shadow-xl">

          <div className="border-b border-white/10 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 text-lg font-bold text-white">
                {initials}
              </div>
              <div>
                <p className="font-semibold text-white">
                  {user?.name}
                </p>
                <p className="text-sm text-zinc-400">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          <div className="p-2">

            <Link
              href="/profile"
              className="flex items-center gap-3 rounded-xl p-3 text-white hover:bg-white/10"
            >
              <User size={18} />
              Profile
            </Link>
            <Link
              href="/settings"
              className="flex items-center gap-3 rounded-xl p-3 text-white hover:bg-white/10"
            >
              <Settings size={18} />
              Settings
            </Link>
            <div className="border-t border-white/10 mt-2 pt-2">
              <LogoutButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}