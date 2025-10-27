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
    if (!name || !email || !password) {
      setErr("Name, email and password are required");
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
    <div className="text-[#111827] dark:text-white py-16 mb-20 md:mb-26">
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <main className="w-full max-w-md mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-[#111827] dark:text-white">
              Create an Account
            </h1>
            <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
              Welcome to TicketApp
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-[#111827] dark:text-white"
                  htmlFor="name"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    autoComplete="name"
                    className="block w-full px-4 py-3 text-base placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-[#9B8AFB] focus:border-[#9B8AFB] sm:text-sm text-[#111827] dark:text-white"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-[#111827] dark:text-white"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    autoComplete="email"
                    className="block w-full px-4 py-3 text-base placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-[#9B8AFB] focus:border-[#9B8AFB] sm:text-sm text-[#111827] dark:text-white"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-[#111827] dark:text-white"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    autoComplete="new-password"
                    className="block w-full px-4 py-3 text-base placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-[#9B8AFB] focus:border-[#9B8AFB] sm:text-sm text-[#111827] dark:text-white"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {err && <div className="text-sm text-red-600">{err}</div>}
            <div>
              <button
                className="w-full flex justify-center py-3 px-4 border border-transparent cursor-pointer rounded-xl shadow-sm text-base font-medium text-white bg-[#9B8AFB] hover:bg-[#9B8AFB]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9B8AFB]"
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </div>
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                className="font-medium text-[#9B8AFB] hover:text-[#9B8AFB]/70"
                to="/auth/login"
              >
                Login
              </Link>
            </p>
          </form>
        </main>
      </div>
    </div>
  );
}
