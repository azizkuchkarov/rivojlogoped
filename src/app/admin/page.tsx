"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      let data: { token?: string; error?: string };
      try {
        data = await res.json();
      } catch {
        setError("Server javobi oʻqilmadi");
        setLoading(false);
        return;
      }
      if (!res.ok) {
        setError(data.error || "Parol notoʻgʻri");
        setLoading(false);
        return;
      }
      if (data.token && typeof window !== "undefined") {
        localStorage.setItem("rivoj_admin_token", data.token);
        window.location.href = "/admin/news";
        return;
      }
      setError("Token olinmadi");
    } catch {
      setError("Tarmoq xatoligi. Internetingizni tekshiring.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-stone-200 p-8">
          <h1 className="font-display text-2xl font-bold text-stone-900 text-center">
            Admin kirish
          </h1>
          <p className="text-stone-500 text-center text-sm mt-1">
            Rivoj yangiliklarini boshqarish
          </p>
          <p className="text-stone-400 text-center text-xs mt-2">
            Sukutdagi parol: <strong className="text-stone-600">rivoj2025</strong>
          </p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-1">
                Parol
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
                placeholder="rivoj2025"
                required
                autoComplete="current-password"
              />
            </div>
            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 disabled:opacity-50 transition"
            >
              {loading ? "Kirilmoqda…" : "Kirish"}
            </button>
          </form>
          <a href="/" className="block text-center text-sm text-primary-600 hover:underline mt-4">
            ← Bosh sahifaga
          </a>
        </div>
      </div>
    </div>
  );
}
