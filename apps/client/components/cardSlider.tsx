"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import card1 from "../public/card-1.png"
import card2 from "../public/card-2.png"
import card3 from "../public/card-3.png"
import card4 from "../public/card-4.png"
import card5 from "../public/card-5.jpeg"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Card {
  id: number;
  image: string;
  title: string;
  description: string;
}

type Direction = 1 | -1;

// ─── Data ─────────────────────────────────────────────────────────────────────

const CARDS: Card[] = [
  {
    id: 1,
    image: card1.src,
    title: "Welcome to Slugfeast",
    description: "The place where the Feast Begins",
  },
  {
    id: 2,
    image: card2.src,
    title: "Create Whatever Coin you Like",
    description: "Your just one click behind from starting the feast",
  },
  {
    id: 3,
    image: card3.src,
    title: "Easy Onboarding",
    description: "One tap onboarding, no need to manage your own wallets",
  },
  {
    id: 4,
    image: card4.src,
    title: "Easy Trading Interface",
    description: "Wanna trade some coins, You're just one click away",
  },
  {
    id: 5,
    image: card5.src,
    title: "Tons of Creator Rewards",
    description: "Cause Why not?? You deserve this.",
  },
];

const SLIDE_INTERVAL_MS = 2000;

// ─── Variants ─────────────────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: Direction) => ({
    x: dir === 1 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: Direction) => ({
    x: dir === 1 ? "-100%" : "100%",
    opacity: 0,
  }),
};

// ─── Arrow Button ─────────────────────────────────────────────────────────────

interface ArrowButtonProps {
  onClick: () => void;
  direction: "left" | "right";
}

function ArrowButton({ onClick, direction }: ArrowButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="absolute top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-neutral-900/70 border border-neutral-600 flex items-center justify-center text-white backdrop-blur-sm"
      style={{ [direction === "left" ? "left" : "right"]: 8 }}
      whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.9)" }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      {direction === "left" ? (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 11L5 7L9 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M5 3L9 7L5 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </motion.button>
  );
}

// ─── Dot ─────────────────────────────────────────────────────────────────────

interface DotProps {
  active: boolean;
  onClick: () => void;
}

function Dot({ active, onClick }: DotProps) {
  return (
    <motion.button
      onClick={onClick}
      className="rounded-full bg-neutral-500 focus:outline-none"
      animate={{
        width: active ? 20 : 6,
        backgroundColor: active ? "#f87171" : "#737373",
      }}
      style={{ height: 6 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      whileHover={{ backgroundColor: "#fca5a5" }}
    />
  );
}

// ─── CardSlider ───────────────────────────────────────────────────────────────

export default function CardSlider() {
  const [index, setIndex] = useState<number>(0);
  const [direction, setDirection] = useState<Direction>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((next: number, dir: Direction): void => {
    setDirection(dir);
    setIndex(next);
  }, []);

  const next = useCallback((): void => {
    goTo((index + 1) % CARDS.length, 1);
  }, [index, goTo]);

  const prev = useCallback((): void => {
    goTo((index - 1 + CARDS.length) % CARDS.length, -1);
  }, [index, goTo]);

  const jumpTo = useCallback((target: number): void => {
    if (target === index) return;
    goTo(target, target > index ? 1 : -1);
  }, [index, goTo]);

  // Auto-slide
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(next, SLIDE_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, next]);

  const card = CARDS[index];

  return (
    <div className="flex flex-col gap-3 px-6 pb-6 w-full">
      {/* Slider viewport */}
      <div
        className="relative w-full rounded-xl overflow-hidden bg-neutral-900 cursor-pointer"
        onMouseEnter={() => { setIsHovered(true); setIsPaused(true); }}
        onMouseLeave={() => { setIsHovered(false); setIsPaused(false); }}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={card?.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
            className="w-full"
          >
            {/* Image */}
            <div className="w-full h-105 overflow-hidden flex justify-center items-center">
              <img
                src={card?.image}
                alt={card?.title}
                className="h-full"
              />
            </div>

            {/* Text */}
            <div className="px-4 py-3">
              
              <h3 className="text-lg font-semibold text-white ">
                {card?.title}
              </h3>
              <p className="text-sm text-neutral-400 mt-1 leading-relaxed">
                {card?.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Nav arrows — visible on hover */}
        <AnimatePresence>
          {isHovered && (
            <>
              <ArrowButton direction="left"  onClick={prev} />
              <ArrowButton direction="right" onClick={next} />
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5">
        {CARDS.map((c, i) => (
          <Dot key={c.id} active={i === index} onClick={() => jumpTo(i)} />
        ))}
      </div>
    </div>
  );
}