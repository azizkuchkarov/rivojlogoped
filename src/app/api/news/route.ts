import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { NewsItem } from "@/lib/news";

const DATA_PATH = path.join(process.cwd(), "data", "news.json");

async function readNews(): Promise<NewsItem[]> {
  try {
    const data = await fs.readFile(DATA_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeNews(items: NewsItem[]) {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(items, null, 2), "utf-8");
}

function checkAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  const token = process.env.ADMIN_SECRET || "rivoj-admin-2025";
  return authHeader === `Bearer ${token}`;
}

export async function GET(request: NextRequest) {
  const items = await readNews();
  const isAdmin = checkAuth(request);
  const list = isAdmin
    ? items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    : items.filter((n) => n.published).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return NextResponse.json(list);
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const items = await readNews();
  const id = String(Date.now());
  const newItem: NewsItem = {
    id,
    title: body.title ?? "",
    slug: body.slug ?? body.title?.toLowerCase().replace(/\s+/g, "-") ?? id,
    excerpt: body.excerpt ?? "",
    content: body.content ?? "",
    image: body.image,
    date: body.date ?? new Date().toISOString().slice(0, 10),
    published: body.published ?? false,
    createdAt: new Date().toISOString(),
  };
  items.push(newItem);
  await writeNews(items);
  return NextResponse.json(newItem);
}

export async function PUT(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const items = await readNews();
  const idx = items.findIndex((n) => n.id === body.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  items[idx] = {
    ...items[idx],
    ...body,
    id: items[idx].id,
    createdAt: items[idx].createdAt,
  };
  await writeNews(items);
  return NextResponse.json(items[idx]);
}

export async function DELETE(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  const items = await readNews().then((list) => list.filter((n) => n.id !== id));
  await writeNews(items);
  return NextResponse.json({ ok: true });
}
