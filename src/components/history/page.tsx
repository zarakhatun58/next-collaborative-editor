import VersionCompare from "./version-compare";
import VersionTimeline from "./version-timeline";


export default function HistoryPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Version History
        </h1>

        <p className="mt-2 text-zinc-400">
          Restore any previous version safely.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
        <VersionTimeline />

        <VersionCompare />
      </div>
    </div>
  );
}