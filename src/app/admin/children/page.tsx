"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminNav from "@/components/AdminNav";
import type { Child } from "@/lib/types";

export default function AdminChildrenPage() {
  const [list, setList] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);
  const token = typeof window !== "undefined" ? localStorage.getItem("rivoj_admin_token") : null;

  useEffect(() => {
    const t = localStorage.getItem("rivoj_admin_token");
    if (!t) {
      window.location.href = "/admin";
      return;
    }
    fetch("/api/children", { headers: { Authorization: `Bearer ${t}` } })
      .then((r) => r.json())
      .then(setList)
      .finally(() => setLoading(false));
  }, []);

  async function remove(id: string) {
    if (!token || !confirm("Bolani roʻyxatdan oʻchirishni xohlaysizmi?")) return;
    try {
      const res = await fetch(`/api/children?id=${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setList((prev) => prev.filter((c) => c.id !== id));
    } catch (e) {
      console.error(e);
    }
  }

  if (!token && !loading) return null;
  if (loading) return <div className="min-h-screen bg-stone-100 flex items-center justify-center">Yuklanmoqda…</div>;

  return (
    <div className="min-h-screen bg-stone-100">
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-primary-600 hover:underline font-display font-semibold">Rivoj</Link>
            <span className="text-stone-400">/</span>
            <span className="font-display font-semibold text-stone-800">Bolalar</span>
          </div>
          <div className="flex items-center gap-3">
            <AdminNav />
            <Link href="/admin/children/yangi" className="px-4 py-2 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700">+ Yangi bola</Link>
            <button type="button" onClick={() => { localStorage.removeItem("rivoj_admin_token"); window.location.href = "/admin"; }} className="px-4 py-2 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-100">Chiqish</button>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        {list.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
            <p className="text-stone-500 mb-4">Bolalar roʻyxati boʻsh.</p>
            <Link href="/admin/children/yangi" className="inline-block px-4 py-2 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700">Birinchi bolani qoʻshish</Link>
          </div>
        ) : (
          <ul className="space-y-2">
            {list.map((c) => (
              <li key={c.id} className="bg-white rounded-xl border border-stone-200 p-4 flex items-center justify-between">
                <div>
                  <span className="font-medium text-stone-900">{c.fullName}</span>
                  <span className="text-stone-500 text-sm ml-2">({c.birthYear})</span>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/children/${c.id}`} className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 text-sm hover:bg-stone-50">Profil</Link>
                  <Link href={`/admin/children/${c.id}/tahrir`} className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 text-sm hover:bg-stone-50">Tahrirlash</Link>
                  <button type="button" onClick={() => remove(c.id)} className="px-3 py-1.5 rounded-lg border border-red-200 text-red-600 text-sm hover:bg-red-50">Oʻchirish</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
