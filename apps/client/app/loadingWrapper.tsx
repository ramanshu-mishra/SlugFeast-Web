"use client";
import Image from "next/image";
import logo from "../public/logo2.png";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function Loading({
  children,
  minTime,
}: {
  children: React.ReactNode;
  minTime?: number;
}) {
  const [loaded, setIsLoaded] = useState(false);
  const [minElapsed, setMinElapsed] = useState(false);
  const defaultTimer = 1000;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setMinElapsed(true);
    }, minTime ?? defaultTimer);

    return () => {
      clearTimeout(t);
    };
  }, [minTime]);

  const isLoading = !(loaded && minElapsed);

  return (
    <>
      {isLoading && (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-neutral-950 gap-4">
          <Image src={logo} alt="SlugFeast Logo" height={80} />
          <motion.span
            className="text-white text-2xl font-semibold tracking-widest"
            style={{ animation: "fadeInUp 1s ease-in-out forwards" }}
          >
            SLUGFEAST
          </motion.span>
          <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
      )}
      {!isLoading && children}
    </>
  );
}
