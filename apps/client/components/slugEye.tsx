"use client";

import { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MousePos {
  x: number;
  y: number;
}

interface PupilOffset {
  x: number;
  y: number;
}

interface EyeProps {
  size?: number;
  maxOffset?: number;
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function getPupilOffset(
  eyeEl: HTMLElement | null,
  mouse: MousePos,
  maxOffset: number
): PupilOffset {
  if (!eyeEl) return { x: 0, y: 0 };

  const rect = eyeEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = mouse.x - cx;
  const dy = mouse.y - cy;
  const dist = Math.sqrt(dx ** 2 + dy ** 2) || 1;
  const ratio = Math.min(dist / 100, 1);

  return {
    x: (dx / dist) * maxOffset * ratio,
    y: (dy / dist) * maxOffset * ratio,
  };
}

// ─── Eye ─────────────────────────────────────────────────────────────────────

export default function SlugEye({ size = 64, maxOffset = 12 }: EyeProps) {
  const eyeRef = useRef<HTMLDivElement>(null);
  const [pupil, setPupil] = useState<PupilOffset>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent): void => {
      setPupil(getPupilOffset(eyeRef.current, { x: e.clientX, y: e.clientY }, maxOffset));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [maxOffset]);

  const irisSize  = size * 0.52;
  const pupilSize = size * 0.26;
  const glintSize = size * 0.18;

  return (
    <div
      ref={eyeRef}
      className="rounded-full bg-white border-[3px] border-green-900 shadow-md flex items-center justify-center relative overflow-hidden flex-shrink-0"
      style={{ width: size, height: size }}
    >
      {/* Iris + pupil */}
      <div
        className="rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          width: irisSize,
          height: irisSize,
          background: "radial-gradient(circle at 35% 35%, #86efac, #166534)",
          transform: `translate(${pupil.x}px, ${pupil.y}px)`,
          transition: "transform 0.08s ease-out",
        }}
      >
        <div
          className="rounded-full bg-neutral-900 flex-shrink-0"
          style={{ width: pupilSize, height: pupilSize }}
        />
      </div>

      {/* Specular highlight */}
      <div
        className="absolute rounded-full bg-white/80 pointer-events-none"
        style={{ width: glintSize, height: glintSize, top: "16%", left: "22%" }}
      />
    </div>
  );
}