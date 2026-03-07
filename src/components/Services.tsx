const services = [
  {
    title: "Defektolog",
    description: "Maxsus pedagogik yordam, kognitiv va ijtimoiy rivojlanish. Ehtiyojli bolalar uchun kompleks yondashuv.",
    icon: "📚",
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
  },
  {
    title: "Logoped",
    description: "Nutq va til rivojlanishi, talaffuz, soʻzlashuv koʻnikmalari. Aniq va toʻgʻri gapirishga yordam.",
    icon: "🗣️",
    color: "from-primary-500 to-primary-700",
    bg: "bg-primary-50",
  },
  {
    title: "Sensor integratsiya",
    description: "Sezgi tizimlarini uygʻunlashtirish orqali diqqat, koordinatsiya va oʻrganish qobiliyatini oshirish.",
    icon: "✨",
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
  },
  {
    title: "Neyropsixolog",
    description: "Neyropsixologik yondashuv orqali miya funksiyalarini qoʻllab-quvvatlash va rivojlantirish.",
    icon: "🧠",
    color: "from-indigo-500 to-blue-600",
    bg: "bg-indigo-50",
  },
  {
    title: "Bolalar psixologi",
    description: "Bolaning ruhiy holati, xulq-atvori va oilaviy munosabatlar boʻyicha professional yordam.",
    icon: "💚",
    color: "from-teal-500 to-cyan-600",
    bg: "bg-teal-50",
  },
  {
    title: "ART terapiya — kulolchilik, rasm",
    description: "Sanʼat orqali hissiyot va ijodiyotni ochish. Kulolchilik va rasm chizish.",
    icon: "🎨",
    color: "from-pink-500 to-rose-600",
    bg: "bg-pink-50",
  },
  {
    title: "Intensiv darslar — ZPRR, RAS bolalar uchun",
    description: "ZPRR va RAS diagnozli bolalar uchun intensiv rivojlanish darslari.",
    icon: "📊",
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
  },
  {
    title: "Erta rivojlantirish — 2-4 yoshdagi bolalarga",
    description: "2-4 yoshdagi bolalar uchun erta rivojlanish dasturlari.",
    icon: "🌱",
    color: "from-green-500 to-emerald-600",
    bg: "bg-green-50",
  },
  {
    title: "Inklyuziv maktabga tayyorlov",
    description: "Tashxisli bolalarni inklyuziv maktabga tayyorlash.",
    icon: "🏫",
    color: "from-sky-500 to-blue-600",
    bg: "bg-sky-50",
  },
  {
    title: "Logopedik maktabga tayyorlov",
    description: "Rus va oʻzbek tilida — nutq, diqqat, xotira, motorika muammoli bolalar uchun maktabga tayyorlov.",
    icon: "📖",
    color: "from-cyan-500 to-teal-600",
    bg: "bg-cyan-50",
  },
  {
    title: "Hunar taʼlimi",
    description: "Imkoniyati cheklangan, alohida taʼlimga ehtiyoji bor bolalar uchun hunar taʼlimi.",
    icon: "🛠️",
    color: "from-accent-500 to-accent-600",
    bg: "bg-accent-50",
  },
];

export default function Services() {
  return (
    <section id="xizmatlar" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary-600 font-semibold">Xizmatlar</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
            Biz nima taklif qilamiz?
          </h2>
          <p className="text-stone-600 mt-4">
            Defektolog, logoped, sensor integratsiya, neyropsixolog, bolalar psixologi, ART terapiya, intensiv darslar, erta rivojlantirish, maktabga tayyorlov, hunar taʼlimi va boshqa yoʻnalishlar. Har bir yoʻnalishda darslar roʻyxati mavjud.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`rounded-2xl border border-stone-200 bg-white p-6 card-hover ${s.bg}`}
              style={{
                animation: "slideUp 0.6s ease-out forwards",
                opacity: 0,
                animationDelay: `${i * 0.1}s`,
                animationFillMode: "forwards",
              }}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-2xl shadow-lg`}>
                {s.icon}
              </div>
              <h3 className="font-display text-xl font-semibold text-stone-900 mt-4">
                {s.title}
              </h3>
              <p className="text-stone-600 mt-2 text-sm leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
