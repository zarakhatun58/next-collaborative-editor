"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bell,
  Search,
  Wifi,
  WifiOff,
  FileText,
  Menu,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isOnline, setIsOnline] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const onlineHandler = () => setIsOnline(true);
    const offlineHandler = () => setIsOnline(false);

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-black/40"
    >
      <div className="mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2"
        >
          <div className="rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 p-2">
            <FileText className="h-5 w-5 text-white" />
          </div>

          <span className="font-bold text-lg text-white">
            CollabDocs
          </span>
        </Link>

        {/* Search */}
        <div className="hidden md:flex w-full max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

            <input
              placeholder="Search documents..."
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-white outline-none transition-all focus:border-violet-500"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Connection Status */}
          <div className="hidden sm:flex items-center gap-2">
            {isOnline ? (
              <>
                <Wifi className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-500">
                  Online
                </span>
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-500">
                  Offline
                </span>
              </>
            )}
          </div>

          {/* Notifications */}
          <button className="rounded-xl p-2 transition hover:bg-white/10">
            <Bell className="h-5 w-5 text-white" />
          </button>

          {/* Avatar */}
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
            JK
          </div>

          {/* Mobile Menu */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Menu className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border-t border-white/10 p-4 md:hidden"
        >
          <input
            placeholder="Search..."
            className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none"
          />
        </motion.div>
      )}
    </motion.header>
  );
}