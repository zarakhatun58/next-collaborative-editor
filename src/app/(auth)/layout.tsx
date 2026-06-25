export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side */}
      <div className="hidden lg:flex flex-col justify-center p-16 bg-gradient-to-br from-violet-700 via-purple-700 to-cyan-700">
        <h1 className="text-6xl font-bold text-white">
          CollabDocs
        </h1>

        <p className="mt-6 text-xl text-white/80 max-w-lg">
          Local-first collaborative document editor
          with offline synchronization, version
          history, AI assistance, and real-time
          collaboration.
        </p>

        <div className="mt-10 space-y-4">
          <div className="rounded-2xl bg-white/10 p-4">
            ✓ Offline First
          </div>

          <div className="rounded-2xl bg-white/10 p-4">
            ✓ Real Time Collaboration
          </div>

          <div className="rounded-2xl bg-white/10 p-4">
            ✓ AI Powered
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center p-6 bg-[#09090b]">
        {children}
      </div>
    </div>
  );
}