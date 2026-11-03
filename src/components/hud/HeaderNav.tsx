"use client";

import { SECTIONS, PERSONAL_INFO } from "@/data/portfolioData";
import { Volume2, VolumeX } from "lucide-react";

interface HeaderNavProps {
  activeSectionIndex: number;
  onNavigate: (index: number) => void;
  isMuted: boolean;
  onToggleSound: () => void;
  onPlayClick: () => void;
}

export function HeaderNav({
  activeSectionIndex,
  onNavigate,
  isMuted,
  onToggleSound,
  onPlayClick,
}: HeaderNavProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between pointer-events-auto backdrop-blur-2xl bg-[#03060D]/40 border-b border-[#22D3EE]/20 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
      {/* Brand Logo AKD */}
      <div
        onClick={() => {
          onPlayClick();
          onNavigate(0);
        }}
        className="flex items-center gap-2.5 cursor-pointer group select-none"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#168BFF] via-[#007BFF] to-[#22D3EE] p-[1.5px] shadow-[0_0_15px_rgba(34,211,238,0.5)] group-hover:scale-105 transition-transform">
          <div className="w-full h-full bg-[#081426] rounded-[10px] flex items-center justify-center">
            <span className="font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] to-white text-base tracking-wider drop-shadow-[0_0_8px_#22D3EE]">
              {PERSONAL_INFO.shortName}
            </span>
          </div>
        </div>
        <div className="hidden sm:block">
          <span className="text-sm font-bold font-orbitron tracking-wider text-white block drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
            {PERSONAL_INFO.name}
          </span>
          <span className="text-[10px] font-mono text-[#22D3EE] tracking-widest block uppercase font-bold drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]">
            {PERSONAL_INFO.title}
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-[#060F22]/40 border border-[#22D3EE]/35 backdrop-blur-2xl shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        {SECTIONS.slice(1).map((sec, idx) => {
          const sectionIndex = idx + 1;
          const isActive = activeSectionIndex === sectionIndex;

          return (
            <button
              key={sec.id}
              onClick={() => {
                onPlayClick();
                onNavigate(sectionIndex);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-300 ${
                isActive
                  ? "bg-[#168BFF] text-white shadow-[0_0_18px_#168BFF] scale-105"
                  : "text-[#E2E8F0] hover:text-white hover:bg-[#101F38]/60 hover:shadow-[0_0_10px_rgba(34,211,238,0.3)]"
              }`}
            >
              {sec.name}
            </button>
          );
        })}
      </nav>

      {/* Audio Sound Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            onToggleSound();
          }}
          title={isMuted ? "Unmute Sci-Fi Audio" : "Mute Audio"}
          className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center gap-2 group backdrop-blur-xl ${
            !isMuted
              ? "bg-[#081836]/60 border-[#22D3EE] text-[#22D3EE] shadow-[0_0_15px_rgba(34,211,238,0.5)]"
              : "bg-[#060F22]/40 border-[#22D3EE]/25 text-[#E2E8F0] hover:text-white hover:border-[#22D3EE]/50"
          }`}
        >
          {!isMuted ? (
            <>
              <Volume2 className="w-4 h-4 text-[#22D3EE] animate-pulse drop-shadow-[0_0_6px_#22D3EE]" />
              <span className="hidden sm:inline text-[11px] font-mono font-bold text-[#22D3EE]">
                AUDIO ON
              </span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-white" />
              <span className="hidden sm:inline text-[11px] font-mono font-semibold text-white">
                AUDIO OFF
              </span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
