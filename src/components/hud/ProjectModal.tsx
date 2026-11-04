"use client";

import { useEffect, useState, useCallback } from "react";
import { Project } from "@/types/portfolio";
import { X, ExternalLink, Github, CheckCircle2, ShieldCheck, Cpu } from "lucide-react";
import { NeonCardBorders } from "@/components/ui/NeonCardBorders";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onPlayClick: () => void;
}

export function ProjectModal({ project, onClose, onPlayClick }: ProjectModalProps) {
  const [mountedProject, setMountedProject] = useState<Project | null>(project);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (project) {
      setMountedProject(project);
      setIsExiting(false);
    } else if (mountedProject && !isExiting) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setMountedProject(null);
      }, 280);
      return () => clearTimeout(timer);
    }
  }, [project]);

  const handleClose = useCallback(() => {
    if (isExiting) return;
    onPlayClick();
    setIsExiting(true);
    setTimeout(() => {
      onClose();
      setMountedProject(null);
    }, 280);
  }, [isExiting, onClose, onPlayClick]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mountedProject && !isExiting) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mountedProject, isExiting, handleClose]);

  if (!mountedProject) return null;

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
        className={`relative z-[1000000] w-full max-w-3xl my-auto ${
          isExiting ? "modal-content-out" : "modal-content-in"
        }`}
      >
        {/* Shiny Neon Border Segments */}
        <NeonCardBorders color="cyan" />
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
        <div className="w-full max-h-[85vh] flex flex-col rounded-3xl bg-[#060F22]/95 border-2 border-[#22D3EE] shadow-[0_0_50px_rgba(34,211,238,0.5)] overflow-hidden select-none">
          {/* Top Energy Accent Line */}
          <div className="w-full h-1.5 bg-gradient-to-r from-[#168BFF] via-[#22D3EE] to-[#168BFF] flex-shrink-0" />

          {/* Fixed Top Header (Does not scroll, image is below it) */}
          <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 bg-[#081836]/90 border-b border-[#22D3EE]/30 backdrop-blur-xl flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#03060D] border border-[#22D3EE] text-xs font-mono text-[#22D3EE] font-bold shadow-[0_0_10px_rgba(34,211,238,0.4)]">
                {mountedProject.category}
              </span>
              {mountedProject.featured && (
                <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full bg-[#168BFF]/40 border border-[#168BFF] text-[11px] font-mono text-white font-bold shadow-[0_0_8px_rgba(22,139,255,0.5)]">
                  ★ FEATURED ARCHITECTURE
                </span>
              )}
            </div>
          </div>

          {/* Scrollable Body Content */}
          <div className="overflow-y-auto p-5 sm:p-7 scrollbar-thin scrollbar-thumb-[#22D3EE]">
            {/* Large Project Preview Image (Below header, never overlaps buttons) */}
            <div className="relative w-full h-[220px] sm:h-[260px] rounded-2xl overflow-hidden border border-[#22D3EE]/40 mb-6 bg-[#03060D]/70">
              <img
                src={mountedProject.image}
                alt={mountedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060F22]/90 via-transparent to-transparent opacity-85" />
            </div>

            {/* Title & Subtitle */}
            <h2 className="text-2xl sm:text-3xl font-black font-orbitron text-white tracking-wide drop-shadow-[0_0_16px_rgba(255,255,255,0.9)]">
              {mountedProject.title}
            </h2>
            <p className="text-sm text-[#22D3EE] font-mono mt-1 font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
              {mountedProject.subtitle}
            </p>

            {/* Detailed Description */}
            <p className="text-sm sm:text-base text-[#F1F5F9] font-inter font-normal leading-relaxed mt-4 drop-shadow-[0_0_4px_rgba(255,255,255,0.2)]">
              {mountedProject.description}
            </p>

            {/* Responsibilities & Architecture Highlights */}
            <div className="mt-6">
              <h3 className="text-xs font-mono text-[#22D3EE] uppercase tracking-widest flex items-center gap-2 mb-3 font-bold drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]">
                <ShieldCheck className="w-4 h-4 text-[#22D3EE]" />
                <span>Key Contributions &amp; Engineering Highlights</span>
              </h3>

              <div className="space-y-2.5">
                {mountedProject.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-white p-3 rounded-xl bg-[#081836]/50 border border-[#22D3EE]/25 shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#22D3EE] flex-shrink-0 mt-0.5 drop-shadow-[0_0_6px_#22D3EE]" />
                    <span className="font-inter font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology Stack */}
            <div className="mt-6">
              <h3 className="text-xs font-mono text-[#22D3EE] uppercase tracking-widest flex items-center gap-2 mb-3 font-bold drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]">
                <Cpu className="w-4 h-4 text-[#22D3EE]" />
                <span>Production Technology Stack</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {mountedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg bg-[#081836]/70 border border-[#22D3EE]/60 text-xs font-mono text-[#22D3EE] font-bold shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links & Bottom Close */}
            <div className="mt-8 pt-5 border-t border-[#22D3EE]/25 flex flex-wrap items-center gap-3">
              {mountedProject.liveUrl && (
                <a
                  href={mountedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-5 rounded-xl bg-[#168BFF] hover:bg-[#007BFF] text-white text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(22,139,255,0.7)] cursor-pointer"
                >
                  <span>Visit Live Platform</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {mountedProject.githubUrl && (
                <a
                  href={mountedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-5 rounded-xl bg-[#081836]/70 hover:bg-[#168BFF]/30 border border-[#22D3EE]/50 text-white text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 shadow-[0_0_12px_rgba(34,211,238,0.25)] cursor-pointer"
                >
                  <Github className="w-4 h-4 text-[#22D3EE]" />
                  <span>View Source</span>
                </a>
              )}

              <button
                onClick={handleClose}
                className="py-2.5 px-5 rounded-xl bg-[#081836]/70 hover:bg-[#168BFF]/30 border border-[#22D3EE]/40 text-white hover:text-[#22D3EE] text-xs font-mono font-bold tracking-wider uppercase transition-all ml-auto cursor-pointer"
              >
                Close &amp; Return to Highway
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
