import { FileText, Plus, Users } from "lucide-react";

const documents = [
  {
    id: 1,
    title: "Product Requirements",
    collaborators: 4,
    updated: "5 mins ago",
  },
  {
    id: 2,
    title: "System Architecture",
    collaborators: 3,
    updated: "20 mins ago",
  },
  {
    id: 3,
    title: "Offline Sync Design",
    collaborators: 2,
    updated: "1 hour ago",
  },
];

export default function DocumentsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Documents
          </h1>

          <p className="mt-2 text-zinc-400">
            Manage collaborative documents
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 px-5 py-3">
          <Plus size={18} />
          New Document
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <FileText className="mb-4 text-cyan-400" />

            <h3 className="text-xl font-semibold">
              {doc.title}
            </h3>

            <div className="mt-4 flex items-center gap-2 text-zinc-400">
              <Users size={16} />
              {doc.collaborators} collaborators
            </div>

            <p className="mt-3 text-sm text-zinc-500">
              Updated {doc.updated}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}