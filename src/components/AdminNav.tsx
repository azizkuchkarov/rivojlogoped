import Link from "next/link";

export default function AdminNav() {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm">
      <Link href="/admin/directions" className="px-3 py-1.5 rounded-lg text-stone-600 hover:bg-stone-100 hover:text-stone-900">
        Yoʻnalishlar
      </Link>
      <Link href="/admin/lessons" className="px-3 py-1.5 rounded-lg text-stone-600 hover:bg-stone-100 hover:text-stone-900">
        Darslar
      </Link>
      <Link href="/admin/children" className="px-3 py-1.5 rounded-lg text-stone-600 hover:bg-stone-100 hover:text-stone-900">
        Bolalar
      </Link>
      <Link href="/admin/schedule" className="px-3 py-1.5 rounded-lg text-stone-600 hover:bg-stone-100 hover:text-stone-900">
        Jadval
      </Link>
      <Link href="/admin/instructors" className="px-3 py-1.5 rounded-lg text-stone-600 hover:bg-stone-100 hover:text-stone-900">
        Instruktorlar
      </Link>
      <Link href="/admin/instructor" className="px-3 py-1.5 rounded-lg text-stone-600 hover:bg-stone-100 hover:text-stone-900">
        Asosiy instruktor
      </Link>
      <Link href="/admin/news" className="px-3 py-1.5 rounded-lg text-stone-600 hover:bg-stone-100 hover:text-stone-900">
        Yangiliklar
      </Link>
    </nav>
  );
}
