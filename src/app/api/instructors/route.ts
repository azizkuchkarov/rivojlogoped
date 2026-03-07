import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { TeamInstructor } from "@/lib/instructor";

const DATA_PATH = path.join(process.cwd(), "data", "instructors.json");

function checkAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  const token = process.env.ADMIN_SECRET || "rivoj-admin-2025";
  return authHeader === `Bearer ${token}`;
}

async function readInstructors(): Promise<TeamInstructor[]> {
  try {
    const data = await fs.readFile(DATA_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeInstructors(items: TeamInstructor[]) {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(items, null, 2), "utf-8");
}

export async function GET() {
  const items = await readInstructors();
  const sorted = items.sort((a, b) => a.order - b.order);
  return NextResponse.json(sorted);
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const items = await readInstructors();
  const id = String(Date.now());
  const newItem: TeamInstructor = {
    id,
    name: body.name ?? "",
    role: body.role ?? "",
    bio: body.bio ?? "",
    image: body.image,
    order: typeof body.order === "number" ? body.order : items.length,
    telegramId: body.telegramId ?? undefined,
    sharePercent: body.sharePercent !== undefined ? Number(body.sharePercent) : undefined,
    directionIds: Array.isArray(body.directionIds) ? body.directionIds : [],
  };
  items.push(newItem);
  await writeInstructors(items);
  return NextResponse.json(newItem);
}

export async function PUT(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const items = await readInstructors();
  const idx = items.findIndex((i) => i.id === body.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  items[idx] = {
    ...items[idx],
    name: body.name ?? items[idx].name,
    role: body.role ?? items[idx].role,
    bio: body.bio ?? items[idx].bio,
    image: body.image !== undefined ? body.image : items[idx].image,
    order: typeof body.order === "number" ? body.order : items[idx].order,
    telegramId: body.telegramId !== undefined ? body.telegramId : items[idx].telegramId,
    sharePercent: body.sharePercent !== undefined ? Number(body.sharePercent) : items[idx].sharePercent,
    directionIds: body.directionIds !== undefined ? (Array.isArray(body.directionIds) ? body.directionIds : items[idx].directionIds ?? []) : items[idx].directionIds ?? [],
  };
  await writeInstructors(items);
  return NextResponse.json(items[idx]);
}

export async function DELETE(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  const items = (await readInstructors()).filter((i) => i.id !== id);
  await writeInstructors(items);
  return NextResponse.json({ ok: true });
}
