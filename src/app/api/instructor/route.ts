import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { MainInstructor } from "@/lib/instructor";

const DATA_PATH = path.join(process.cwd(), "data", "instructor.json");

function checkAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  const token = process.env.ADMIN_SECRET || "rivoj-admin-2025";
  return authHeader === `Bearer ${token}`;
}

async function readInstructor(): Promise<MainInstructor | null> {
  try {
    const data = await fs.readFile(DATA_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return null;
  }
}

async function writeInstructor(data: MainInstructor) {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  const data = await readInstructor();
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const current = await readInstructor();
  const updated: MainInstructor = {
    name: body.name ?? current?.name ?? "",
    title: body.title ?? current?.title ?? "",
    bio: body.bio ?? current?.bio ?? "",
    image: body.image ?? current?.image,
    phone: body.phone ?? current?.phone,
    telegram: body.telegram ?? current?.telegram,
    showOnHome: body.showOnHome ?? current?.showOnHome ?? true,
  };
  await writeInstructor(updated);
  return NextResponse.json(updated);
}
