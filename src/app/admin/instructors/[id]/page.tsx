"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import AdminNav from "@/components/AdminNav";
import type { TeamInstructor } from "@/lib/instructor";
import type { Direction } from "@/lib/types";

export default function EditInstructorPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [order, setOrder] = useState(0);
  const [telegramId, setTelegramId] = useState("");
  const [sharePercent, setSharePercent] = useState(50);
  const [directionIds, setDirectionIds] = useState<string[]>([]);
  const [directions, setDirections] = useState<Direction[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const token = typeof window !== "undefined" ? localStorage.getItem("rivoj_admin_token") : null;

  useEffect(() => {
    if (!token) {
      window.location.href = "/admin";
      return;
    }
    Promise.all([
      fetch("/api/instructors", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
      fetch("/api/directions", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
    ])
      .then(([list, dirs]: [TeamInstructor[], Direction[]]) => {
        setDirections(dirs);
        const item = list.find((i) => i.id === id);
        if (item) {
          setName(item.name);
          setRole(item.role);
          setBio(item.bio);
          setImage(item.image ?? "");
          setOrder(item.order);
          setTelegramId(item.telegramId ?? "");
          setSharePercent(item.sharePercent ?? 50);
          setDirectionIds(item.directionIds ?? []);
        }
      })
      .catch(() => setError("Yuklanmadi"))
      .finally(() => setLoading(false));
  }, [id, token]);

  function toggleDirection(directionId: string) {
    setDirectionIds((prev) =>
      prev.includes(directionId) ? prev.filter((d) => d !== directionId) : [...prev, directionId]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setError("");
    setSaving(true);
    try {
      const res = await fetch("/api/instructors", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, name, role, bio, image: image || undefined, order, telegramId: telegramId || undefined, sharePercent, directionIds }),
      });
      if (!res.ok) {
        setError("Xatolik");
        return;
      }
      router.push("/admin/instructors");
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
        <div className="max-w-2xl mx-auto px-4 py-4">
          <Link href="/admin/instructors" className="text-primary-600 hover:underline font-display font-semibold">
            ← Instruktorlar jamoasi
          </Link>
          <AdminNav />
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="font-display text-2xl font-bold text-stone-900 mb-6">Instruktorni tahrirlash</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Ism familiya</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Lavozim / mutaxassislik</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Yoʻnalishlar (qaysi yoʻnalishlar boʻyicha ishlaydi)</label>
            <div className="flex flex-wrap gap-3">
              {directions.map((d) => (
                <label key={d.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={directionIds.includes(d.id)}
                    onChange={() => toggleDirection(d.id)}
                    className="rounded border-stone-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-stone-700">{d.name}</span>
                </label>
              ))}
            </div>
            {directions.length === 0 && <p className="text-stone-500 text-sm">Avval Yoʻnalishlar boʻlimida yoʻnalishlar qoʻshing.</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Qisqacha</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Rasm URL (ixtiyoriy)</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Telegram ID (jadval yuborish uchun; bot /start dan keyin olinadi)</label>
            <input
              type="text"
              value={telegramId}
              onChange={(e) => setTelegramId(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 outline-none"
              placeholder="123456789"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Darsdan instruktor ulushi (%)</label>
            <select value={sharePercent} onChange={(e) => setSharePercent(Number(e.target.value))} className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 outline-none">
              <option value={40}>40%</option>
              <option value={50}>50%</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Tartib raqami (kichik = birinchi)</label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 disabled:opacity-50"
            >
              {saving ? "Saqlanmoqda…" : "Saqlash"}
            </button>
            <Link href="/admin/instructors" className="px-6 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-medium hover:bg-stone-50 inline-block">
              Bekor qilish
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
