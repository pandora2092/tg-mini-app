var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_telegraf = require("telegraf");
var import_axios = __toESM(require("axios"));
const API_URL = process.env.API_URL || "http://localhost:3333/api";
const token = "8007424641:AAF7JR370t8mr5icW4qGvRyPk1jIsz_aGFc";
const bot = new import_telegraf.Telegraf(token);
bot.start(async (ctx) => {
  const chatId = String(ctx.chat.id);
  const username = ctx.from?.username || "unknown";
  try {
    const res = await import_axios.default.post(`${API_URL}/users`, { chatId, username });
    const user = res.data;
    await ctx.reply(
      "\u041E\u0442\u043A\u0440\u043E\u0439 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435:",
      {
        reply_markup: {
          inline_keyboard: [[{ text: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C Mini App", web_app: { url: "https://help-afisha.ru/" } }]]
        }
      }
    );
  } catch (e) {
    console.error(e);
    await ctx.reply("\u26A0\uFE0F \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0438 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F");
  }
});
bot.help((ctx) => ctx.reply("\u041D\u0430\u043F\u0438\u0448\u0438 /start \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u0447\u0430\u0442\u044C \u{1F680}"));
bot.on("text", (ctx) => ctx.reply(`\u0422\u044B \u043D\u0430\u043F\u0438\u0441\u0430\u043B: ${ctx.message.text}`));
bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
//# sourceMappingURL=main.js.map
