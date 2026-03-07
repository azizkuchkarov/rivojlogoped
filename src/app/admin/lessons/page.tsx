"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminNav from "@/components/AdminNav";
import type { Lesson } from "@/lib/types";
import type { Direction } from "@/lib/types";

export default function AdminLessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [directions, setDirections] = useState<Direction[]>([]);
  const [directionId, setDirectionId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const token = typeof window !== "undefined" ? localStorage.getItem("rivoj_admin_token") : null;

  useEffect(() => {
    const t = localStorage.getItem("rivoj_admin_token");
    if (!t) {
      window.location.href = "/admin";
      return;
    }
    Promise.all([
      fetch("/api/lessons", { headers: { Authorization: `Bearer ${t}` } }).then((r) => r.json()),
      fetch("/api/directions", { headers: { Authorization: `Bearer ${t}` } }).then((r) => r.json()),
    ]).then(([less, dirs]) => {
      setLessons(less);
      setDirections(dirs);
      if (dirs.length && !directionId) setDirectionId(dirs[0].id);
    }).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!directionId || !token) return;
    fetch(`/api/lessons?directionId=${directionId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then(setLessons);
  }, [directionId, token]);

  async function remove(id: string) {
    if (!token || !confirm("Oʻchirilsinmi?")) return;
    try {
      const res = await fetch(`/api/lessons?id=${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setLessons((prev) => prev.filter((l) => l.id !== id));
    } catch (e) {
      console.error(e);
    }
  }

  if (!token && !loading) return null;
  if (loading) return <div className="min-h-screen bg-stone-100 flex items-center justify-center">Yuklanmoqda…</div>;

  const filtered = lessons.filter((l) => l.directionId === directionId);
  const dirName = directions.find((d) => d.id === directionId)?.name ?? "";

  return (
    <div className="min-h-screen bg-stone-100">
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-primary-600 hover:underline font-display font-semibold">Rivoj</Link>
              <span className="text-stone-400">/</span>
              <span className="font-display font-semibold text-stone-800">Darslar</span>
            </div>
            <button type="button" onClick={() => { localStorage.removeItem("rivoj_admin_token"); window.location.href = "/admin"; }} className="px-4 py-2 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-100 text-sm">Chiqish</button>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-stone-100">
            <AdminNav />
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-stone-100">
            <label className="text-sm text-stone-600">Yoʻnalish:</label>
            <select value={directionId} onChange={(e) => setDirectionId(e.target.value)} className="px-3 py-2 rounded-xl border border-stone-300 text-stone-700 text-sm min-w-[200px]">
              <option value="">Tanlang</option>
              {directions.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
            <Link href={directionId ? `/admin/lessons/yangi?directionId=${directionId}` : "/admin/lessons/yangi"} className="px-4 py-2 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 text-sm whitespace-nowrap">+ Dars qoʻshish</Link>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-lg font-semibold text-stone-800 mb-4">{dirName ? `«${dirName}» boʻyicha darslar` : "Yoʻnalishni tanlang"}</h2>
        {!directionId ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
            <p className="text-stone-500">Yuqoridan yoʻnalishni tanlang.</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
            <p className="text-stone-500 mb-4">Ushbu yoʻnalishda darslar yoʻq.</p>
            <Link href={`/admin/lessons/yangi?directionId=${directionId}`} className="inline-block px-4 py-2 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700">Dars qoʻshish</Link>
          </div>
        ) : (
          <ul className="space-y-2">
            {filtered.map((l) => (
              <li key={l.id} className="bg-white rounded-xl border border-stone-200 p-4 flex items-center justify-between">
                <span className="font-medium text-stone-900">{l.name}</span>
                <div className="flex gap-2">
                  <Link href={`/admin/lessons/${l.id}`} className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 text-sm hover:bg-stone-50">Tahrirlash</Link>
                  <button type="button" onClick={() => remove(l.id)} className="px-3 py-1.5 rounded-lg border border-red-200 text-red-600 text-sm hover:bg-red-50">Oʻchirish</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
