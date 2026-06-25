import { AlertTriangle } from "lucide-react";

export default function ConflictAlert() {
  return (
    <div className="rounded-3xl border border-orange-500/20 bg-orange-500/5 p-5">
      <div className="flex items-start gap-3">
        <AlertTriangle className="text-orange-400" />

        <div>
          <h3 className="font-semibold text-orange-400">
            Conflict Detected
          </h3>

          <p className="mt-2 text-sm text-zinc-400">
            Local and remote changes differ.
            Merge review required.
          </p>
        </div>
      </div>
    </div>
  );
}