"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminNav from "@/components/AdminNav";
import type { TeamInstructor } from "@/lib/instructor";
import type { Direction } from "@/lib/types";

export default function AdminInstructorsPage() {
  const [list, setList] = useState<TeamInstructor[]>([]);
  const [directions, setDirections] = useState<Direction[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = typeof window !== "undefined" ? localStorage.getItem("rivoj_admin_token") : null;
    setToken(t);
    if (!t) {
      window.location.href = "/admin";
      return;
    }
    Promise.all([
      fetch("/api/instructors", { headers: { Authorization: `Bearer ${t}` } }).then((r) => r.json()),
      fetch("/api/directions", { headers: { Authorization: `Bearer ${t}` } }).then((r) => r.json()),
    ])
      .then(([instructors, dirs]) => {
        setList(instructors);
        setDirections(dirs);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const directionName = (id: string) => directions.find((d) => d.id === id)?.name ?? id;

  async function deleteItem(id: string) {
    if (!token || !confirm("Ushbu instruktorni oʻchirishni xohlaysizmi?")) return;
    try {
      const res = await fetch(`/api/instructors?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setList((prev) => prev.filter((i) => i.id !== id));
    } catch (e) {
      console.error(e);
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
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-primary-600 hover:underline font-display font-semibold">
              Rivoj
            </Link>
            <span className="text-stone-400">/</span>
            <span className="font-display font-semibold text-stone-800">Instruktorlar jamoasi</span>
          </div>
          <div className="flex items-center gap-3">
            <AdminNav />
            <Link
              href="/admin/instructors/yangi"
              className="px-4 py-2 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700"
            >
              + Yangi instruktor
            </Link>
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
      <main className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-stone-600 text-sm mb-6">
          Jamoа «Instruktorlar jamoasi bilan tanishing» sahifasida koʻrsatiladi. Tartib raqami boʻyicha joylashadi.
        </p>
        {list.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
            <p className="text-stone-500 mb-4">Hozircha instruktorlar roʻyxati boʻsh.</p>
            <Link
              href="/admin/instructors/yangi"
              className="inline-block px-4 py-2 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700"
            >
              Birinchi instruktor qoʻshish
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {list.map((item) => (
              <li
                key={item.id}
                className="bg-white rounded-xl border border-stone-200 p-4 flex items-center justify-between gap-4"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-stone-900">{item.name}</h3>
                  <p className="text-sm text-primary-600">{item.role}</p>
                  {item.directionIds && item.directionIds.length > 0 && (
                    <p className="text-sm text-stone-500 mt-1">Yoʻnalishlar: {item.directionIds.map(directionName).join(", ")}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link href={`/admin/instructors/${item.id}/stats`} className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 text-sm hover:bg-stone-50">Hisobot</Link>
                  <Link
                    href={`/admin/instructors/${item.id}`}
                    className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 text-sm hover:bg-stone-50"
                  >
                    Tahrirlash
                  </Link>
                  <button
                    type="button"
                    onClick={() => deleteItem(item.id)}
                    className="px-3 py-1.5 rounded-lg border border-red-200 text-red-600 text-sm hover:bg-red-50"
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
