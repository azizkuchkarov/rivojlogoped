"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import AdminNav from "@/components/AdminNav";
import type { Direction } from "@/lib/types";
import type { Lesson } from "@/lib/types";
import type { TeamInstructor } from "@/lib/instructor";

export default function NewEnrollmentPage() {
  const params = useParams();
  const childId = params.id as string;
  const router = useRouter();
  const [directionId, setDirectionId] = useState("");
  const [lessonId, setLessonId] = useState("");
  const [instructorId, setInstructorId] = useState("");
  const [pricePerSession, setPricePerSession] = useState(100000);
  const [directions, setDirections] = useState<Direction[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [instructors, setInstructors] = useState<TeamInstructor[]>([]);
  const [saving, setSaving] = useState(false);
  const token = typeof window !== "undefined" ? localStorage.getItem("rivoj_admin_token") : null;

  useEffect(() => {
    if (!token) return;
    Promise.all([
      fetch("/api/directions", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
      fetch("/api/lessons", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
      fetch("/api/instructors", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
    ]).then(([dirs, less, inst]) => {
      setDirections(dirs);
      setLessons(less);
      setInstructors(inst);
      if (dirs.length) setDirectionId(dirs[0].id);
    });
  }, [token]);

  useEffect(() => {
    if (!directionId) return;
    const dirLessons = lessons.filter((l) => l.directionId === directionId);
    setLessonId(dirLessons[0]?.id ?? "");
  }, [directionId, lessons]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) {
      router.push("/admin");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ childId, directionId, lessonId, instructorId, pricePerSession }),
      });
      if (res.ok) {
        router.push(`/admin/children/${childId}`);
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

  const dirLessons = lessons.filter((l) => l.directionId === directionId);

  return (
    <div className="min-h-screen bg-stone-100">
      <header className="bg-white border-b border-stone-200 px-4 py-4">
        <Link href={`/admin/children/${childId}`} className="text-primary-600 hover:underline font-display font-semibold">← Profil</Link>
        <AdminNav />
      </header>
      <main className="max-w-md mx-auto px-4 py-8">
        <h1 className="font-display text-2xl font-bold text-stone-900 mb-6">Yoʻnalish va dars qoʻshish</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Yoʻnalish</label>
            <select value={directionId} onChange={(e) => setDirectionId(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 outline-none" required>
              {directions.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Dars</label>
            <select value={lessonId} onChange={(e) => setLessonId(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 outline-none" required>
              {dirLessons.map((l) => (
                <option key={l.id} value={l.id}>{l.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Instruktor</label>
            <select value={instructorId} onChange={(e) => setInstructorId(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 outline-none" required>
              <option value="">Tanlang</option>
              {instructors.map((i) => (
                <option key={i.id} value={i.id}>{i.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Bir dars narxi (soʻm)</label>
            <input type="number" value={pricePerSession} onChange={(e) => setPricePerSession(Number(e.target.value))} className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 outline-none" min={0} />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 disabled:opacity-50">{saving ? "Saqlanmoqda…" : "Saqlash"}</button>
            <Link href={`/admin/children/${childId}`} className="px-6 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-medium hover:bg-stone-50 inline-block">Bekor qilish</Link>
          </div>
        </form>
      </main>
    </div>
  );
}
