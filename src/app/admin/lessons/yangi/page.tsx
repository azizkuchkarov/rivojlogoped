"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AdminNav from "@/components/AdminNav";

function NewLessonForm() {
  const searchParams = useSearchParams();
  const directionIdParam = searchParams.get("directionId") ?? "";
  const [name, setName] = useState("");
  const [directionId, setDirectionId] = useState(directionIdParam);
  const [directions, setDirections] = useState<{ id: string; name: string }[]>([]);
  const [saving, setSaving] = useState(false);
  const token = typeof window !== "undefined" ? localStorage.getItem("rivoj_admin_token") : null;
  const router = useRouter();

  useEffect(() => {
    if (!token) return;
    fetch("/api/directions", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then(setDirections);
    if (directionIdParam) setDirectionId(directionIdParam);
  }, [token, directionIdParam]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) {
      router.push("/admin");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name, directionId }),
      });
      if (res.ok) {
        router.push("/admin/lessons");
        return;
      }
    } catch (e) {
      console.error(e);
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
      <header className="bg-white border-b border-stone-200 px-4 py-4">
        <Link href="/admin/lessons" className="text-primary-600 hover:underline font-display font-semibold">← Darslar</Link>
        <AdminNav />
      </header>
      <main className="max-w-md mx-auto px-4 py-8">
        <h1 className="font-display text-2xl font-bold text-stone-900 mb-6">Yangi dars</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Yoʻnalish</label>
            <select value={directionId} onChange={(e) => setDirectionId(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 outline-none" required>
              <option value="">Tanlang</option>
              {directions.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Dars nomi</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 outline-none" required />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 disabled:opacity-50">{saving ? "Saqlanmoqda…" : "Saqlash"}</button>
            <Link href="/admin/lessons" className="px-6 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-medium hover:bg-stone-50 inline-block">Bekor qilish</Link>
          </div>
        </form>
      </main>
    </div>
  );
}

export default function NewLessonPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-100 flex items-center justify-center">Yuklanmoqda…</div>}>
      <NewLessonForm />
    </Suspense>
  );
}
