import { NextRequest, NextResponse } from "next/server";
import { data, checkAuth, nextId } from "@/lib/data";
import type { ScheduleSlot } from "@/lib/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const instructorId = searchParams.get("instructorId");
  const childId = searchParams.get("childId");
  let list = await data.schedule();
  if (date) list = list.filter((s) => s.date === date);
  if (instructorId) list = list.filter((s) => s.instructorId === instructorId);
  if (childId) list = list.filter((s) => s.childId === childId);
  list.sort((a, b) => a.time.localeCompare(b.time));
  return NextResponse.json(list);
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const list = await data.schedule();
  const id = nextId();
  const newItem: ScheduleSlot = {
    id,
    date: body.date ?? "",
    time: body.time ?? "08:00",
    instructorId: body.instructorId ?? "",
    childId: body.childId ?? "",
    directionId: body.directionId ?? "",
    lessonId: body.lessonId ?? "",
    price: Number(body.price) ?? 0,
    status: "scheduled",
  };
  list.push(newItem);
  await data.writeSchedule(list);
  return NextResponse.json(newItem);
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const list = await data.schedule();
  const idx = list.findIndex((s) => s.id === body.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const prev = list[idx];
  list[idx] = {
    ...prev,
    date: body.date ?? prev.date,
    time: body.time ?? prev.time,
    instructorId: body.instructorId ?? prev.instructorId,
    childId: body.childId ?? prev.childId,
    directionId: body.directionId ?? prev.directionId,
    lessonId: body.lessonId ?? prev.lessonId,
    price: body.price !== undefined ? Number(body.price) : prev.price,
    status: body.status ?? prev.status,
    completedTotalSum: body.completedTotalSum ?? prev.completedTotalSum,
    completedInstructorShare: body.completedInstructorShare ?? prev.completedInstructorShare,
    completedAt: body.completedAt ?? prev.completedAt,
  };
  await data.writeSchedule(list);
  return NextResponse.json(list[idx]);
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  const list = (await data.schedule()).filter((s) => s.id !== id);
  await data.writeSchedule(list);
  return NextResponse.json({ ok: true });
}
