import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "rivoj2025";
const ADMIN_SECRET = process.env.ADMIN_SECRET || "rivoj-admin-2025";

export async function POST(request: NextRequest) {
  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Soʻrov formati notoʻgʻri" },
      { status: 400 }
    );
  }
  const password = body?.password ?? "";
  if (password === ADMIN_PASSWORD) {
    return NextResponse.json({ token: ADMIN_SECRET });
  }
  return NextResponse.json(
    { error: "Parol notoʻgʻri. Sukutdagi parol: rivoj2025" },
    { status: 401 }
  );
}
