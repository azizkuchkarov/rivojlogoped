import type { NewsItem } from "@/lib/news";
import { getPublishedNews } from "@/lib/news";

export default async function NewsSection() {
  const news = await getPublishedNews();

  return (
    <section id="yangiliklar" className="py-24 bg-stone-50 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary-600 font-semibold">Yangiliklar</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
            Soʻnggi yangiliklar
          </h2>
          <p className="text-stone-600 mt-4">
            Markazimizdagi yangiliklardan xabardor boʻling.
          </p>
        </div>
        {news.length === 0 ? (
          <p className="text-center text-stone-500 py-12">
            Hozircha yangiliklar yoʻq. Tez orada qoʻshiladi.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.slice(0, 6).map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-stone-200 bg-white p-6 card-hover"
              >
                <time className="text-sm text-stone-500">
                  {new Date(item.date).toLocaleDateString("uz-UZ", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h3 className="font-display text-xl font-semibold text-stone-900 mt-2 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-stone-600 mt-2 line-clamp-3 text-sm">
                  {item.excerpt}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
