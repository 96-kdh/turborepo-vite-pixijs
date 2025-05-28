import { APIGatewayProxyHandler } from "aws-lambda";

import { CustomResponse } from "../utils";

// 슬롯머신 기호(symbols)와 당첨 테이블
const symbols = ["🍒", "🍋", "🔔", "7", "⭐", "🍉"];
const ReelCount = 3;
const outcomeTable: { symbol: string; prob: number; payout: number }[] = [
   { symbol: "🍉", prob: 0.001, payout: 350 },
   { symbol: "⭐", prob: 0.009, payout: 25 },
   { symbol: "7", prob: 0.05, payout: 4 },
   { symbol: "🔔", prob: 0.05, payout: 2 },
   { symbol: "🍒", prob: 0.1, payout: 1 },
];

/**
 * 요청 예시 (APIGatewayProxyEvent.body):
 * { "currentPoints": 10 }
 * 응답 예시 (JSON):
 * { "centerSymbols": ["🍒","🍒","🍒"], "payout": 1, "newPoints": 10 }
 */
export const spinPostHandler: APIGatewayProxyHandler = async (event, _context) => {
   try {
      const body = event.body;
      if (!body) return CustomResponse.BadRequest("Missing request body.");

      const { currentPoints } = JSON.parse(body) as { currentPoints: number };
      if (typeof currentPoints !== "number") {
         return CustomResponse.BadRequest("Invalid currentPoints value.");
      }

      if (currentPoints <= 0) {
         return CustomResponse.BadRequest("insufficient points");
      }

      // 1) 난수로 outcome 결정
      const r = Math.random();
      let acc = 0;
      let outcome = { symbol: "", payout: 0 };
      for (const o of outcomeTable) {
         acc += o.prob;
         if (r < acc) {
            outcome = o;
            break;
         }
      }

      // 2) centerSymbols 생성
      let centerSymbols: string[];
      if (outcome.symbol) {
         // 당첨 심볼 3개
         centerSymbols = Array(ReelCount).fill(outcome.symbol);
      } else {
         // 꽝: 세 개 모두 같은 심볼이 나오지 않도록
         do {
            centerSymbols = Array.from(
               { length: ReelCount },
               () => symbols[Math.floor(Math.random() * symbols.length)],
            );
         } while (centerSymbols[0] === centerSymbols[1] && centerSymbols[1] === centerSymbols[2]);
      }

      // 3) 포인트 차감 및 보상 지급
      const newPoints = currentPoints - 1 + outcome.payout;

      return CustomResponse.SuccessBody(
         JSON.stringify({
            centerSymbols,
            payout: outcome.payout,
            newPoints,
         }),
      );
   } catch (err: any) {
      console.error("Slot spin error:", err);
      return CustomResponse.InternalError();
   }
};
