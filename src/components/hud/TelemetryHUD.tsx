"use client";

import { Mouse, Compass, Activity } from "lucide-react";
import { SECTIONS } from "@/data/portfolioData";

interface TelemetryHUDProps {
  currentZ: number;
  velocity: number;
  scrollProgress: number;
  activeSectionIndex: number;
}

export function TelemetryHUD({
  currentZ,
  velocity,
  scrollProgress,
  activeSectionIndex,
}: TelemetryHUDProps) {
  const currentSection = SECTIONS[activeSectionIndex] || SECTIONS[0];
  const speedKmh = Math.round(velocity * 1.5);

  return (
    <div className="fixed bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 z-40 pointer-events-none flex flex-col md:flex-row items-end md:items-center justify-between gap-4 select-none">
      {/* Bottom Left: Scroll Cue Box */}
      <div className="p-2.5 sm:p-3.5 rounded-xl bg-[#060F22]/45 border border-[#22D3EE]/45 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.65),0_0_18px_rgba(34,211,238,0.25)] flex items-center gap-2.5 sm:gap-3">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#081836]/80 border border-[#22D3EE]/60 flex items-center justify-center shadow-[0_0_10px_rgba(34,211,238,0.4)] flex-shrink-0">
          <Mouse className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#22D3EE] animate-pulse drop-shadow-[0_0_6px_#22D3EE]" />
        </div>
        <div>
          <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-wider text-[#22D3EE] block uppercase drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]">
            SWIPE OR SCROLL TO TRAVEL
          </span>
          <span className="text-[8px] sm:text-[9px] font-mono text-white font-medium block tracking-wide drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]">
            TOUCH SCREEN OR MOUSE WHEEL
          </span>
        </div>
      </div>

      {/* Center / Bottom: Progress Bar & Telemetry Readouts */}
      <div className="hidden sm:flex flex-col items-center gap-2 max-w-md w-full">
        {/* Dynamic Telemetry Specs */}
        <div className="flex items-center justify-between w-full text-[11px] font-mono px-1">
          <div className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#22D3EE] drop-shadow-[0_0_6px_#22D3EE]" />
            <span className="text-[#22D3EE] font-semibold">SECTOR:</span>
            <span className="text-white font-bold drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]">{currentSection.name}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#168BFF] drop-shadow-[0_0_6px_#168BFF]" />
            <span className="text-[#22D3EE] font-semibold">VELOCITY:</span>
            <span className="text-white font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">{speedKmh} KM/H</span>
          </div>

          <div>
            <span className="text-[#22D3EE] font-semibold">DEPTH:</span>{" "}
            <span className="text-white font-bold drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]">{Math.abs(Math.round(currentZ))} M</span>
          </div>
        </div>

        {/* Highway Progress Bar */}
        <div className="w-full h-1.5 rounded-full bg-[#060F22]/50 border border-[#22D3EE]/30 overflow-hidden backdrop-blur-md">
          <div
            className="h-full bg-gradient-to-r from-[#168BFF] via-[#22D3EE] to-white shadow-[0_0_12px_#22D3EE] transition-all duration-300"
            style={{ width: `${Math.round(scrollProgress * 100)}%` }}
          />
        </div>
      </div>

      {/* Bottom Right: Status Indicator */}
      <div className="hidden md:flex items-center gap-2 p-3 rounded-xl bg-[#060F22]/45 border border-[#22D3EE]/45 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.65),0_0_18px_rgba(34,211,238,0.25)] text-xs font-mono">
        <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-ping shadow-[0_0_8px_#22D3EE]" />
        <span className="text-[#22D3EE] font-bold drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]">{currentSection.number}</span>
        <span className="text-white font-medium">/ 08</span>
      </div>
    </div>
  );
}
