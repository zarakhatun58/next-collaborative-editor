"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <h1 className="text-3xl font-bold">
        Welcome Back
      </h1>

      <p className="mt-2 text-zinc-400">
        Login to continue
      </p>

      <form className="mt-8 space-y-4">
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

        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 py-3 font-semibold"
        >
          Login
        </button>
      </form>

      <div className="my-6 text-center text-zinc-500">
        OR
      </div>

      <button className="w-full rounded-xl border border-white/10 py-3">
        Continue with Google
      </button>

      <p className="mt-6 text-center text-zinc-400">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="text-violet-400"
        >
          Register
        </Link>
      </p>
    </div>
  );
}