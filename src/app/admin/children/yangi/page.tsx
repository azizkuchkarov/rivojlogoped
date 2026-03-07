"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminNav from "@/components/AdminNav";

export default function NewChildPage() {
  const [fullName, setFullName] = useState("");
  const [birthYear, setBirthYear] = useState(new Date().getFullYear() - 5);
  const [parentPhone, setParentPhone] = useState("");
  const [parentTelegram, setParentTelegram] = useState("");
  const [saving, setSaving] = useState(false);
  const token = typeof window !== "undefined" ? localStorage.getItem("rivoj_admin_token") : null;
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) {
      router.push("/admin");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/children", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ fullName, birthYear, parentPhone: parentPhone || undefined, parentTelegram: parentTelegram || undefined }),
      });
      if (res.ok) {
        const data = await res.json();
        router.push(`/admin/children/${data.id}`);
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
        <Link href="/admin/children" className="text-primary-600 hover:underline font-display font-semibold">← Bolalar</Link>
        <AdminNav />
      </header>
      <main className="max-w-md mx-auto px-4 py-8">
        <h1 className="font-display text-2xl font-bold text-stone-900 mb-6">Yangi bola</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Ism Familiya Sharifi</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Tugʻilgan yili</label>
            <input type="number" value={birthYear} onChange={(e) => setBirthYear(Number(e.target.value))} className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 outline-none" min={2000} max={2030} />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Ota-ona telefoni</label>
            <input type="text" value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="+998..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Ota-ona Telegram (ID yoki @username)</label>
            <input type="text" value={parentTelegram} onChange={(e) => setParentTelegram(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="@username yoki raqam" />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 disabled:opacity-50">{saving ? "Saqlanmoqda…" : "Saqlash"}</button>
            <Link href="/admin/children" className="px-6 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-medium hover:bg-stone-50 inline-block">Bekor qilish</Link>
          </div>
        </form>
      </main>
    </div>
  );
}
