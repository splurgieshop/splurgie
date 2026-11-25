"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";
import { primaryButtonClass } from "@/lib/ui";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    if (password.length < 6) {
      setError("Password needs at least 6 characters.");
      return;
    }

    setLoading(true);

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <>
        <Header />
        <main className="flex flex-1 items-center justify-center bg-gray-50 px-4 py-12">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-md shadow-purple-100/50">
            <span className="text-5xl">📬</span>
            <h1 className="page-heading mt-4 text-3xl">Check your email</h1>
            <p className="mt-3 text-slate-500">
              We sent a confirmation link to{" "}
              <span className="font-bold text-navy">{email}</span>. Click it to
              activate your account and start splurging.
            </p>
            <Link
              href="/auth/login"
              className={`${primaryButtonClass} mt-8 inline-block rounded-xl px-8 py-3 text-sm`}
            >
              Back to Sign In
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex flex-1 items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md shadow-purple-100/50">
          <h1 className="page-heading text-center text-3xl">Join Splurgie</h1>
          <p className="mt-2 text-center text-sm text-slate-500">
            Make an account. List things. Buy things. Spend $0.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </p>
            )}

            <div>
              <label
                htmlFor="username"
                className="mb-1 block text-sm font-bold text-navy"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="input-field w-full"
                placeholder="your_username"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-bold text-navy"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field w-full"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-bold text-navy"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field w-full"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1 block text-sm font-bold text-navy"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="input-field w-full"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`${primaryButtonClass} w-full rounded-xl py-3 text-sm disabled:opacity-60`}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-bold text-[#7C3AED] hover:text-[#EC4899]"
            >
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
