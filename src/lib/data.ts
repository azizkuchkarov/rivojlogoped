import path from "path";
import { promises as fs } from "fs";
import type { Direction, Lesson, Child, Enrollment, ScheduleSlot } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");

async function readJson<T>(filename: string, fallback: T): Promise<T> {
  try {
    const data = await fs.readFile(path.join(DATA_DIR, filename), "utf-8");
    return JSON.parse(data) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(filename: string, payload: unknown) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(path.join(DATA_DIR, filename), JSON.stringify(payload, null, 2), "utf-8");
}

export const data = {
  directions: () => readJson<Direction[]>("directions.json", []),
  writeDirections: (arr: Direction[]) => writeJson("directions.json", arr),

  lessons: () => readJson<Lesson[]>("lessons.json", []),
  writeLessons: (arr: Lesson[]) => writeJson("lessons.json", arr),

  children: () => readJson<Child[]>("children.json", []),
  writeChildren: (arr: Child[]) => writeJson("children.json", arr),

  enrollments: () => readJson<Enrollment[]>("enrollments.json", []),
  writeEnrollments: (arr: Enrollment[]) => writeJson("enrollments.json", arr),

  schedule: () => readJson<ScheduleSlot[]>("schedule.json", []),
  writeSchedule: (arr: ScheduleSlot[]) => writeJson("schedule.json", arr),
};

export function checkAuth(request: Request): boolean {
  const authHeader = request.headers.get("authorization");
  const token = process.env.ADMIN_SECRET || "rivoj-admin-2025";
  return authHeader === `Bearer ${token}`;
}

export function nextId(): string {
  return String(Date.now());
}
