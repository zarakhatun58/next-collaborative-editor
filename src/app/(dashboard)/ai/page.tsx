import {
  Sparkles,
  Wand2,
  FileText,
  Languages,
} from "lucide-react";

const tools = [
  {
    title: "Summarize",
    icon: FileText,
  },
  {
    title: "Rewrite",
    icon: Wand2,
  },
  {
    title: "Grammar Fix",
    icon: Sparkles,
  },
  {
    title: "Translate",
    icon: Languages,
  },
];

export default function AIPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          AI Workspace
        </h1>

        <p className="mt-2 text-zinc-400">
          Enhance documents using AI.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {tools.map((tool) => {
          const Icon = tool.icon;

          return (
            <div
              key={tool.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <Icon className="mb-4 text-violet-400" />

              <h3 className="font-semibold">
                {tool.title}
              </h3>
            </div>
          );
        })}
      </div>

      <textarea
        placeholder="Paste content here..."
        className="min-h-[250px] w-full rounded-3xl border border-white/10 bg-white/5 p-6 outline-none"
      />
    </div>
  );
}