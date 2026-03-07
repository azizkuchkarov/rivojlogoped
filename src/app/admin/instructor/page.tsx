"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminNav from "@/components/AdminNav";
import type { MainInstructor } from "@/lib/instructor";

export default function AdminInstructorPage() {
  const [data, setData] = useState<MainInstructor | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const t = typeof window !== "undefined" ? localStorage.getItem("rivoj_admin_token") : null;
    setToken(t);
    if (!t) {
      window.location.href = "/admin";
      return;
    }
    fetch("/api/instructor")
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => setError("Yuklanmadi"))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token || !data) return;
    setError("");
    setSaving(true);
    try {
      const res = await fetch("/api/instructor", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        setError("Xatolik");
        return;
      }
      const updated = await res.json();
      setData(updated);
      router.refresh();
    } catch {
      setError("Xatolik yuz berdi");
    } finally {
      setSaving(false);
    }
  }

  if (!token && !loading) return null;
  if (loading) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <p className="text-stone-500">Yuklanmoqda…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100">
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-primary-600 hover:underline font-display font-semibold">
              Rivoj
            </Link>
            <span className="text-stone-400">/</span>
            <span className="font-display font-semibold text-stone-800">Asosiy instruktor</span>
          </div>
          <div className="flex items-center gap-3">
            <AdminNav />
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("rivoj_admin_token");
                window.location.href = "/admin";
              }}
              className="px-4 py-2 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-100"
            >
              Chiqish
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="font-display text-2xl font-bold text-stone-900 mb-6">
          Asosiy instruktor maʼlumotlari
        </h1>
        <p className="text-stone-600 text-sm mb-6">
          Ushbu maʼlumotlar bosh sahifada «Asosiy instruktor» boʻlimida koʻrsatiladi.
        </p>
        {data && (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Ism familiya</label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Lavozim / unvon</label>
              <input
                type="text"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="Asosiy instruktor — Logoped, Defektolog"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Qisqacha biografiya</label>
              <textarea
                value={data.bio}
                onChange={(e) => setData({ ...data, bio: e.target.value })}
                rows={5}
                className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Rasm URL (ixtiyoriy)</label>
              <input
                type="url"
                value={data.image ?? ""}
                onChange={(e) => setData({ ...data, image: e.target.value || undefined })}
                className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Telefon (ixtiyoriy)</label>
              <input
                type="text"
                value={data.phone ?? ""}
                onChange={(e) => setData({ ...data, phone: e.target.value || undefined })}
                className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Telegram (ixtiyoriy)</label>
              <input
                type="text"
                value={data.telegram ?? ""}
                onChange={(e) => setData({ ...data, telegram: e.target.value || undefined })}
                className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder="@username"
              />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={data.showOnHome}
                onChange={(e) => setData({ ...data, showOnHome: e.target.checked })}
                className="rounded border-stone-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-stone-700">Bosh sahifada koʻrsatish</span>
            </label>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 disabled:opacity-50"
            >
              {saving ? "Saqlanmoqda…" : "Saqlash"}
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
