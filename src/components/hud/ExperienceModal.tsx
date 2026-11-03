"use client";

import { useEffect, useState, useCallback } from "react";
import { ExperienceItem } from "@/types/portfolio";
import { EXPERIENCES } from "@/data/portfolioData";
import { X, Calendar, MapPin, Award, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

interface ExperienceModalProps {
  experience: ExperienceItem | null;
  onClose: () => void;
  onSelectMilestone: (exp: ExperienceItem) => void;
  onPlayClick: () => void;
}

export function ExperienceModal({
  experience,
  onClose,
  onSelectMilestone,
  onPlayClick,
}: ExperienceModalProps) {
  const [mountedExperience, setMountedExperience] = useState<ExperienceItem | null>(experience);
  const [isExiting, setIsExiting] = useState(false);

  // Chronological order: 2018-2020 MCA -> 2021-2023 Freelance -> 2023-Present Gadget Software
  const chronologicalMilestones = [
    EXPERIENCES.find((e) => e.id === "education") || EXPERIENCES[2],
    EXPERIENCES.find((e) => e.id === "freelance") || EXPERIENCES[1],
    EXPERIENCES.find((e) => e.id === "gadget") || EXPERIENCES[0],
  ].filter(Boolean) as ExperienceItem[];

  useEffect(() => {
    if (experience) {
      setMountedExperience(experience);
      setIsExiting(false);
    } else if (mountedExperience && !isExiting) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setMountedExperience(null);
      }, 280);
      return () => clearTimeout(timer);
    }
  }, [experience]);

  const handleClose = useCallback(() => {
    if (isExiting) return;
    onPlayClick();
    setIsExiting(true);
    setTimeout(() => {
      onClose();
      setMountedExperience(null);
    }, 280);
  }, [isExiting, onClose, onPlayClick]);

  const currentIndex = mountedExperience
    ? chronologicalMilestones.findIndex((e) => e.id === mountedExperience.id)
    : -1;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mountedExperience && !isExiting) {
        handleClose();
      }
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        onPlayClick();
        onSelectMilestone(chronologicalMilestones[currentIndex - 1]);
      }
      if (e.key === "ArrowRight" && currentIndex < chronologicalMilestones.length - 1) {
        onPlayClick();
        onSelectMilestone(chronologicalMilestones[currentIndex + 1]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mountedExperience, isExiting, currentIndex, handleClose, onPlayClick, onSelectMilestone, chronologicalMilestones]);

  if (!mountedExperience) return null;

  const milestoneCategoryNames = ["ACADEMIC FOUNDATION", "INDEPENDENT CONSULTING", "SENIOR ENGINEERING & ARCHITECTURE"];
  const currentCategory = currentIndex >= 0 ? milestoneCategoryNames[currentIndex] : "CAREER MILESTONE";

  // Accent color per milestone: Neon Blue & Cyan palette
  const accentColors = [
    { border: "border-[#00D2FF]", glow: "shadow-[0_0_35px_rgba(0,210,255,0.4)]", text: "text-[#00D2FF]", dot: "bg-[#00D2FF]" },
    { border: "border-[#22D3EE]", glow: "shadow-[0_0_35px_rgba(34,211,238,0.4)]", text: "text-[#22D3EE]", dot: "bg-[#22D3EE]" },
    { border: "border-[#168BFF]", glow: "shadow-[0_0_35px_rgba(22,139,255,0.45)]", text: "text-[#168BFF]", dot: "bg-[#168BFF]" },
  ];
  const accent = accentColors[currentIndex >= 0 ? currentIndex : 0];

  return (
    <div
      className={`fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto ${
        isExiting ? "modal-backdrop-out" : "modal-backdrop-in"
      }`}
    >
      {/* Click outside backdrop */}
      <div
        className="fixed inset-0 bg-[#03060D]/90 backdrop-blur-3xl"
        onClick={handleClose}
      />

      {/* Modal Container Wrapper */}
      <div
        className={`relative z-[1000000] w-full max-w-2xl my-auto ${
          isExiting ? "modal-content-out" : "modal-content-in"
        }`}
      >
        {/* Floating Close Cross Icon: Docked at top-right corner, always 100% visible */}
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 z-[1000020] p-2 sm:p-2.5 rounded-full bg-[#060F22] hover:bg-[#22D3EE] border-2 border-[#22D3EE] text-[#22D3EE] hover:text-[#03060D] shadow-[0_0_20px_rgba(34,211,238,0.9)] hover:shadow-[0_0_30px_#22D3EE] transition-all transform hover:scale-110 cursor-pointer flex items-center justify-center"
          title="Close"
          aria-label="Close"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Card Box with fixed header & scrollable body */}
        <div className={`w-full max-h-[85vh] flex flex-col rounded-3xl bg-[#060F22]/95 border-2 ${accent.border} ${accent.glow} overflow-hidden select-none`}>
          {/* Top Energy Accent Line */}
          <div className="w-full h-1.5 bg-gradient-to-r from-[#168BFF] via-[#00D2FF] to-[#22D3EE] flex-shrink-0" />

          {/* Fixed Top Header (Does not scroll) */}
          <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 bg-[#081836]/90 border-b border-[#22D3EE]/30 backdrop-blur-xl flex-shrink-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#081836] border border-[#22D3EE] text-xs font-mono font-bold text-[#22D3EE] shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                MILESTONE 0{currentIndex + 1} OF 0{chronologicalMilestones.length}
              </span>
              <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full bg-[#168BFF]/30 border border-[#168BFF]/60 text-[11px] font-mono text-white font-semibold">
                {currentCategory}
              </span>
            </div>
          </div>

          {/* Scrollable Body Content */}
          <div className="overflow-y-auto p-5 sm:p-7 scrollbar-thin scrollbar-thumb-[#00D2FF]">
            {/* Title & Role */}
            <h2 className="text-2xl sm:text-3xl font-extrabold font-orbitron text-white drop-shadow-[0_0_14px_rgba(255,255,255,0.9)] tracking-wide">
              {mountedExperience.role}
            </h2>

            {/* Company & Location / Period Meta */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-2 mb-5">
              <span className={`text-base font-bold ${accent.text} drop-shadow-[0_0_8px_currentColor]`}>
                {mountedExperience.company}
              </span>
              <div className="flex items-center gap-3 text-xs font-mono text-white">
                <span className="flex items-center gap-1.5 font-semibold bg-[#081836]/70 px-2.5 py-1 rounded-lg border border-[#22D3EE]/30">
                  <Calendar className="w-3.5 h-3.5 text-[#22D3EE]" />
                  {mountedExperience.period}
                </span>
                <span className="flex items-center gap-1.5 font-semibold bg-[#081836]/70 px-2.5 py-1 rounded-lg border border-[#22D3EE]/30">
                  <MapPin className="w-3.5 h-3.5 text-[#22D3EE]" />
                  {mountedExperience.location}
                </span>
              </div>
            </div>

            {/* Role Overview */}
            <div className="mb-6 p-4 rounded-2xl bg-[#081836]/50 border border-[#22D3EE]/25">
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#22D3EE] uppercase mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#22D3EE]" />
                Overview &amp; Executive Summary
              </h4>
              <p className="text-sm text-[#EDF4FF] leading-relaxed drop-shadow-[0_0_3px_rgba(255,255,255,0.2)]">
                {mountedExperience.description}
              </p>
            </div>

            {/* Key Achievements */}
            <div className="mb-6">
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#22D3EE] uppercase mb-3 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#22D3EE]" />
                Key Contributions &amp; Technical Highlights
              </h4>
              <div className="space-y-2.5">
                {mountedExperience.achievements.map((ach, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-[#081836]/35 border border-[#22D3EE]/20 hover:border-[#22D3EE]/50 transition-colors"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#168BFF]/25 border border-[#22D3EE] flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-mono font-bold text-[#22D3EE] shadow-[0_0_8px_rgba(34,211,238,0.4)]">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm text-[#F1F5F9] leading-relaxed">
                      {ach}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Skills & Tech */}
            <div className="mb-6">
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#22D3EE] uppercase mb-2.5">
                Core Competencies &amp; Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {mountedExperience.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-[#081836]/80 text-[#22D3EE] border border-[#22D3EE]/40 shadow-[0_0_8px_rgba(34,211,238,0.15)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer: Milestone Switcher & Close */}
            <div className="pt-4 border-t border-[#22D3EE]/30 flex flex-wrap items-center justify-between gap-3">
              {/* Previous / Next */}
              <div className="flex items-center gap-2">
                <button
                  disabled={currentIndex <= 0}
                  onClick={() => {
                    if (currentIndex > 0) {
                      onPlayClick();
                      onSelectMilestone(chronologicalMilestones[currentIndex - 1]);
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#081836]/70 border border-[#22D3EE]/40 text-xs font-mono text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#22D3EE] hover:shadow-[0_0_10px_#22D3EE] transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#22D3EE]" />
                  Prev Milestone
                </button>

                <button
                  disabled={currentIndex >= chronologicalMilestones.length - 1}
                  onClick={() => {
                    if (currentIndex < chronologicalMilestones.length - 1) {
                      onPlayClick();
                      onSelectMilestone(chronologicalMilestones[currentIndex + 1]);
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#081836]/70 border border-[#22D3EE]/40 text-xs font-mono text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#22D3EE] hover:shadow-[0_0_10px_#22D3EE] transition-all cursor-pointer"
                >
                  Next Milestone
                  <ArrowRight className="w-3.5 h-3.5 text-[#22D3EE]" />
                </button>
              </div>

              {/* Dots Indicator */}
              <div className="flex items-center gap-1.5">
                {chronologicalMilestones.map((milestone, idx) => (
                  <button
                    key={milestone.id}
                    onClick={() => {
                      onPlayClick();
                      onSelectMilestone(milestone);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === currentIndex
                        ? "w-6 bg-[#22D3EE] shadow-[0_0_8px_#22D3EE]"
                        : "bg-[#22D3EE]/30 hover:bg-[#22D3EE]/60"
                    }`}
                    title={milestone.role}
                  />
                ))}
              </div>

              {/* Close Action */}
              <button
                onClick={handleClose}
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#168BFF] to-[#22D3EE] text-xs font-orbitron font-bold text-white shadow-[0_0_12px_rgba(34,211,238,0.5)] hover:shadow-[0_0_20px_rgba(34,211,238,0.8)] transition-all cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
