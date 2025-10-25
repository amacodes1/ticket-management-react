import React, { useState } from "react";
import { mockRegister } from "../../lib/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';

export default function Signup() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!email || !password) {
      setErr("Email and password required");
      return;
    }
    setLoading(true);
    try {
      await mockRegister(email, password, name);
      toast.success("Account created");
      nav("/dashboard");
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Signup failed");
      toast.error("Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white dark:bg-[#111827] text-[#111827] dark:text-white">
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-white dark:bg-[#111827] overflow-x-hidden p-4">
        <div className="w-full max-w-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-[#111827] dark:text-white">Create an Account</h1>
            <p className="mt-2 text-base text-gray-500 dark:text-gray-400">Welcome to TicketApp</p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="flex flex-col gap-y-6 rounded-xl bg-white dark:bg-[#111827] p-8 shadow-sm">
              <label className="flex flex-col">
                <p className="text-base font-medium pb-2 text-[#111827] dark:text-white">Name</p>
                <input
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#9B8AFB] focus:ring-[#9B8AFB] h-14 placeholder:text-gray-400 p-4 text-base font-normal text-[#111827] dark:text-white"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label className="flex flex-col">
                <p className="text-base font-medium pb-2 text-[#111827] dark:text-white">Email</p>
                <input
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#9B8AFB] focus:ring-[#9B8AFB] h-14 placeholder:text-gray-400 p-4 text-base font-normal text-[#111827] dark:text-white"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="flex flex-col">
                <p className="text-base font-medium pb-2 text-[#111827] dark:text-white">Password</p>
                <div className="relative w-full">
                  <input
                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#9B8AFB] focus:ring-[#9B8AFB] h-14 placeholder:text-gray-400 p-4 pr-12 text-base font-normal text-[#111827] dark:text-white"
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </label>
            </div>
            {err && <div className="text-sm text-red-600">{err}</div>}
            <div className="flex flex-col items-center gap-4">
              <button
                className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-[#9B8AFB] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#9B8AFB]/90 transition-colors"
                type="submit"
                disabled={loading}
              >
                <span className="truncate">{loading ? "Creating..." : "Register"}</span>
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link className="font-medium text-[#9B8AFB] hover:underline" to="/auth/login">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
