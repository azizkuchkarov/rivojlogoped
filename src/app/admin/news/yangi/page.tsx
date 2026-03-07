"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewNewsPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const token = typeof window !== "undefined" ? localStorage.getItem("rivoj_admin_token") : null;

  function updateSlugFromTitle(t: string) {
    setTitle(t);
    setSlug(t.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\u0400-\u04FF-]/gi, ""));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) {
      router.push("/admin");
      return;
    }
    setError("");
    setSaving(true);
    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
          excerpt,
          content,
          date,
          published,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Xatolik");
        return;
      }
      router.push("/admin/news");
      router.refresh();
    } catch {
      setError("Xatolik yuz berdi");
    } finally {
      setSaving(false);
    }
  }

  if (typeof window !== "undefined" && !token) {
    window.location.href = "/admin";
    return null;
  }

  return (
    <div className="min-h-screen bg-stone-100">
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/admin/news" className="text-primary-600 hover:underline font-display font-semibold">
            ← Yangiliklar
          </Link>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="font-display text-2xl font-bold text-stone-900 mb-6">
          Yangi yangilik
        </h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Sarlavha</label>
            <input
              type="text"
              value={title}
              onChange={(e) => updateSlugFromTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Slug (ixtiyoriy)</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              placeholder="url-uchun-qisqa-nomi"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Qisqacha</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Matn</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Sana</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="rounded border-stone-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-stone-700">Nashr qilish (bosh sahifada koʻrinadi)</span>
          </label>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 disabled:opacity-50 transition"
            >
              {saving ? "Saqlanmoqda…" : "Saqlash"}
            </button>
            <Link
              href="/admin/news"
              className="px-6 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-medium hover:bg-stone-50 transition inline-block"
            >
              Bekor qilish
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
