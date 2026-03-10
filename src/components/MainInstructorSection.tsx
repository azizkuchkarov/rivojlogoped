import { getMainInstructor } from "@/lib/instructor";
import Link from "next/link";

export default async function MainInstructorSection() {
  const instructor = await getMainInstructor();
  if (!instructor || !instructor.showOnHome || !instructor.name) return null;

  return (
    <section id="asosiy-instruktor" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <span className="text-primary-600 font-semibold">Asosiy instruktor</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
              {instructor.name}
            </h2>
            {instructor.title && (
              <p className="text-primary-600 font-medium mt-1">{instructor.title}</p>
            )}
            <p className="text-stone-600 mt-6 leading-relaxed whitespace-pre-line">
              {instructor.bio}
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <Link
                href="/instruktorlar"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition"
              >
                Jamoani koʻrish
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-56 sm:w-64 md:w-72 aspect-[3/4] rounded-2xl overflow-hidden bg-primary-100 shadow-xl">
              {instructor.image ? (
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-primary-300">
                  <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
