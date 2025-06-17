"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface AnimatedCounterProps {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
}

export default function AnimatedCounter({
  initialValue = 0,
  min = -Infinity,
  max = Infinity,
  step = 1,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(initialValue);
  const [direction, setDirection] = useState<"up" | "down" | null>(null);

  const increment = () => {
    if (count < max) {
      setDirection("up");
      setCount((prev) => prev + step);
    }
  };

  const decrement = () => {
    if (count > min) {
      setDirection("down");
      setCount((prev) => prev - step);
    }
  };

  const variants = {
    initial: (dir: "up" | "down" | null) => ({
      y: dir === "up" ? 40 : dir === "down" ? -40 : 0,
      opacity: 0,
    }),
    animate: {
      y: 0,
      opacity: 1,
    },
    exit: (dir: "up" | "down" | null) => ({
      y: dir === "up" ? -40 : dir === "down" ? 40 : 0,
      opacity: 0,
    }),
  };

  return (
    <div className="flex items-center overflow-hidden gap-6 bg-neutral-50 dark:bg-neutral-800/40 rounded-full p-2">
      <motion.button
        onClick={decrement}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-neutral-100 dark:bg-neutral-800/40 p-2 text-2xl rounded-full w-16 h-16 flex items-center justify-center"
      >
        -
      </motion.button>
      <div className="relative h-[4rem] w-[3rem] flex items-center justify-center overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={count}
            className="absolute text-2xl font-bold text-neutral-900 dark:text-neutral-100"
            custom={direction}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {count}
          </motion.div>
        </AnimatePresence>
      </div>
      <motion.button
        onClick={increment}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-neutral-100 dark:bg-neutral-800/40 p-2 text-2xl rounded-full w-16 h-16 flex items-center justify-center"
      >
        +
      </motion.button>
    </div>
  );
}
