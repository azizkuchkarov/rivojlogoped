import { NextRequest, NextResponse } from "next/server";
import { data } from "@/lib/data";
import { promises as fs } from "fs";
import path from "path";

// Bot yoki tashqi tizim telegramId (chat_id) orqali jadvalni soʻraydi.
// telegramId = instruktorning telegramId yoki ota-onaning chat_id (bolaning parentTelegram da saqlanadi).
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date") ?? new Date().toISOString().slice(0, 10);
  const telegramId = searchParams.get("telegramId");
  if (!telegramId) return NextResponse.json({ error: "telegramId kerak" }, { status: 400 });

  const [slots, instructors, children] = await Promise.all([
    data.schedule(),
    fs.readFile(path.join(process.cwd(), "data", "instructors.json"), "utf-8").then((d) => JSON.parse(d)).catch(() => []),
    data.children(),
  ]);

  const daySlots = slots.filter((s) => s.date === date);

  // Instruktor boʻyicha (telegramId instruktorning telegramId ga teng)
  const inst = instructors.find((i: { telegramId?: string }) => String(i.telegramId) === String(telegramId));
  if (inst) {
    const mySlots = daySlots.filter((s) => s.instructorId === inst.id).sort((a, b) => a.time.localeCompare(b.time));
    const lines = mySlots.map((s) => {
      const child = children.find((c) => c.id === s.childId);
      return `${s.time} — ${child?.fullName ?? s.childId}`;
    });
    return NextResponse.json({
      type: "instructor",
      name: inst.name,
      date,
      schedule: lines,
      slots: mySlots,
    });
  }

  // Ota-ona boʻyicha (telegramId bolaning parentTelegram ga teng)
  const child = children.find((c) => String(c.parentTelegram) === String(telegramId));
  if (child) {
    const mySlots = daySlots.filter((s) => s.childId === child.id).sort((a, b) => a.time.localeCompare(b.time));
    const instNames = Object.fromEntries(instructors.map((i: { id: string; name: string }) => [i.id, i.name]));
    const lines = mySlots.map((s) => `${s.time} — ${instNames[s.instructorId] ?? s.instructorId}`);
    return NextResponse.json({
      type: "parent",
      childName: child.fullName,
      date,
      schedule: lines,
      slots: mySlots,
    });
  }

  return NextResponse.json({ type: "unknown", schedule: [], message: "Jadval topilmadi. Telegram ID ni admin orqali tekshiring." });
}
