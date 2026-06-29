export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side */}
      <div className="hidden lg:flex flex-col justify-center p-16 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617]">
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
     <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] p-6">
  {/* Purple Glow */}
  <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-violet-600/20 blur-[120px]" />
 

  {/* Login / Register Card */}
  <div className="relative z-10">
    {children}
  </div>
</div>
    </div>
  );
}