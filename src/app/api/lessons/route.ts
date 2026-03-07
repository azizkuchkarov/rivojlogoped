import { NextRequest, NextResponse } from "next/server";
import { data, checkAuth, nextId } from "@/lib/data";

export async function GET(req: NextRequest) {
  const directionId = new URL(req.url).searchParams.get("directionId");
  let list = await data.lessons();
  if (directionId) list = list.filter((l) => l.directionId === directionId);
  return NextResponse.json(list.sort((a, b) => a.order - b.order));
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const list = await data.lessons();
  const dirLessons = list.filter((l) => l.directionId === body.directionId);
  const id = nextId();
  const newItem = {
    id,
    directionId: body.directionId ?? "",
    name: body.name ?? "",
    order: typeof body.order === "number" ? body.order : dirLessons.length,
  };
  list.push(newItem);
  await data.writeLessons(list);
  return NextResponse.json(newItem);
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const list = await data.lessons();
  const idx = list.findIndex((l) => l.id === body.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  list[idx] = {
    ...list[idx],
    directionId: body.directionId ?? list[idx].directionId,
    name: body.name ?? list[idx].name,
    order: body.order ?? list[idx].order,
  };
  await data.writeLessons(list);
  return NextResponse.json(list[idx]);
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  const list = (await data.lessons()).filter((l) => l.id !== id);
  await data.writeLessons(list);
  return NextResponse.json({ ok: true });
}
