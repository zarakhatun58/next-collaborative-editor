"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  History,
  Sparkles,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Documents",
    icon: FileText,
    href: "/documents",
  },
  {
    title: "History",
    icon: History,
    href: "/history",
  },
  {
    title: "AI Assistant",
    icon: Sparkles,
    href: "/ai",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{
        width: collapsed ? 90 : 260,
      }}
      transition={{
        duration: 0.25,
      }}
      className="h-[calc(100vh-64px)] border-r border-white/10 bg-black/30 backdrop-blur-xl"
    >
      <div className="flex h-full flex-col">
        {/* Collapse Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-lg p-2 hover:bg-white/10"
          >
            {collapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>
        </div>

        {/* Menu */}
        <div className="flex-1 space-y-2 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
              >
                <motion.div
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className={`group flex items-center gap-3 rounded-xl px-4 py-3 transition-all
                  ${
                    active
                      ? "bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-500/30"
                      : "hover:bg-white/5"
                  }`}
                >
                  <Icon
                    size={20}
                    className={
                      active
                        ? "text-violet-400"
                        : "text-zinc-400"
                    }
                  />

                  {!collapsed && (
                    <span
                      className={`font-medium ${
                        active
                          ? "text-white"
                          : "text-zinc-300"
                      }`}
                    >
                      {item.title}
                    </span>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* User Card */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-bold">
              JK
            </div>

            {!collapsed && (
              <div>
                <p className="text-sm font-semibold">
                  Jahanara
                </p>
                <p className="text-xs text-zinc-400">
                  Full Stack Dev
                </p>
              </div>
            )}
          </div>

          <button className="mt-4 flex w-full items-center gap-3 rounded-xl p-3 text-red-400 hover:bg-red-500/10">
            <LogOut size={18} />

            {!collapsed && (
              <span>Logout</span>
            )}
          </button>
        </div>
      </div>
    </motion.aside>
  );
}