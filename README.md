# Rivoj Logoped — veb-sahifa

Zamonaviy veb-sahifa: **Logoped**, **ABA**, **Sensor integratsiya** va **Defektolog** xizmatlari, shuningdek yangiliklar boshqaruvi uchun admin panel.

## Ishga tushirish

```bash
npm install
npm run dev
```

Brauzerda: [http://localhost:3000](http://localhost:3000)

## Admin panel

- **URL:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Sukutdagi parol:** `rivoj2025` (oʻzgartirish uchun `.env` da `ADMIN_PASSWORD` ni belgilang)

Admin orqali:
- **Yoʻnalishlar** — Defektolog, Logoped, ABA va boshqalar (admin kiritadi)
- **Darslar** — har bir yoʻnalish boʻyicha dars nomlari (admin kiritadi)
- **Bolalar** — profil (ism, tugʻilgan yil, ota-ona telefon/Telegram), yoʻnalish va darslar (enrollment), jadval va oʻtilgan darslar
- **Instruktorlar** — Telegram ID (jadval yuborish), darsdan ulush (40% yoki 50%), hisobot (kunlik/jami)
- **Jadval** — sana boʻyicha 09:00–17:00, har instruktor uchun slotlar; bolani qoʻshish, darsni «Tugatish» (toʻlov va instruktor ulushi hisoblanadi)
- **Yangiliklar** va **Asosiy instruktor** — bosh sahifa kontenti

## Telegram bot (jadval)

Instruktorlar va ota-onalar jadvalni bot orqali olishadi.

1. [@BotFather](https://t.me/BotFather) da yangi bot yarating, token oling.
2. Loyiha ildizida `.env` ga qoʻshing: `TELEGRAM_BOT_TOKEN=...`, `API_BASE_URL=http://localhost:3000` (yoki production URL).
3. Botni ishga tushiring:
   ```bash
   cd bot && npm install && TELEGRAM_BOT_TOKEN=... API_BASE_URL=http://localhost:3000 npm start
   ```
4. Botga `/start` yuboring — Telegram ID chiqadi. Bu raqamni admin panelda instruktor yoki bolaning ota-onasi uchun «Telegram ID» sifatida kiriting.
5. `/jadval` yoki `/jadval bugun` — jadvalni olish.

## Loyiha tuzilishi

- `src/app/page.tsx` — bosh sahifa
- `src/app/admin/` — admin: yoʻnalishlar, darslar, bolalar, jadval, instruktorlar, yangiliklar
- `src/app/api/` — directions, lessons, children, enrollments, schedule, schedule/complete, stats/instructor, bot/schedule
- `data/*.json` — yoʻnalishlar, darslar, bolalar, enrollments, schedule, instructors, news va boshqalar
- `bot/` — Telegram bot (jadval soʻrash)

## Muhit oʻzgaruvchilari

`.env.example` ni nusxalab `.env` yarating va kerak boʻlsa tahrirlang:

- `ADMIN_PASSWORD` — admin panel paroli
- `ADMIN_SECRET` — API token (admin token; oʻzgartirsangiz, brauzerda saqlanadi)

## Production

```bash
npm run build
npm start
```

---

© Rivoj — Logoped, ABA, Sensor integratsiya, Defektolog
"# rivojlogoped" 
