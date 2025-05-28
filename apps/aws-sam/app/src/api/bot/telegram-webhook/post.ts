import { Telegraf } from "telegraf";
import { CustomResponse } from "utils";

// Lambda 시작 시 한 번만 인스턴스 생성 (휘발성이나, 자주 실행되면 메모리에 기억되어있음)
const bot = new Telegraf(process.env.BOT_TOKEN!);
bot.start((ctx) => {
   console.log(ctx);
   ctx.reply("👋 안녕하세요! 서버리스 Telegram 봇입니다.");
});

bot.command("play", async (ctx) => {
   console.log(ctx);
   try {
      const abc = await ctx.reply("게임을 시작하려면 아래 버튼을 눌러주세요.", {
         reply_markup: {
            inline_keyboard: [
               [
                  {
                     text: "▶ Play Game",
                     web_app: { url: process.env.CLIENT_URL! },
                  },
               ],
            ],
         },
      });
      console.log(abc);
   } catch (e) {
      console.error(e);
   }
});

// 예: Telegraf 사용 시
bot.telegram
   .setMyCommands([{ command: "play", description: "▶ Play Game" }])
   .then(console.log)
   .catch(console.error);

export const telegramWebHookHandler = async (event: any) => {
   try {
      console.log(process.env.BOT_TOKEN);
      console.log(process.env.CLIENT_URL);

      if (!event.body || typeof event.body !== "string") {
         return CustomResponse.BadRequest("Invalid Body");
      }

      const update = JSON.parse(event.body);

      // Telegraf에 업데이트 넘기기
      await bot.handleUpdate(update);

      // 반드시 200을 반환해야 Telegram이 “수신 완료”로 간주
      return CustomResponse.SuccessOK();
   } catch (err) {
      console.error("Webhook error", err);
      return CustomResponse.InternalError();
   }
};
