"use client";
import Image from "next/image";
import logo from "../public/logo2.png";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { LoadingText } from "../components/LoadingText";

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
      
      {isLoading && <div className="h-screen w-screen flex justify-center items-center">
        <div className="rounded-full p-4">
          <LoadingText/>
        </div> 
        </div>}
      {!isLoading && children}
    </>
  );
}



