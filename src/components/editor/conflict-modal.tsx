"use client";

interface Props {
  open: boolean;
  onClose: () => void;
  onKeepLocal: () => void;
  onKeepRemote: () => void;
  onMerge: () => void;
}

export default function ConflictModal({
  open,
  onClose,
  onKeepLocal,
  onKeepRemote,
  onMerge,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      <div className="glass-card w-full max-w-lg rounded-3xl p-8">

        <h2 className="text-2xl font-bold">
          Sync Conflict
        </h2>

        <p className="mt-3 text-zinc-400">
          Another user modified this document while you
          were offline.
        </p>

        <div className="mt-8 space-y-3">

          <button
            onClick={onMerge}
            className="btn-gradient w-full rounded-xl py-3"
          >
            Merge Changes
          </button>

          <button
            onClick={onKeepLocal}
            className="w-full rounded-xl border border-white/10 py-3 hover:bg-white/10"
          >
            Keep My Version
          </button>

          <button
            onClick={onKeepRemote}
            className="w-full rounded-xl border border-white/10 py-3 hover:bg-white/10"
          >
            Use Server Version
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 text-zinc-500"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}