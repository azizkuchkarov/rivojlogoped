// Yo'nalishlar (Defektolog, Logoped, ABA, ...)
export interface Direction {
  id: string;
  name: string;
  order: number;
}

// Har bir yo'nalishdagi dars nomlari (admin kiritadi)
export interface Lesson {
  id: string;
  directionId: string;
  name: string;
  order: number;
}

// Bolalar
export interface Child {
  id: string;
  fullName: string;
  birthYear: number;
  parentPhone?: string;
  parentTelegram?: string;
  createdAt: string;
}

// Bola qaysi yo'nalishda, qaysi dars, qaysi instruktor, narx (admin belgilaydi)
export interface Enrollment {
  id: string;
  childId: string;
  directionId: string;
  lessonId: string;
  instructorId: string;
  pricePerSession: number;
  createdAt: string;
}

// Jadval sloti: sana, vaqt, instruktor, bola, yo'nalish, dars, narx. Status = scheduled | completed
export const SCHEDULE_TIMES = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"] as const;
export const LESSON_DURATION_MIN = 50;
export const BREAK_MIN = 10;

export interface ScheduleSlot {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // 08:00 ... 19:00
  instructorId: string;
  childId: string;
  directionId: string;
  lessonId: string;
  price: number;
  status: "scheduled" | "completed";
  completedTotalSum?: number;
  completedInstructorShare?: number;
  completedAt?: string;
}
