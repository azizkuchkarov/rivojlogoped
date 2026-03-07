import { NextRequest, NextResponse } from "next/server";
import { data, checkAuth, nextId } from "@/lib/data";

export async function GET() {
  const list = await data.directions();
  return NextResponse.json(list.sort((a, b) => a.order - b.order));
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const list = await data.directions();
  const id = nextId();
  const newItem = {
    id,
    name: body.name ?? "",
    order: typeof body.order === "number" ? body.order : list.length,
  };
  list.push(newItem);
  await data.writeDirections(list);
  return NextResponse.json(newItem);
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const list = await data.directions();
  const idx = list.findIndex((d) => d.id === body.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  list[idx] = { ...list[idx], name: body.name ?? list[idx].name, order: body.order ?? list[idx].order };
  await data.writeDirections(list);
  return NextResponse.json(list[idx]);
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  const list = (await data.directions()).filter((d) => d.id !== id);
  await data.writeDirections(list);
  return NextResponse.json({ ok: true });
}
