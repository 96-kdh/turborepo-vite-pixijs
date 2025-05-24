// SlotMachine.tsx
import { Container, Stage, Text, useTick } from "@pixi/react";
import * as PIXI from "pixi.js";
import React, { useMemo, useState } from "react";

import "./SlotMachine.css";

const symbols = ["🍒", "🍋", "🔔", "7", "⭐", "🍉"];
const ReelCount = 3;
const SymbolSize = 100;
const ReelSymbols = 6;

interface Reel {
   symbols: string[];
   offset: number;
   speed: number;
}

function ReelTicker({ reels, setReels }: { reels: Reel[]; setReels: React.Dispatch<React.SetStateAction<Reel[]>> }) {
   useTick((delta) => {
      setReels((prev) =>
         prev.map((reel) => {
            if (reel.speed === 0) return reel;
            let newOffset = reel.offset + reel.speed * delta;
            const newSymbols = [...reel.symbols];
            while (newOffset >= SymbolSize) {
               newOffset -= SymbolSize;
               newSymbols.shift();
               newSymbols.push(symbols[Math.floor(Math.random() * symbols.length)]!);
            }
            return { ...reel, offset: newOffset, symbols: newSymbols };
         }),
      );
   });
   return null;
}

export default function SlotMachine() {
   const [reels, setReels] = useState<Reel[]>(() =>
      Array.from({ length: ReelCount }).map(() => ({
         symbols: Array.from({ length: ReelSymbols }).map(() => symbols[Math.floor(Math.random() * symbols.length)]!),
         offset: 0,
         speed: 0,
      })),
   );

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

   const startSpin = () => {
      setReels((prev) => prev.map((r, i) => ({ ...r, speed: 20 + i * 5 })));
      setTimeout(() => setReels((prev) => prev.map((r, i) => (i === 0 ? { ...r, speed: 0 } : r))), 1000);
      setTimeout(() => setReels((prev) => prev.map((r, i) => (i === 1 ? { ...r, speed: 0 } : r))), 1300);
      setTimeout(() => setReels((prev) => prev.map((r, i) => (i === 2 ? { ...r, speed: 0 } : r))), 1600);
   };

   return (
      <div className="slot-machine">
         <Stage width={SymbolSize * ReelCount} height={SymbolSize * 3} options={{ backgroundColor: 0x000000 }}>
            {/* ticker must be inside Stage */}
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

         <button className="spin-button" onClick={startSpin}>
            Spin
         </button>
      </div>
   );
}
