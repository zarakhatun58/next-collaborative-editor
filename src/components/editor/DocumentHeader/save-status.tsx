"use client";

import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  CloudUpload,
} from "lucide-react";

interface Props {
  status:
    | "idle"
    | "saving"
    | "saved"
    | "error";
}

export default function SaveStatus({
  status,
}: Props) {

  if (status === "saving") {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-cyan-400">

        <Loader2
          size={16}
          className="animate-spin"
        />

        Saving...

      </div>
    );
  }

  if (status === "saved") {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-2 text-green-400">

        <CheckCircle2 size={16} />

        Saved

      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-red-400">

        <AlertCircle size={16} />

        Save failed

      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-zinc-400">

      <CloudUpload size={16} />

      Ready

    </div>
  );
}