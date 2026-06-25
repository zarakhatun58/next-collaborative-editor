"use client";

import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <h1 className="text-3xl font-bold">
        Create Account
      </h1>

      <p className="mt-2 text-zinc-400">
        Join CollabDocs today
      </p>

      <form className="mt-8 space-y-4">
        <input
          placeholder="Full Name"
          className="w-full rounded-xl border border-white/10 bg-black/20 p-3 outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border border-white/10 bg-black/20 p-3 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-xl border border-white/10 bg-black/20 p-3 outline-none"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full rounded-xl border border-white/10 bg-black/20 p-3 outline-none"
        />

        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 py-3 font-semibold"
        >
          Create Account
        </button>
      </form>

      <p className="mt-6 text-center text-zinc-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-violet-400"
        >
          Login
        </Link>
      </p>
    </div>
  );
}