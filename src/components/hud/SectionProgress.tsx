"use client";

import { SECTIONS } from "@/data/portfolioData";

interface SectionProgressProps {
  activeSectionIndex: number;
  onNavigate: (index: number) => void;
  onPlayClick: () => void;
}

export function SectionProgress({
  activeSectionIndex,
  onNavigate,
  onPlayClick,
}: SectionProgressProps) {
  return (
    <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-5 select-none pointer-events-auto">
      {/* Background guide rail */}
      <div className="absolute right-[5px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-transparent via-[#22D3EE]/40 to-transparent -z-10" />

      {SECTIONS.map((sec, idx) => {
        const isActive = activeSectionIndex === idx;

        return (
          <button
            key={sec.id}
            onClick={() => {
              onPlayClick();
              onNavigate(idx);
            }}
            className="flex items-center gap-3.5 group cursor-pointer text-right transition-transform hover:-translate-x-1"
          >
            {/* Label */}
            <span
              className={`text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                isActive
                  ? "text-[#22D3EE] font-black scale-110 drop-shadow-[0_0_12px_rgba(34,211,238,0.95)]"
                  : "text-white/80 group-hover:text-white font-semibold drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]"
              }`}
            >
              <span className="font-orbitron mr-1.5 opacity-90">{sec.number}</span>
              <span>{sec.name}</span>
            </span>

            {/* Glowing Indicator Node */}
            <div
              className={`relative flex items-center justify-center transition-all duration-300 ${
                isActive ? "w-3 h-3" : "w-2.5 h-2.5"
              }`}
            >
              {isActive && (
                <span className="absolute w-5 h-5 rounded-full bg-[#22D3EE]/40 animate-ping" />
              )}
              <span
                className={`w-full h-full rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-[#22D3EE] shadow-[0_0_12px_#22D3EE] ring-2 ring-white"
                    : "bg-[#1B2A40] group-hover:bg-[#22D3EE] group-hover:shadow-[0_0_8px_#22D3EE]"
                }`}
              />
            </div>
          </button>
        );
      })}
    </aside>
  );
}
