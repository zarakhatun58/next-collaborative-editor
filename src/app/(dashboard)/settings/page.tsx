export default function SettingsPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Settings
        </h1>

        <p className="mt-2 text-zinc-400">
          Manage account preferences.
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Profile
        </h2>

        <div className="space-y-4">
          <input
            placeholder="Name"
            className="w-full rounded-xl border border-white/10 bg-black/20 p-3"
          />

          <input
            placeholder="Email"
            className="w-full rounded-xl border border-white/10 bg-black/20 p-3"
          />
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Preferences
        </h2>

        <label className="flex items-center gap-3">
          <input type="checkbox" />
          Auto Sync
        </label>
      </div>
    </div>
  );
}