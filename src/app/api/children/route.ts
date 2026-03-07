import { NextRequest, NextResponse } from "next/server";
import { data, checkAuth, nextId } from "@/lib/data";

export async function GET() {
  const list = await data.children();
  return NextResponse.json(list);
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const list = await data.children();
  const id = nextId();
  const newItem = {
    id,
    fullName: body.fullName ?? "",
    birthYear: Number(body.birthYear) || new Date().getFullYear(),
    parentPhone: body.parentPhone ?? undefined,
    parentTelegram: body.parentTelegram ?? undefined,
    createdAt: new Date().toISOString(),
  };
  list.push(newItem);
  await data.writeChildren(list);
  return NextResponse.json(newItem);
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const list = await data.children();
  const idx = list.findIndex((c) => c.id === body.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  list[idx] = {
    ...list[idx],
    fullName: body.fullName ?? list[idx].fullName,
    birthYear: Number(body.birthYear) ?? list[idx].birthYear,
    parentPhone: body.parentPhone !== undefined ? body.parentPhone : list[idx].parentPhone,
    parentTelegram: body.parentTelegram !== undefined ? body.parentTelegram : list[idx].parentTelegram,
  };
  await data.writeChildren(list);
  return NextResponse.json(list[idx]);
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  const list = (await data.children()).filter((c) => c.id !== id);
  await data.writeChildren(list);
  return NextResponse.json({ ok: true });
}
