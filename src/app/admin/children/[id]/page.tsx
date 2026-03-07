"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import AdminNav from "@/components/AdminNav";
import type { Child } from "@/lib/types";
import type { Enrollment } from "@/lib/types";
import type { ScheduleSlot } from "@/lib/types";
import type { Direction } from "@/lib/types";
import type { Lesson } from "@/lib/types";
import { SCHEDULE_TIMES } from "@/lib/types";
import type { TeamInstructor } from "@/lib/instructor";

export default function ChildProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const [child, setChild] = useState<Child | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [slots, setSlots] = useState<ScheduleSlot[]>([]);
  const [directions, setDirections] = useState<Direction[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [instructors, setInstructors] = useState<TeamInstructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [addDate, setAddDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [addTime, setAddTime] = useState("09:00");
  const [addInstructorId, setAddInstructorId] = useState("");
  const [addEnrollmentId, setAddEnrollmentId] = useState("");
  const [adding, setAdding] = useState(false);
  const token = typeof window !== "undefined" ? localStorage.getItem("rivoj_admin_token") : null;

  useEffect(() => {
    if (!token) {
      window.location.href = "/admin";
      return;
    }
    Promise.all([
      fetch("/api/children", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
      fetch(`/api/enrollments?childId=${id}`, { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
      fetch(`/api/schedule?childId=${id}`, { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
      fetch("/api/directions", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
      fetch("/api/lessons", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
      fetch("/api/instructors", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
    ]).then(([children, enroll, sched, dirs, less, inst]) => {
      setChild(children.find((c: Child) => c.id === id) ?? null);
      setEnrollments(enroll);
      setSlots(sched);
      setDirections(dirs);
      setLessons(less);
      setInstructors(inst);
    }).finally(() => setLoading(false));
  }, [id, token]);

  const dir = (directionId: string) => directions.find((d) => d.id === directionId)?.name ?? "";
  const lesson = (lessonId: string) => lessons.find((l) => l.id === lessonId)?.name ?? "";
  const inst = (instructorId: string) => instructors.find((i) => i.id === instructorId)?.name ?? "";

  if (!token && !loading) return null;
  if (loading) return <div className="min-h-screen bg-stone-100 flex items-center justify-center">Yuklanmoqda…</div>;
  if (!child) return <div className="min-h-screen bg-stone-100 flex items-center justify-center">Topilmadi</div>;

  const completed = slots.filter((s) => s.status === "completed");
  const scheduled = slots.filter((s) => s.status === "scheduled");

  const enrollmentsForInstructor = addInstructorId
    ? enrollments.filter((e) => e.instructorId === addInstructorId)
    : [];
  const selectedEnrollment = addEnrollmentId
    ? enrollments.find((e) => e.id === addEnrollmentId)
    : null;

  async function handleAddSlot(e: React.FormEvent) {
    e.preventDefault();
    if (!token || !selectedEnrollment) return;
    setAdding(true);
    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          date: addDate,
          time: addTime,
          instructorId: selectedEnrollment.instructorId,
          childId: id,
          directionId: selectedEnrollment.directionId,
          lessonId: selectedEnrollment.lessonId,
          price: selectedEnrollment.pricePerSession,
        }),
      });
      if (res.ok) {
        const newSlot = await res.json();
        setSlots((prev) => [...prev, newSlot]);
        setAddEnrollmentId("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAdding(false);
    }
  }

  return (
    <div className="min-h-screen bg-stone-100">
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/admin/children" className="text-primary-600 hover:underline font-display font-semibold">← Bolalar</Link>
            <span className="font-display font-semibold text-stone-800">{child.fullName}</span>
          </div>
          <div className="flex items-center gap-3">
            <AdminNav />
            <Link href={`/admin/children/${id}/tahrir`} className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 font-medium hover:bg-stone-50">Tahrirlash</Link>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <section className="bg-white rounded-2xl border border-stone-200 p-6">
          <h2 className="font-display text-lg font-semibold text-stone-900 mb-2">Maʼlumot</h2>
          <p>Tugʻilgan yili: {child.birthYear}</p>
          {child.parentPhone && <p>Telefon: {child.parentPhone}</p>}
          {child.parentTelegram && <p>Telegram: {child.parentTelegram}</p>}
        </section>

        <section className="bg-white rounded-2xl border border-stone-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-stone-900">Yoʻnalishlar va darslar</h2>
            <Link href={`/admin/children/${id}/enrollment`} className="text-primary-600 hover:underline text-sm">+ Qoʻshish</Link>
          </div>
          {enrollments.length === 0 ? (
            <p className="text-stone-500">Hali qoʻshilmagan. Bola qaysi yoʻnalishda, qaysi dars, qaysi instruktor va narxni belgilang.</p>
          ) : (
            <ul className="space-y-2">
              {enrollments.map((e) => (
                <li key={e.id} className="flex justify-between py-2 border-b border-stone-100 last:border-0">
                  <span>{dir(e.directionId)} — {lesson(e.lessonId)}, {inst(e.instructorId)}</span>
                  <span className="text-stone-600">{e.pricePerSession.toLocaleString()} soʻm</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="bg-white rounded-2xl border border-stone-200 p-6">
          <h2 className="font-display text-lg font-semibold text-stone-900 mb-4">Jadvalga dars qoʻshish</h2>
          <p className="text-stone-600 text-sm mb-4">Sana, vaqt, instruktor va darsni belgilang — slot jadvalda va instruktor profilida avtomatik paydo boʻladi.</p>
          <form onSubmit={handleAddSlot} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Sana</label>
              <input type="date" value={addDate} onChange={(e) => setAddDate(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Vaqt</label>
              <select value={addTime} onChange={(e) => setAddTime(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 outline-none" required>
                {SCHEDULE_TIMES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Instruktor</label>
              <select value={addInstructorId} onChange={(e) => { setAddInstructorId(e.target.value); setAddEnrollmentId(""); }} className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 outline-none" required>
                <option value="">Tanlang</option>
                {instructors.map((i) => (
                  <option key={i.id} value={i.id}>{i.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Dars (yoʻnalish)</label>
              <select value={addEnrollmentId} onChange={(e) => setAddEnrollmentId(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500 outline-none" required disabled={!addInstructorId}>
                <option value="">Tanlang</option>
                {enrollmentsForInstructor.map((e) => (
                  <option key={e.id} value={e.id}>{dir(e.directionId)} — {lesson(e.lessonId)} ({e.pricePerSession.toLocaleString()} soʻm)</option>
                ))}
              </select>
            </div>
            <div>
              <button type="submit" disabled={adding || !selectedEnrollment} className="w-full px-4 py-2 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 disabled:opacity-50">
                {adding ? "Qoʻshilmoqda…" : "Jadvalga qoʻshish"}
              </button>
            </div>
          </form>
          {enrollments.length === 0 && (
            <p className="text-amber-700 text-sm mt-2">Avval «Yoʻnalishlar va darslar» boʻlimida instruktor va darsni qoʻshing.</p>
          )}
        </section>

        <section className="bg-white rounded-2xl border border-stone-200 p-6">
          <h2 className="font-display text-lg font-semibold text-stone-900 mb-4">Rejalashtirilgan darslar</h2>
          {scheduled.length === 0 ? <p className="text-stone-500">Rejalashtirilgan darslar yoʻq.</p> : (
            <ul className="space-y-2">
              {scheduled.map((s) => (
                <li key={s.id} className="flex justify-between py-2">
                  <span>{s.date} {s.time} — {dir(s.directionId)}, {lesson(s.lessonId)}, {inst(s.instructorId)}</span>
                  <span>{s.price.toLocaleString()} soʻm</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="bg-white rounded-2xl border border-stone-200 p-6">
          <h2 className="font-display text-lg font-semibold text-stone-900 mb-4">Oʻtilgan darslar</h2>
          {completed.length === 0 ? <p className="text-stone-500">Oʻtilgan darslar yoʻq.</p> : (
            <ul className="space-y-2">
              {completed.map((s) => (
                <li key={s.id} className="flex justify-between py-2">
                  <span>{s.date} {s.time} — {dir(s.directionId)}, {lesson(s.lessonId)}, {inst(s.instructorId)}</span>
                  <span>{s.completedTotalSum?.toLocaleString()} soʻm</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
