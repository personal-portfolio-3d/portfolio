"use client";

import { useEffect, useState, useRef } from "react";
import { Terminal } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface LoadingScreenProps {
  onLoaded: () => void;
}

export function LoadingScreen({ onLoaded }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const onLoadedRef = useRef(onLoaded);

  useEffect(() => {
    onLoadedRef.current = onLoaded;
  }, [onLoaded]);

  useEffect(() => {
    // Smooth progress counter
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 20;
      });
    }, 80);

    // Guarantee fade-out after max 800ms
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
      onLoadedRef.current?.();
    }, 700);

    // Completely unmount/dismiss after fade transition
    const dismissTimer = setTimeout(() => {
      setIsDismissed(true);
    }, 1200);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
      clearTimeout(dismissTimer);
    };
  }, []);

  if (isDismissed) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#03060D] text-white select-none transition-all duration-500 ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
      }`}
    >
      <div className="w-[340px] sm:w-[420px] p-8 rounded-3xl bg-[#0D1B30] border border-[#24466E] backdrop-blur-2xl shadow-neon-blue flex flex-col items-center text-center">
        {/* Glowing Logo Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#168BFF] via-[#007BFF] to-[#22D3EE] p-[2px] mb-6 shadow-neon-blue animate-pulse">
          <div className="w-full h-full bg-[#081426] rounded-[14px] flex items-center justify-center">
            <span className="font-orbitron font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] to-[#168BFF]">
              {PERSONAL_INFO.shortName}
            </span>
          </div>
        </div>

        <h1 className="text-xl font-bold font-orbitron tracking-widest text-[#EDF4FF] drop-shadow-[0_0_12px_rgba(22,139,255,0.7)]">
          {PERSONAL_INFO.name}
        </h1>
        <p className="text-xs font-mono text-[#22D3EE] tracking-wider mt-1 uppercase font-semibold">
          {PERSONAL_INFO.title}
        </p>

        {/* Status Line */}
        <div className="mt-8 flex items-center gap-2 text-xs font-mono text-[#A5B6D0]">
          <Terminal className="w-4 h-4 text-[#22D3EE] animate-spin" style={{ animationDuration: "6s" }} />
          <span>INITIALIZING 3D METROPOLIS &amp; HIGHWAY...</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-[#081426] border border-[#24466E] mt-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#168BFF] via-[#22D3EE] to-[#168BFF] shadow-neon-blue transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-3 text-xs font-mono text-[#22D3EE] font-bold">
          {progress}%
        </div>
      </div>
    </div>
  );
}
