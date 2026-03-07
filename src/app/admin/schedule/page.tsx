"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminNav from "@/components/AdminNav";
import { SCHEDULE_TIMES } from "@/lib/types";
import type { ScheduleSlot } from "@/lib/types";
import type { TeamInstructor } from "@/lib/instructor";
import type { Child } from "@/lib/types";
import type { Enrollment } from "@/lib/types";
import type { Direction } from "@/lib/types";
import type { Lesson } from "@/lib/types";

export default function SchedulePage() {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [slots, setSlots] = useState<ScheduleSlot[]>([]);
  const [instructors, setInstructors] = useState<TeamInstructor[]>([]);
  const [children, setChildren] = useState<Child[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [directions, setDirections] = useState<Direction[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState<{ instructorId: string; time: string } | null>(null);
  const [completing, setCompleting] = useState<string | null>(null);
  const token = typeof window !== "undefined" ? localStorage.getItem("rivoj_admin_token") : null;

  useEffect(() => {
    const t = localStorage.getItem("rivoj_admin_token");
    if (!t) {
      window.location.href = "/admin";
      return;
    }
    Promise.all([
      fetch("/api/instructors", { headers: { Authorization: `Bearer ${t}` } }).then((r) => r.json()),
      fetch("/api/children", { headers: { Authorization: `Bearer ${t}` } }).then((r) => r.json()),
      fetch("/api/enrollments", { headers: { Authorization: `Bearer ${t}` } }).then((r) => r.json()),
      fetch("/api/directions", { headers: { Authorization: `Bearer ${t}` } }).then((r) => r.json()),
      fetch("/api/lessons", { headers: { Authorization: `Bearer ${t}` } }).then((r) => r.json()),
    ]).then(([inst, child, enroll, dir, less]) => {
      setInstructors(inst);
      setChildren(child);
      setEnrollments(enroll);
      setDirections(dir);
      setLessons(less);
    }).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!token || !date) return;
    fetch(`/api/schedule?date=${date}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then(setSlots);
  }, [date, token]);

  const getSlot = (instructorId: string, time: string) =>
    slots.find((s) => s.instructorId === instructorId && s.time === time && s.date === date);

  const childName = (childId: string) => children.find((c) => c.id === childId)?.fullName ?? "";
  const dirName = (id: string) => directions.find((d) => d.id === id)?.name ?? "";
  const lessonName = (id: string) => lessons.find((l) => l.id === id)?.name ?? "";

  async function addSlot(instructorId: string, time: string, childId: string, enrollment: Enrollment) {
    if (!token) return;
    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          date,
          time,
          instructorId,
          childId,
          directionId: enrollment.directionId,
          lessonId: enrollment.lessonId,
          price: enrollment.pricePerSession,
        }),
      });
      if (res.ok) {
        const newSlot = await res.json();
        setSlots((prev) => [...prev, newSlot]);
        setAdding(null);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function removeSlot(slotId: string) {
    if (!token || !confirm("Oʻchirilsinmi?")) return;
    try {
      const res = await fetch(`/api/schedule?id=${slotId}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setSlots((prev) => prev.filter((s) => s.id !== slotId));
    } catch (e) {
      console.error(e);
    }
  }

  async function completeSlot(slotId: string, totalSum: number) {
    if (!token) return;
    setCompleting(slotId);
    try {
      const res = await fetch("/api/schedule/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ slotId, totalSum }),
      });
      if (res.ok) {
        const updated = await res.json();
        setSlots((prev) => prev.map((s) => (s.id === slotId ? updated : s)));
        setCompleting(null);
      }
    } catch (e) {
      console.error(e);
      setCompleting(null);
    }
  }

  if (!token && !loading) return null;
  if (loading) return <div className="min-h-screen bg-stone-100 flex items-center justify-center">Yuklanmoqda…</div>;

  const instructorEnrollments = (instructorId: string) =>
    enrollments.filter((e) => e.instructorId === instructorId);
  const childIdsForInstructor = (instructorId: string) =>
    Array.from(new Set(instructorEnrollments(instructorId).map((e) => e.childId)));

  return (
    <div className="min-h-screen bg-stone-100">
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-primary-600 hover:underline font-display font-semibold">Rivoj</Link>
            <span className="text-stone-400">/</span>
            <span className="font-display font-semibold text-stone-800">Jadval</span>
          </div>
          <div className="flex items-center gap-3">
            <AdminNav />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="px-3 py-2 rounded-xl border border-stone-300" />
            <button type="button" onClick={() => { localStorage.removeItem("rivoj_admin_token"); window.location.href = "/admin"; }} className="px-4 py-2 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-100">Chiqish</button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8 overflow-x-auto">
        <p className="text-stone-600 text-sm mb-4">Dars 50 min, tanaffus 10 min. 08:00–19:00</p>
        <table className="w-full bg-white rounded-xl border border-stone-200 overflow-hidden">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200">
              <th className="text-left p-3 font-semibold text-stone-800">Instruktor</th>
              {SCHEDULE_TIMES.map((t) => (
                <th key={t} className="p-3 font-semibold text-stone-800 text-center">{t}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {instructors.map((inst) => (
              <tr key={inst.id} className="border-b border-stone-100">
                <td className="p-3 font-medium text-stone-900 whitespace-nowrap">{inst.name}</td>
                {SCHEDULE_TIMES.map((time) => {
                  const slot = getSlot(inst.id, time);
                  const isAdding = adding?.instructorId === inst.id && adding?.time === time;
                  const enrolls = instructorEnrollments(inst.id);
                  const childIds = childIdsForInstructor(inst.id);
                  return (
                    <td key={time} className="p-2 align-top border-l border-stone-100 min-w-[140px]">
                      {slot ? (
                        <div className="rounded-lg bg-primary-50 border border-primary-200 p-2 text-sm">
                          <div className="font-medium text-stone-900">{childName(slot.childId)}</div>
                          <div className="text-stone-600 text-xs">{dirName(slot.directionId)}, {lessonName(slot.lessonId)}</div>
                          <div className="text-stone-700 mt-1">{slot.price.toLocaleString()} soʻm</div>
                          {slot.status === "scheduled" && (
                            <div className="flex gap-1 mt-2 flex-wrap">
                              <button type="button" onClick={() => { const sum = prompt("Toʻlangan summa (soʻm)", String(slot.price)); if (sum) completeSlot(slot.id, Number(sum)); }} disabled={completing === slot.id} className="text-xs px-2 py-1 rounded bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50">Tugatish</button>
                              <button type="button" onClick={() => removeSlot(slot.id)} className="text-xs px-2 py-1 rounded border border-red-200 text-red-600 hover:bg-red-50">Oʻchirish</button>
                            </div>
                          )}
                          {slot.status === "completed" && (
                            <div className="text-xs text-green-700 mt-1">✓ Tugallandi ({slot.completedInstructorShare?.toLocaleString()} soʻm instruktor)</div>
                          )}
                        </div>
                      ) : isAdding ? (
                        <div className="rounded-lg border border-stone-300 p-2 space-y-1 max-h-48 overflow-y-auto">
                          {childIds.length === 0 ? (
                            <p className="text-xs text-stone-500">Ushbu instruktor uchun bola qoʻshilmagan. Bolaning profilida yoʻnalish qoʻshing.</p>
                          ) : (
                            childIds.map((cid) => {
                              const enr = enrolls.find((e) => e.childId === cid);
                              if (!enr) return null;
                              return (
                                <button key={enr.id} type="button" onClick={() => addSlot(inst.id, time, cid, enr)} className="block w-full text-left text-sm px-2 py-1.5 rounded hover:bg-stone-100">
                                  {childName(cid)} — {enr.pricePerSession.toLocaleString()} soʻm
                                </button>
                              );
                            })
                          )}
                          <button type="button" onClick={() => setAdding(null)} className="text-xs text-stone-500 hover:underline w-full text-center">Bekor</button>
                        </div>
                      ) : (
                        <button type="button" onClick={() => setAdding({ instructorId: inst.id, time })} className="w-full py-2 rounded-lg border border-dashed border-stone-300 text-stone-500 hover:bg-stone-50 text-sm">+ Qoʻshish</button>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
