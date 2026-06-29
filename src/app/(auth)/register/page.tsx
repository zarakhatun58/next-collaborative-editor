"use client";

import Link from "next/link";
import { api } from "@/src/lib/api";
import router from "../../api/auth/auth.routes";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("")
const router = useRouter();

  const onSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }
  await api.post("/auth/register", {
    name,
    email,
    password,
  });
  toast.success("Account created");
  router.replace("/login");
};
  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <h1 className="text-3xl font-bold">
        Create Account
      </h1>

      <p className="mt-2 text-zinc-400">
        Join CollabDocs today
      </p>

      <form className="mt-8 space-y-4" 
      onSubmit={onSubmit}>
        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder:text-zinc-500 focus:border-violet-500 focus:outline-none"
        />

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

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder:text-zinc-500 focus:border-violet-500 focus:outline-none"
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