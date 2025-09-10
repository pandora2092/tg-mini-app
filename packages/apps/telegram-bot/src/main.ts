import { Telegraf } from 'telegraf';
import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:3333/api';

const token = '8007424641:AAF7JR370t8mr5icW4qGvRyPk1jIsz_aGFc';
const bot = new Telegraf(token as string);

bot.start(async (ctx) => {
  const chatId = String(ctx.chat.id);
  const username = ctx.from?.username || 'unknown';
  try {
    const res = await axios.post(`${API_URL}/users`, { chatId, username });
    const user = res.data;

    await ctx.reply('Открой приложение:', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Открыть Mini App',
              web_app: { url: 'https://help-afisha.ru/' },
            },
          ],
        ],
      },
    });
  } catch (e) {
    console.error(e);
    await ctx.reply('⚠️ Ошибка при сохранении пользователя');
  }
});

bot.help((ctx) => ctx.reply('Напиши /start чтобы начать 🚀'));
bot.on('text', (ctx) => ctx.reply(`Ты написал: ${ctx.message.text}`));

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
