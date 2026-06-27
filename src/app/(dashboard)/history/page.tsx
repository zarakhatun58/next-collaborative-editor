import AIPanel from "@/src/components/editor/ai-panel";
import Collaborators from "@/src/components/editor/collaborators";
import Editor from "@/src/components/editor/editor";
import ConnectionStatus from "@/src/components/editor/connection-status";


export default function DocumentPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Project Proposal
          </h1>

          <p className="text-zinc-400">
            Last edited 2 minutes ago
          </p>
        </div>

        <div className="flex items-center gap-6">
          <ConnectionStatus />
          <Collaborators />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <Editor />

        <AIPanel />
      </div>
    </div>
  );
}