"use client";

import { api } from "@/src/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);
    router.replace("/dashboard");
  } catch (err: any) {
    console.log(err.response?.data);
  }
};
  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-3xl shadow-2xl shadow-violet-900/20">
      <h1 className="text-3xl font-bold">
        Welcome Back
      </h1>

      <p className="mt-2 text-zinc-400">
        Login to continue
      </p>

      <form className="mt-8 space-y-4"  
      onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Email"
           value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder:text-zinc-500 focus:border-violet-500 focus:outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder:text-zinc-500 focus:border-violet-500 focus:outline-none"
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