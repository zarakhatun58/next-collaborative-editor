import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Shield,
  Wifi,
} from "lucide-react";
import Footer from "../components/layout/footer";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background Blur */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,.2),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,.15),transparent_35%)]" />

      <div className="relative z-10">
        {/* Navbar */}
        <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <h1 className="text-2xl font-bold">
            CollabDocs
          </h1>

          <div className="flex gap-4">
            <Link
              href="/login"
              className="rounded-xl border border-white/10 px-5 py-2"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 px-5 py-2"
            >
              Get Started
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="mx-auto flex max-w-7xl flex-col items-center px-6 pt-24 text-center">
          <div className="mb-6 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2">
            <span className="text-sm text-violet-300">
              Local First Collaborative Editor
            </span>
          </div>

          <h1 className="max-w-5xl text-6xl font-bold leading-tight">
            Work Offline.
            <br />
            Sync Everywhere.
          </h1>

          <p className="mt-8 max-w-2xl text-xl text-zinc-400">
            Build documents locally, collaborate in
            real time, restore any version, and never
            lose your work.
          </p>

          <div className="mt-10 flex gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-600 px-8 py-4 font-semibold"
            >
              Open Dashboard
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/documents"
              className="rounded-2xl border border-white/10 px-8 py-4"
            >
              View Demo
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto mt-32 max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <Wifi className="mb-5 text-cyan-400" />

              <h3 className="mb-3 text-xl font-bold">
                Offline First
              </h3>

              <p className="text-zinc-400">
                Continue working even when there is
                no internet connection.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <Shield className="mb-5 text-green-400" />

              <h3 className="mb-3 text-xl font-bold">
                Secure Sync
              </h3>

              <p className="text-zinc-400">
                Background synchronization with
                conflict-safe merging.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <Sparkles className="mb-5 text-violet-400" />

              <h3 className="mb-3 text-xl font-bold">
                AI Assistant
              </h3>

              <p className="text-zinc-400">
                Summarize, rewrite, and improve
                documents instantly.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
       <Footer/>
      </div>
    </main>
  );
}