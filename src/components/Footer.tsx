import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-display font-bold text-xl text-white">
            Rivoj Logoped
          </div>
          <nav className="flex gap-6">
            <a href="#xizmatlar" className="hover:text-white transition">Xizmatlar</a>
            <Link href="/instruktorlar" className="hover:text-white transition">Instruktorlar</Link>
            <a href="#yangiliklar" className="hover:text-white transition">Yangiliklar</a>
            <a href="#bog-lanish" className="hover:text-white transition">Bogʻlanish</a>
            <Link href="/admin" className="hover:text-white transition">Admin</Link>
          </nav>
        </div>
        <p className="text-center text-stone-500 text-sm mt-8">
          © {new Date().getFullYear()} Rivoj. Logoped, ABA, Sensor integratsiya, Defektolog.
        </p>
      </div>
    </footer>
  );
}
