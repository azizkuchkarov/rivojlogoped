"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminNav from "@/components/AdminNav";
import type { NewsItem } from "@/lib/news";

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = typeof window !== "undefined" ? localStorage.getItem("rivoj_admin_token") : null;
    setToken(t);
    if (!t) {
      window.location.href = "/admin";
      return;
    }
    loadNews(t);
  }, []);

  async function loadNews(authToken: string) {
    try {
      const res = await fetch("/api/news", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setNews(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function deleteNews(id: string) {
    if (!token || !confirm("Ushbu yangilikni oʻchirishni xohlaysizmi?")) return;
    try {
      const res = await fetch(`/api/news?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setNews((prev) => prev.filter((n) => n.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  }

  function handleLogout() {
    localStorage.removeItem("rivoj_admin_token");
    window.location.href = "/admin";
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
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-primary-600 hover:underline font-display font-semibold">
              Rivoj
            </Link>
            <span className="text-stone-400">/</span>
            <span className="font-display font-semibold text-stone-800">Yangiliklar</span>
          </div>
          <div className="flex items-center gap-3">
            <AdminNav />
            <Link
              href="/admin/news/yangi"
              className="px-4 py-2 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition"
            >
              + Yangi yangilik
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-100 transition"
            >
              Chiqish
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        {news.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
            <p className="text-stone-500 mb-4">Hozircha yangiliklar yoʻq.</p>
            <Link
              href="/admin/news/yangi"
              className="inline-block px-4 py-2 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition"
            >
              Birinchi yangilik qoʻshish
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {news.map((item) => (
              <li
                key={item.id}
                className="bg-white rounded-xl border border-stone-200 p-4 flex items-center justify-between gap-4"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-stone-900 truncate">{item.title}</h3>
                  <p className="text-sm text-stone-500">
                    {new Date(item.date).toLocaleDateString("uz-UZ")}
                    {!item.published && (
                      <span className="ml-2 text-amber-600">(nashr qilinmagan)</span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/admin/news/${item.id}`}
                    className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 text-sm hover:bg-stone-50 transition"
                  >
                    Tahrirlash
                  </Link>
                  <button
                    type="button"
                    onClick={() => deleteNews(item.id)}
                    className="px-3 py-1.5 rounded-lg border border-red-200 text-red-600 text-sm hover:bg-red-50 transition"
                  >
                    Oʻchirish
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
