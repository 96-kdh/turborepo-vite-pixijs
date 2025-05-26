// SlotMachine.tsx
import { Container, Stage, Text, useTick } from "@pixi/react";
import * as PIXI from "pixi.js";
import React, { useMemo, useRef, useState } from "react";

import "./SlotMachine.css";

const symbols = ["🍒", "🍋", "🔔", "7", "⭐", "🍉"];
const ReelCount = 3;
const SymbolSize = 100;
const ReelSymbols = 6;

// RTP 모델
const outcomeTable = [
   { symbol: "🍉", prob: 0.001, payout: 350 },
   { symbol: "⭐", prob: 0.009, payout: 25 },
   { symbol: "7", prob: 0.05, payout: 4 },
   { symbol: "🔔", prob: 0.05, payout: 2 },
   { symbol: "🍒", prob: 0.1, payout: 1 },
];
// 나머지 확률 → 꽝, payout: 0

interface Reel {
   symbols: string[];
   offset: number;
   speed: number;
}

// (1) 프레임마다 reel을 업데이트
function ReelTicker({ reels, setReels }: { reels: Reel[]; setReels: React.Dispatch<React.SetStateAction<Reel[]>> }) {
   useTick((delta) => {
      setReels((prev) =>
         prev.map((r) => {
            if (r.speed === 0) return r;
            let newOffset = r.offset + r.speed * delta;
            const newSymbols = [...r.symbols];
            while (newOffset >= SymbolSize) {
               newOffset -= SymbolSize;
               newSymbols.shift();
               newSymbols.push(symbols[Math.floor(Math.random() * symbols.length)]!);
            }
            return { ...r, offset: newOffset, symbols: newSymbols };
         }),
      );
   });
   return null;
}

// (2) 서버 로직 시뮬레이터: 포인트 차감 → 당첨 결정 → 새 포인트 반환
async function mockServerSpin(currentPoints: number): Promise<{
   centerSymbols: string[];
   payout: number;
   newPoints: number;
}> {
   await new Promise((res) => setTimeout(res, 500));

   if (currentPoints <= 0) {
      throw new Error("포인트가 부족합니다.");
   }

   // ① 당첨/outcome 결정
   const r = Math.random();
   let acc = 0;
   let outcome = { symbol: "", payout: 0 };
   for (const o of outcomeTable) {
      acc += o.prob;
      if (r < acc) {
         outcome = { symbol: o.symbol, payout: o.payout };
         break;
      }
   }

   let centerSymbols: string[];
   if (outcome.payout > 0) {
      // 당첨: 3개 같은 심볼
      centerSymbols = Array(ReelCount).fill(outcome.symbol);
   } else {
      // 꽝: **절대로** 3개 모두 같은 패턴이 안나오게 생성
      do {
         centerSymbols = Array.from({ length: ReelCount }).map(
            () => symbols[Math.floor(Math.random() * symbols.length)]!,
         );
      } while (centerSymbols[0] === centerSymbols[1] && centerSymbols[1] === centerSymbols[2]);
   }

   const newPoints = currentPoints - 1 + outcome.payout;
   return { centerSymbols, payout: outcome.payout, newPoints };
}

export default function SlotMachine() {
   // (3) 클라이언트 상태
   const [points, setPoints] = useState(10);
   const [reels, setReels] = useState<Reel[]>(() =>
      Array.from({ length: ReelCount }).map(() => ({
         symbols: Array.from({ length: ReelSymbols }).map(() => symbols[Math.floor(Math.random() * symbols.length)]!),
         offset: 0,
         speed: 0,
      })),
   );
   const [isSpinning, setIsSpinning] = useState(false);
   const checkedRef = useRef(false);

   // (4) 텍스트 스타일
   const textStyle = useMemo(
      () =>
         new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: SymbolSize - 20,
            fill: "white",
            align: "center",
         }),
      [],
   );

   // (5) 스핀 핸들러
   const startSpin = async () => {
      // 이미 스핀 중이면 무시
      if (isSpinning) return;
      // 포인트 부족 시 중단
      if (points <= 0) {
         alert("⚠️ 포인트가 부족합니다!");
         return;
      }

      setIsSpinning(true);
      checkedRef.current = false;

      // (1) 서버에 스핀 요청
      let serverRes;
      try {
         serverRes = await mockServerSpin(points);
         console.log("serverRes: ", serverRes);
      } catch (e: any) {
         alert(e.message);
         setIsSpinning(false);
         return;
      }

      // (2) 서버가 내려준 새 포인트로 즉시 갱신
      setPoints(serverRes.newPoints);

      // (3) 모든 릴에 속도 할당 (symbols는 아직 그대로)
      setReels((prev) =>
         prev.map((r, i) => ({
            ...r,
            speed: 20 + i * 5,
            offset: 0,
         })),
      );

      // (4) 첫 번째 릴 정지 (1000ms)
      setTimeout(() => {
         setReels((prev) =>
            prev.map((r, i) => {
               if (i !== 0) return r;
               // i===0 릴만 심볼 강제 덮어쓰기
               const finalSymbols: string[] = Array.from(
                  { length: ReelSymbols },
                  (_, idx): string =>
                     idx === 1
                        ? serverRes.centerSymbols[0]! // 서버심볼은 확실히 string
                        : symbols[Math.floor(Math.random() * symbols.length)]!, // non-null
               );
               return {
                  ...r,
                  speed: 0,
                  offset: 0,
                  symbols: finalSymbols,
               };
            }),
         );
      }, 1000);

      // (5) 두 번째 릴 정지 (1300ms)
      setTimeout(() => {
         setReels((prev) =>
            prev.map((r, i) => {
               if (i !== 1) return r;
               const finalSymbols: string[] = Array.from({ length: ReelSymbols }, (_, idx): string =>
                  idx === 1 ? serverRes.centerSymbols[1]! : symbols[Math.floor(Math.random() * symbols.length)]!,
               );
               return {
                  ...r,
                  speed: 0,
                  offset: 0,
                  symbols: finalSymbols,
               };
            }),
         );
      }, 1300);

      // (6) 세 번째 릴 정지 + 결과 알림 (1600ms)
      setTimeout(() => {
         setReels((prev) =>
            prev.map((r, i) => {
               if (i !== 2) return r;
               const finalSymbols: string[] = Array.from({ length: ReelSymbols }, (_, idx): string =>
                  idx === 1 ? serverRes.centerSymbols[2]! : symbols[Math.floor(Math.random() * symbols.length)]!,
               );
               return {
                  ...r,
                  speed: 0,
                  offset: 0,
                  symbols: finalSymbols,
               };
            }),
         );

         // 단 한 번만 alert
         if (!checkedRef.current) {
            checkedRef.current = true;
            if (serverRes.payout > 0) {
               console.log(`🎉 You win ${serverRes.payout} points!\n` + `현재 포인트: ${serverRes.newPoints}`);
               // alert(`🎉 You win ${serverRes.payout} points!\n` + `현재 포인트: ${serverRes.newPoints}`);
            } else {
               console.log(`😞 You lose.\n` + `현재 포인트: ${serverRes.newPoints}`);
               // alert(`😞 You lose.\n` + `현재 포인트: ${serverRes.newPoints}`);
            }
         }
         setIsSpinning(false);
      }, 1600);
   };

   return (
      <div className="slot-machine">
         <div className="points-display">💎 Points: {points}</div>

         <Stage width={SymbolSize * ReelCount} height={SymbolSize * 3} options={{ backgroundColor: 0x000000 }}>
            <ReelTicker reels={reels} setReels={setReels} />

            {reels.map((reel, ri) => (
               <Container x={ri * SymbolSize} key={ri}>
                  {reel.symbols.map((sym, si) => (
                     <Text
                        key={`${ri}-${si}-${sym}`}
                        text={sym}
                        style={textStyle}
                        anchor={0.5}
                        x={SymbolSize / 2}
                        y={si * SymbolSize + SymbolSize / 2 + reel.offset}
                     />
                  ))}
               </Container>
            ))}
         </Stage>

         <button className="spin-button" onClick={startSpin} disabled={isSpinning || points <= 0}>
            Spin
         </button>
      </div>
   );
}
