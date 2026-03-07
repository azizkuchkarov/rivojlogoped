export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center gradient-mesh pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.12),transparent_50%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stone-50 to-transparent" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-in opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            Defektolog • Logoped • Sensor integratsiya • Neyropsixolog • ART terapiya • Intensiv darslar • Maktabga tayyorlov
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 leading-tight">
            Bolangizning{" "}
            <span className="text-primary-600">rivojlanishi</span>
            <br />
            bizning ustuvor vazifamiz
          </h1>
          <p className="text-lg text-stone-600 max-w-xl">
            Defektolog, logoped, sensor integratsiya, neyropsixolog, bolalar psixologi, ART terapiya (kulolchilik, rasm), intensiv darslar (ZPRR, RAS), erta rivojlantirish, maktabga tayyorlov, hunar taʼlimi. Har bir yoʻnalishda darslar roʻyxati — masalan: A.A ga 12:00 da Logoped 1-dars, instruktor L.A.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#bog-lanish"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary-600 text-white font-semibold shadow-lg shadow-primary-600/25 hover:bg-primary-700 hover:shadow-primary-600/30 transition-all"
            >
              Bogʻlanish
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#xizmatlar"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-stone-300 text-stone-700 font-semibold hover:border-primary-400 hover:text-primary-700 transition"
            >
              Xizmatlar
            </a>
          </div>
        </div>
        <div className="relative lg:pl-8 animate-slide-up opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
          <div className="aspect-square max-w-md mx-auto rounded-3xl bg-gradient-to-br from-primary-400/20 via-primary-100/30 to-accent-200/20 p-1 shadow-2xl shadow-primary-200/30">
            <div className="w-full h-full rounded-[22px] bg-white/80 backdrop-blur flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-24 h-24 mx-auto rounded-2xl bg-primary-100 flex items-center justify-center mb-6">
                  <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <p className="font-display text-2xl font-semibold text-stone-800">Shaxsiy yondashuv</p>
                <p className="text-stone-600 mt-2">Har bir bola uchun individual reja</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
