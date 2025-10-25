import React, { useState } from "react";
import { mockRegister } from "../../lib/auth";
import { useNavigate } from "react-router-dom";
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
    <main className="mx-auto max-w-container-xl px-6 py-12">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold">Create an account</h2>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
          <input
            aria-label="name"
            placeholder="Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            aria-label="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            aria-label="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded px-3 py-2"
          />
          {err && <div className="text-sm text-red-600">{err}</div>}
          <div className="flex items-center gap-3">
            <button
              disabled={loading}
              className="px-4 py-2 rounded bg-[#6B46C1] text-white"
            >
              {loading ? "Creating..." : "Create account"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
