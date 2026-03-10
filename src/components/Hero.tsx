export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center gradient-mesh pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.14),transparent_55%)]" />
      <div className="absolute inset-y-0 right-0 w-[28rem] bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.18),_transparent_60%)] blur-3xl opacity-70" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stone-50 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-in opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-primary-100 backdrop-blur text-primary-700 text-xs sm:text-sm font-medium shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Logopedika, defektologiya va ko‘p yo‘nalishli rivojlanish markazi
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.2rem] xl:text-[3.6rem] font-bold text-stone-900 leading-tight tracking-tight">
            Bolaning{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-primary-600">rivojlanishi</span>
              <span className="absolute inset-x-0 -bottom-1 h-3 bg-primary-100/70 rounded-full -z-0" />
            </span>{" "}
            uchun maksimal qulay muhit
          </h1>

          <p className="text-base sm:text-lg text-stone-600 max-w-xl">
            Logoped, defektolog, sensor integratsiya, neyropsixolog, bolalar psixologi, ART terapiya, intensiv darslar, erta rivojlantirish,
            inklyuziv va logopedik maktabga tayyorlov, hunar taʼlimi — barchasi bir markazda. Har bir yoʻnalish boʻyicha aniq darslar va
            jadval bilan ishlaymiz.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#bog-lanish"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary-600 text-white font-semibold shadow-lg shadow-primary-600/30 hover:bg-primary-700 hover:shadow-primary-600/40 hover:-translate-y-0.5 transition-all"
            >
              Bogʻlanish
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#xizmatlar"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-stone-300/80 bg-white/60 backdrop-blur text-stone-800 font-semibold hover:border-primary-400 hover:text-primary-700 hover:-translate-y-0.5 transition-all"
            >
              Barcha yo‘nalishlar
            </a>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 mt-4 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-stone-200 px-3 py-1 text-stone-700">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
              Logoped
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-stone-200 px-3 py-1 text-stone-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Defektolog
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-stone-200 px-3 py-1 text-stone-700">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              Sensor integratsiya
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-stone-200 px-3 py-1 text-stone-700">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Neyropsixolog
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-stone-200 px-3 py-1 text-stone-700">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              ART terapiya
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-stone-200 px-3 py-1 text-stone-700">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Intensiv darslar
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-200/70">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wide text-stone-500">Yo‘nalishlar</p>
              <p className="font-display text-2xl font-semibold text-stone-900">10+</p>
              <p className="text-xs text-stone-500">Logopedika va boshqa sohalar</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wide text-stone-500">Individual darslar</p>
              <p className="font-display text-2xl font-semibold text-stone-900">1:1</p>
              <p className="text-xs text-stone-500">Har bir bola uchun alohida reja</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wide text-stone-500">Onlayn kuzatuv</p>
              <p className="font-display text-2xl font-semibold text-stone-900">Jadval</p>
              <p className="text-xs text-stone-500">Darslar onlayn boshqaruvi</p>
            </div>
          </div>
        </div>

        <div className="relative lg:pl-8 animate-slide-up opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
          <div className="absolute -top-6 right-8 hidden sm:flex items-center gap-2 rounded-full bg-white/80 border border-stone-200/70 px-4 py-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-stone-600">Logopedika markazi • 2024+</span>
          </div>

          <div className="aspect-square max-w-md mx-auto rounded-3xl bg-gradient-to-br from-primary-400/20 via-primary-100/30 to-accent-200/25 p-1.5 shadow-2xl shadow-primary-200/40">
            <div className="w-full h-full rounded-[22px] bg-white/85 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-100/80 rounded-full blur-3xl" />
              <div className="absolute -left-10 bottom-0 w-40 h-40 bg-sky-100/80 rounded-full blur-3xl" />

              <div className="relative h-full flex flex-col justify-between p-6 sm:p-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-600 mb-3">
                    Bolalar rivojlanish platformasi
                  </p>
                  <p className="font-display text-xl sm:text-2xl font-semibold text-stone-900">
                    Bir joyda{" "}
                    <span className="text-primary-600">
                      logoped,
                    </span>{" "}
                    defektolog va boshqa yo‘nalishlar
                  </p>
                  <p className="text-xs sm:text-sm text-stone-600 mt-3">
                    Darslar jadvali, yo‘nalishlar va instruktorlar yagona tizimda. Har bir dars bolaning real ehtiyojiga moslangan.
                  </p>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="rounded-2xl border border-stone-200/70 bg-white/80 px-4 py-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-stone-500">Eng yaqin dars namunasi</p>
                      <p className="text-sm font-medium text-stone-900">
                        12:00 • Logoped 1-dars
                      </p>
                      <p className="text-xs text-stone-500">Instruktor L.A • A.A uchun</p>
                    </div>
                    <span className="inline-flex items-center justify-center rounded-xl bg-primary-50 text-primary-600 text-xs font-semibold px-3 py-1">
                      Jadval
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-xl bg-primary-50/80 border border-primary-100 px-3 py-2.5">
                      <p className="text-[0.7rem] text-primary-700 font-semibold uppercase tracking-wide">
                        Logoped
                      </p>
                      <p className="mt-1 text-[0.7rem] text-primary-800">
                        Nutq, talaffuz, til rivojlanishi
                      </p>
                    </div>
                    <div className="rounded-xl bg-emerald-50/80 border border-emerald-100 px-3 py-2.5">
                      <p className="text-[0.7rem] text-emerald-700 font-semibold uppercase tracking-wide">
                        Defektolog
                      </p>
                      <p className="mt-1 text-[0.7rem] text-emerald-800">
                        Maxsus pedagogik qo‘llab-quvvatlash
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
