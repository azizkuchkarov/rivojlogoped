import { NextRequest, NextResponse } from "next/server";
import { data, checkAuth, nextId } from "@/lib/data";

export async function GET(req: NextRequest) {
  const childId = new URL(req.url).searchParams.get("childId");
  let list = await data.enrollments();
  if (childId) list = list.filter((e) => e.childId === childId);
  return NextResponse.json(list);
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const list = await data.enrollments();
  const id = nextId();
  const newItem = {
    id,
    childId: body.childId ?? "",
    directionId: body.directionId ?? "",
    lessonId: body.lessonId ?? "",
    instructorId: body.instructorId ?? "",
    pricePerSession: Number(body.pricePerSession) || 0,
    createdAt: new Date().toISOString(),
  };
  list.push(newItem);
  await data.writeEnrollments(list);
  return NextResponse.json(newItem);
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const list = await data.enrollments();
  const idx = list.findIndex((e) => e.id === body.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  list[idx] = {
    ...list[idx],
    childId: body.childId ?? list[idx].childId,
    directionId: body.directionId ?? list[idx].directionId,
    lessonId: body.lessonId ?? list[idx].lessonId,
    instructorId: body.instructorId ?? list[idx].instructorId,
    pricePerSession: Number(body.pricePerSession) ?? list[idx].pricePerSession,
  };
  await data.writeEnrollments(list);
  return NextResponse.json(list[idx]);
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  const list = (await data.enrollments()).filter((e) => e.id !== id);
  await data.writeEnrollments(list);
  return NextResponse.json({ ok: true });
}
