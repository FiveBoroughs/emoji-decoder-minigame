"use client";

import { useEffect } from "react";

interface GameTimerProps {
  timeLeft: number;
  setTimeLeft: (time: number) => void;
  gameActive: boolean;
}

export default function GameTimer({
  timeLeft,
  setTimeLeft,
  gameActive,
}: GameTimerProps) {
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timeLeft, gameActive]);

  return (
    <div className="text-3xl font-mono text-center">
      {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
    </div>
  );
}