import {
  Sparkles,
  Wand2,
  FileText,
} from "lucide-react";

export default function AIPanel() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
        <Sparkles className="text-violet-400" />
        AI Assistant
      </h3>

      <div className="space-y-3">
        <button className="flex w-full items-center gap-3 rounded-xl border border-white/10 p-3 hover:bg-white/5">
          <FileText />
          Summarize
        </button>

        <button className="flex w-full items-center gap-3 rounded-xl border border-white/10 p-3 hover:bg-white/5">
          <Wand2 />
          Rewrite
        </button>

        <button className="flex w-full items-center gap-3 rounded-xl border border-white/10 p-3 hover:bg-white/5">
          <Sparkles />
          Grammar Fix
        </button>
      </div>
    </div>
  );
}
