import { NextRequest, NextResponse } from "next/server";
import { data } from "@/lib/data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const instructorId = searchParams.get("instructorId");
  const date = searchParams.get("date");
  if (!instructorId) return NextResponse.json({ error: "instructorId kerak" }, { status: 400 });
  let slots = await data.schedule();
  slots = slots.filter((s) => s.instructorId === instructorId && s.status === "completed");
  if (date) slots = slots.filter((s) => s.date === date);
  slots.sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
  const totalSum = slots.reduce((sum, s) => sum + (s.completedInstructorShare ?? 0), 0);
  return NextResponse.json({ lessons: slots, totalSum });
}
