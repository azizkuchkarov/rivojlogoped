"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import AdminNav from "@/components/AdminNav";
import type { ScheduleSlot } from "@/lib/types";
import type { TeamInstructor } from "@/lib/instructor";
import type { Child } from "@/lib/types";
import type { Direction } from "@/lib/types";
import type { Lesson } from "@/lib/types";

export default function InstructorStatsPage() {
  const params = useParams();
  const id = params.id as string;
  const [instructor, setInstructor] = useState<TeamInstructor | null>(null);
  const [children, setChildren] = useState<Child[]>([]);
  const [directions, setDirections] = useState<Direction[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [stats, setStats] = useState<{ lessons: ScheduleSlot[]; totalSum: number } | null>(null);
  const [allTime, setAllTime] = useState<{ lessons: ScheduleSlot[]; totalSum: number } | null>(null);
  const [scheduledSlots, setScheduledSlots] = useState<ScheduleSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const token = typeof window !== "undefined" ? localStorage.getItem("rivoj_admin_token") : null;

  const childName = (childId: string) => children.find((c) => c.id === childId)?.fullName ?? childId;
  const dirName = (directionId: string) => directions.find((d) => d.id === directionId)?.name ?? "";
  const lessonName = (lessonId: string) => lessons.find((l) => l.id === lessonId)?.name ?? "";

  useEffect(() => {
    if (!token) {
      window.location.href = "/admin";
      return;
    }
    Promise.all([
      fetch("/api/instructors", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
      fetch("/api/children", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
      fetch("/api/directions", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
      fetch("/api/lessons", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
    ]).then(([list, childList, dirs, less]) => {
      setInstructor(list.find((i: TeamInstructor) => i.id === id) ?? null);
      setChildren(childList);
      setDirections(dirs);
      setLessons(less);
    }).finally(() => setLoading(false));
  }, [id, token]);

  useEffect(() => {
    if (!token || !id) return;
    Promise.all([
      fetch(`/api/stats/instructor?instructorId=${id}&date=${date}`, { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
      fetch(`/api/stats/instructor?instructorId=${id}`, { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
      fetch(`/api/schedule?instructorId=${id}&date=${date}`, { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
    ]).then(([byDate, all, sched]) => {
      setStats(byDate);
      setAllTime(all);
      setScheduledSlots((sched as ScheduleSlot[]).filter((s) => s.status === "scheduled").sort((a, b) => a.time.localeCompare(b.time)));
    });
  }, [id, date, token]);

  if (!token && !loading) return null;
  if (loading) return <div className="min-h-screen bg-stone-100 flex items-center justify-center">Yuklanmoqda…</div>;
  if (!instructor) return <div className="min-h-screen bg-stone-100 flex items-center justify-center">Topilmadi</div>;

  return (
    <div className="min-h-screen bg-stone-100">
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/admin/instructors" className="text-primary-600 hover:underline font-display font-semibold">← Instruktorlar</Link>
            <span className="font-display font-semibold text-stone-800">{instructor.name} — hisobot</span>
          </div>
          <AdminNav />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="px-3 py-2 rounded-xl border border-stone-300" />
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <section className="bg-white rounded-2xl border border-stone-200 p-6">
          <h2 className="font-display text-lg font-semibold text-stone-900 mb-2">Rejalashtirilgan darslar — {date}</h2>
          <p className="text-stone-600 text-sm mb-3">Bolaning profilida dars qoʻshilganda shu yerda avtomatik paydo boʻladi.</p>
          {scheduledSlots.length === 0 ? (
            <p className="text-stone-500">Ushbu sana uchun rejalashtirilgan darslar yoʻq.</p>
          ) : (
            <ul className="space-y-2">
              {scheduledSlots.map((s) => (
                <li key={s.id} className="flex justify-between py-2 border-b border-stone-100">
                  <span><strong>{s.time}</strong> — {childName(s.childId)}, {lessonName(s.lessonId)} ({dirName(s.directionId)})</span>
                  <span className="text-stone-600">{s.price.toLocaleString()} soʻm</span>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="bg-white rounded-2xl border border-stone-200 p-6">
          <h2 className="font-display text-lg font-semibold text-stone-900 mb-2">Oʻtilgan darslar — {date}</h2>
          <p className="text-stone-600">Darslar soni: {stats?.lessons?.length ?? 0}</p>
          <p className="text-primary-600 font-semibold">Umumiy summa (instruktor ulushi): {(stats?.totalSum ?? 0).toLocaleString()} soʻm</p>
          {stats?.lessons?.length ? (
            <ul className="mt-4 space-y-2">
              {stats.lessons.map((s) => (
                <li key={s.id} className="flex justify-between py-2 border-b border-stone-100">
                  <span>{s.time} — {childName(s.childId)}</span>
                  <span>{(s.completedInstructorShare ?? 0).toLocaleString()} soʻm</span>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
        <section className="bg-white rounded-2xl border border-stone-200 p-6">
          <h2 className="font-display text-lg font-semibold text-stone-900 mb-2">Umumiy (barcha kunlar)</h2>
          <p className="text-stone-600">Jami darslar: {allTime?.lessons?.length ?? 0}</p>
          <p className="text-primary-600 font-semibold">Jami summa: {(allTime?.totalSum ?? 0).toLocaleString()} soʻm</p>
        </section>
      </main>
    </div>
  );
}
