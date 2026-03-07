export default function Contact() {
  return (
    <section id="bog-lanish" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-primary-600 font-semibold">Bogʻlanish</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
            Biz bilan bogʻlaning
          </h2>
          <p className="text-stone-600 mt-4">
            Savollaringiz boʻlsa, telefon qiling yoki xabar qoldiring.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <a
            href="tel:+998901234567"
            className="flex items-center gap-4 p-6 rounded-2xl border border-stone-200 bg-stone-50 hover:border-primary-300 hover:bg-primary-50/50 transition group"
          >
            <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-stone-900">Telefon</p>
              <p className="text-primary-600 font-medium">+998 90 123 45 67</p>
            </div>
          </a>
          <a
            href="https://t.me/rivoj_logoped"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-6 rounded-2xl border border-stone-200 bg-stone-50 hover:border-primary-300 hover:bg-primary-50/50 transition group"
          >
            <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition">
              <svg className="w-6 h-6 text-primary-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </div>
            <div>
              <p className="font-semibold text-stone-900">Telegram</p>
              <p className="text-primary-600 font-medium">@rivoj_logoped</p>
            </div>
          </a>
        </div>
        <p className="text-center text-stone-500 text-sm mt-8">
          Manzil va ish vaqtini telefon orqali aniqlang.
        </p>
      </div>
    </section>
  );
}
