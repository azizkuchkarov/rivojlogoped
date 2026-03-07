import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { data, checkAuth } from "@/lib/data";
import type { ScheduleSlot } from "@/lib/types";

const INSTRUCTORS_PATH = path.join(process.cwd(), "data", "instructors.json");

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const slotId = body.slotId;
  const totalSum = Number(body.totalSum);
  if (!slotId || totalSum <= 0) {
    return NextResponse.json({ error: "slotId va totalSum kerak" }, { status: 400 });
  }
  const slots = await data.schedule();
  const slot = slots.find((s) => s.id === slotId);
  if (!slot) return NextResponse.json({ error: "Slot topilmadi" }, { status: 404 });
  if (slot.status === "completed") {
    return NextResponse.json({ error: "Dars allaqachon tugatilgan" }, { status: 400 });
  }
  const instructorsData = await fs.readFile(INSTRUCTORS_PATH, "utf-8").catch(() => "[]");
  const instructors: { id: string; sharePercent?: number }[] = JSON.parse(instructorsData);
  const inst = instructors.find((i) => i.id === slot.instructorId);
  const sharePercent = inst?.sharePercent ?? 50;
  const instructorShare = Math.round((totalSum * sharePercent) / 100);
  const idx = slots.findIndex((s) => s.id === slotId);
  slots[idx] = {
    ...slot,
    status: "completed",
    completedTotalSum: totalSum,
    completedInstructorShare: instructorShare,
    completedAt: new Date().toISOString(),
  };
  await data.writeSchedule(slots);
  return NextResponse.json(slots[idx]);
}
