"use client";

import { motion } from "framer-motion";
import {
  FilePlus,
  Sparkles,
  Users,
} from "lucide-react";

const actions = [
  {
    title: "New Document",
    icon: FilePlus,
  },
  {
    title: "AI Summary",
    icon: Sparkles,
  },
  {
    title: "Invite User",
    icon: Users,
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-5 text-xl font-bold">
        Quick Actions
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <motion.button
              key={action.title}
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="rounded-2xl border border-white/10 bg-black/20 p-5 text-left transition hover:border-violet-500/30"
            >
              <Icon className="mb-3 h-6 w-6 text-violet-400" />

              <p className="font-medium">
                {action.title}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}