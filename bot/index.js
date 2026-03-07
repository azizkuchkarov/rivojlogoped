import TelegramBot from "node-telegram-bot-api";

const token = process.env.TELEGRAM_BOT_TOKEN;
const apiBase = process.env.API_BASE_URL || "http://localhost:3000";

if (!token) {
  console.error("TELEGRAM_BOT_TOKEN o'rnatilmagan. .env faylida belgilang.");
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Assalomu alaykum. Rivoj markazi jadval boti.\n\n" +
      "Jadvalni olish: /jadval\n" +
      "Bugungi jadval: /jadval bugun\n" +
      "Boshqa sana: /jadval 2025-03-15\n\n" +
      "Admin sizning Telegram ID: " + chatId + "\nBu raqamni admin panelda instruktor yoki ota-ona ma'lumotiga kiriting."
  );
});

bot.onText(/\/jadval(?:\s+(.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  let dateStr = (match && match[1] && match[1].trim()) || "";
  let date;
  if (!dateStr || dateStr.toLowerCase() === "bugun") {
    const d = new Date();
    date = d.toISOString().slice(0, 10);
  } else {
    const parsed = new Date(dateStr);
    if (isNaN(parsed.getTime())) {
      return bot.sendMessage(chatId, "Sana noto'g'ri. Masalan: 2025-03-15 yoki \"bugun\"");
    }
    date = parsed.toISOString().slice(0, 10);
  }
  try {
    const url = `${apiBase}/api/bot/schedule?date=${date}&telegramId=${chatId}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.schedule && data.schedule.length > 0) {
      const header = data.type === "instructor"
        ? `📅 ${data.date} — ${data.name}\n\n`
        : `📅 ${data.date} — ${data.childName}\n\n`;
      const text = header + data.schedule.map((l, i) => `${i + 1}. ${l}`).join("\n");
      return bot.sendMessage(chatId, text);
    }
    const noData = data.type === "instructor"
      ? `${data.date} kunida sizga darslar rejalashtirilmagan.`
      : data.type === "parent"
        ? `${data.date} kunida ${data.childName} uchun darslar rejalashtirilmagan.`
        : (data.message || "Jadval topilmadi.");
    return bot.sendMessage(chatId, noData);
  } catch (e) {
    console.error(e);
    return bot.sendMessage(chatId, "Jadval yuklanmadi. Keyinroq urinib ko'ring.");
  }
});

console.log("Rivoj jadval boti ishga tushdi.");
