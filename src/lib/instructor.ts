import path from "path";
import { promises as fs } from "fs";

export interface MainInstructor {
  name: string;
  title: string;
  bio: string;
  image?: string;
  phone?: string;
  telegram?: string;
  showOnHome: boolean;
}

export interface TeamInstructor {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  order: number;
  telegramId?: string;
  sharePercent?: number; // 40 yoki 50
  directionIds?: string[]; // qaysi yoʻnalishlar boʻyicha ishlaydi (masalan: Defektolog)
}

const INSTRUCTOR_FILE = "data/instructor.json";
const INSTRUCTORS_FILE = "data/instructors.json";

const defaultMain: MainInstructor = {
  name: "",
  title: "",
  bio: "",
  showOnHome: true,
};

export async function getMainInstructor(): Promise<MainInstructor | null> {
  try {
    const filePath = path.join(process.cwd(), INSTRUCTOR_FILE);
    const data = await fs.readFile(filePath, "utf-8");
    const parsed = JSON.parse(data);
    return { ...defaultMain, ...parsed };
  } catch {
    return null;
  }
}

export async function getInstructorsTeam(): Promise<TeamInstructor[]> {
  try {
    const filePath = path.join(process.cwd(), INSTRUCTORS_FILE);
    const data = await fs.readFile(filePath, "utf-8");
    const items: TeamInstructor[] = JSON.parse(data);
    return items.sort((a, b) => a.order - b.order);
  } catch {
    return [];
  }
}
