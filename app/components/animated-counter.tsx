"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type Direction = "up" | "down";

interface AnimatedCounterProps {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
}

function clampValue(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getDisplayWidth(...values: number[]) {
  const finiteValues = values.filter(Number.isFinite);

  if (finiteValues.length === 0) {
    return String(values[0] ?? 0).length;
  }

  return Math.max(...finiteValues.map((value) => String(value).length));
}

function renderCharacter(char: string) {
  if (char === " ") {
    return <span className="invisible">0</span>;
  }

  return char;
}

export default function AnimatedCounter({
  initialValue = 0,
  min = -Infinity,
  max = Infinity,
  step = 1,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(initialValue);
  const [previousCount, setPreviousCount] = useState(initialValue);
  const [direction, setDirection] = useState<Direction>("up");
  const [displayWidth, setDisplayWidth] = useState(() =>
    getDisplayWidth(initialValue, min, max)
  );

  const normalizedStep = Math.abs(step) || 1;

  const updateCount = (nextCount: number, nextDirection: Direction) => {
    if (nextCount === count) {
      return;
    }

    setDirection(nextDirection);
    setPreviousCount(count);
    setCount(nextCount);
    setDisplayWidth((prev) => Math.max(prev, String(nextCount).length));
  };

  const increment = () => {
    updateCount(clampValue(count + normalizedStep, min, max), "up");
  };

  const decrement = () => {
    updateCount(clampValue(count - normalizedStep, min, max), "down");
  };

  const variants = {
    initial: (dir: Direction) => ({
      y: dir === "up" ? 28 : -28,
      opacity: 0,
      filter: "blur(6px)",
    }),
    animate: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (dir: Direction) => ({
      y: dir === "up" ? -28 : 28,
      opacity: 0,
      filter: "blur(6px)",
    }),
  };

  const currentChars = String(count).padStart(displayWidth, " ").split("");
  const previousChars = String(previousCount).padStart(displayWidth, " ").split(
    ""
  );
  const isAtMin = count <= min;
  const isAtMax = count >= max;

  return (
    <div className="flex items-center gap-4 overflow-hidden rounded-full bg-neutral-50 p-2 dark:bg-neutral-800/40">
      <motion.button
        onClick={decrement}
        disabled={isAtMin}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Decrease count"
        className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 p-2 text-2xl text-neutral-900 transition-opacity disabled:cursor-not-allowed disabled:opacity-40 dark:bg-neutral-800/40 dark:text-neutral-100"
      >
        -
      </motion.button>
      <div className="flex h-16 items-center rounded-3xl bg-white/80 px-4 text-4xl font-bold text-neutral-900 tabular-nums dark:bg-neutral-900/60 dark:text-neutral-100">
        {currentChars.map((char, index) => {
          const previousChar = previousChars[index];
          const hasChanged = char !== previousChar;
          const isAppearing = previousCount !== count && previousChar === " " && char !== " ";

          return (
            <motion.span
              key={index}
              className="relative flex h-16 w-[1ch] items-center justify-center overflow-hidden"
              initial={
                isAppearing
                  ? {
                      width: 0,
                      opacity: 0,
                      y: direction === "up" ? 28 : -28,
                    }
                  : false
              }
              animate={{ width: "1ch", opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
            >
              {hasChanged ? (
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.span
                    key={`${index}-${char}`}
                    className="absolute inset-0 flex items-center justify-center"
                    custom={direction}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                  >
                    {renderCharacter(char)}
                  </motion.span>
                </AnimatePresence>
              ) : (
                <span className="flex items-center justify-center">
                  {renderCharacter(char)}
                </span>
              )}
            </motion.span>
          );
        })}
      </div>
      <motion.button
        onClick={increment}
        disabled={isAtMax}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Increase count"
        className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 p-2 text-2xl text-neutral-900 transition-opacity disabled:cursor-not-allowed disabled:opacity-40 dark:bg-neutral-800/40 dark:text-neutral-100"
      >
        +
      </motion.button>
    </div>
  );
}
