const logs = [
  "Document synced successfully",
  "Version saved",
  "Connection restored",
  "Remote changes received",
];

export default function SyncLog() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h3 className="mb-5 text-lg font-bold">
        Activity Log
      </h3>

      <div className="space-y-3">
        {logs.map((log, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/10 p-3 text-sm text-zinc-400"
          >
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}