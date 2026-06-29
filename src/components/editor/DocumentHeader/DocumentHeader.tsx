"use client";

import { api } from "@/src/lib/api";
import {
    Clock,
    History,
    Share2,
    Sparkles,
    Wifi,
    WifiOff,
    CheckCircle2,
    Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  title: string;
  updatedAt?: string;
  online: boolean;
  saving: boolean;
  collaborators: number;
  onTitleChange:(title:string)=>void;
  onVersionHistory:()=>void;
  onAI:()=>void;
}

export default function DocumentHeader({
    title,
    updatedAt,
    online,
    saving,
    collaborators,
    onTitleChange,
    onVersionHistory,
    onAI,
}: Props) {

    return (
        <div className="glass-card rounded-3xl p-6">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                <div className="flex-1">

                    <input
                        value={title}
                        onChange={(e) => onTitleChange(e.target.value)}
                        className="w-full bg-transparent text-3xl font-bold outline-none"
                    />

                    <div className="mt-3 flex flex-wrap items-center gap-5 text-sm text-zinc-400">

                        <div className="flex items-center gap-2">
                            <Clock size={15} />
                            {updatedAt}
                        </div>

                        <div className="flex items-center gap-2">

                            {online ? (
                                <>
                                    <Wifi
                                        size={15}
                                        className="text-green-400"
                                    />
                                    Online
                                </>
                            ) : (
                                <>
                                    <WifiOff
                                        size={15}
                                        className="text-red-400"
                                    />
                                    Offline
                                </>
                            )}

                        </div>

                        <div className="flex items-center gap-2">

                            {saving ? (
                                <>
                                    <Loader2
                                        size={15}
                                        className="animate-spin text-cyan-400"
                                    />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <CheckCircle2
                                        size={15}
                                        className="text-green-400"
                                    />
                                    Saved
                                </>
                            )}

                        </div>

                    </div>

                </div>

                <div className="flex items-center gap-3">

                    <div className="flex -space-x-3">

                        {Array.from({
                            length: collaborators,
                        }).map((_, index) => (
                            <div
                                key={index}
                                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#09090b] bg-gradient-to-r from-violet-500 to-cyan-500 text-sm font-bold"
                            >
                                {index + 1}
                            </div>
                        ))}

                    </div>

                    <button
                        onClick={onVersionHistory}
                        className="rounded-xl border border-white/10 px-4 py-3 hover:bg-white/5"
                    >
                        <History size={18} />
                    </button>

                    <button
                        onClick={onAI}
                        className="btn-gradient rounded-xl px-5 py-3 font-medium"
                    >
                        <div className="flex items-center gap-2">
                            <Sparkles size={18} />
                            AI
                        </div>
                    </button>

                    <button
                        className="rounded-xl border border-white/10 px-4 py-3 hover:bg-white/5"
                    >
                        <Share2 size={18} />
                    </button>

                </div>

            </div>

        </div>
    );
}