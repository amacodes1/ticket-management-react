import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { mockLogin } from "../../lib/auth";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!email || !password) {
      setErr("Email and password are required.");
      return;
    }
    setLoading(true);
    try {
      await mockLogin(email, password);
      toast.success("You have Logged in successfully");
      nav("/dashboard");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setErr(e.message || "Login failed");
      toast.error("Failed to login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-container-xl px-6 py-12">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold">Login</h2>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
          <label className="flex flex-col">
            <span className="text-sm">Email</span>
            <input
              aria-label="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded px-3 py-2 focus:outline-none focus:ring"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-sm">Password</span>
            <input
              aria-label="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded px-3 py-2 focus:outline-none focus:ring"
            />
          </label>
          {err && <div className="text-sm text-red-600">{err}</div>}
          <div className="flex items-center gap-3">
            <button
              disabled={loading}
              className="px-4 py-2 cursor-pointer rounded bg-[#6B46C1] text-white"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
            <Link to="/auth/signup" className="text-sm">
              Create account
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
