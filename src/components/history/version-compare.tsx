export default function VersionCompare() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-4 text-xl font-bold">
        Version Comparison
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4">
          <h3 className="mb-3 font-semibold text-red-400">
            Removed
          </h3>

          <ul className="space-y-2 text-sm text-zinc-300">
            <li>- Old paragraph removed</li>
            <li>- Deprecated API section removed</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-4">
          <h3 className="mb-3 font-semibold text-green-400">
            Added
          </h3>

          <ul className="space-y-2 text-sm text-zinc-300">
            <li>+ New architecture diagram</li>
            <li>+ Sync engine documentation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}