"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useAudioSynth } from "@/hooks/useAudioSynth";
import { HeaderNav } from "@/components/hud/HeaderNav";
import { SectionProgress } from "@/components/hud/SectionProgress";
import { TelemetryHUD } from "@/components/hud/TelemetryHUD";
import { ProjectModal } from "@/components/hud/ProjectModal";
import { ExperienceModal } from "@/components/hud/ExperienceModal";
import { LoadingScreen } from "@/components/hud/LoadingScreen";
import { Project, ExperienceItem } from "@/types/portfolio";
import { SECTIONS } from "@/data/portfolioData";

// Dynamically import ExperienceCanvas with SSR disabled for WebGL
const ExperienceCanvas = dynamic(
  () =>
    import("@/components/3d/ExperienceCanvas").then((mod) => mod.ExperienceCanvas),
  { ssr: false }
);

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const lastWhooshTimeRef = useRef(0);

  const {
    scrollProgress,
    currentZ,
    velocity,
    activeSectionIndex,
    jumpToSection,
    jumpToZ,
  } = useScrollProgress(!!selectedProject || !!selectedExperience);

  const { isMuted, toggleSound, playClick, playWhoosh, playWarp } =
    useAudioSynth();

  // Play scroll whoosh sound effect when accelerating forward
  useEffect(() => {
    const now = performance.now();
    if (velocity > 18 && now - lastWhooshTimeRef.current > 700) {
      lastWhooshTimeRef.current = now;
      playWhoosh(Math.min(velocity / 20, 1.5));
    }
  }, [velocity, playWhoosh]);

  const handleRestart = () => {
    playWarp();
    jumpToZ(5);
  };

  const handleExploreIntro = () => {
    playClick();
    playWhoosh(1.2);
    jumpToSection(1); // Jump to About Me
  };

  const handleExploreMoreAbout = () => {
    playClick();
    jumpToSection(2); // Jump to Skills
  };

  const handleSelectProject = (project: Project) => {
    playClick();
    setSelectedProject(project);
  };

  const handleSelectExperience = (exp: ExperienceItem) => {
    playClick();
    setSelectedExperience(exp);
  };

  const isModalOpen = !!selectedProject || !!selectedExperience;

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#03060D]">
      {/* 3D WebGL Highway Experience */}
      <ExperienceCanvas
        currentZ={currentZ}
        velocity={velocity}
        isModalOpen={isModalOpen}
        onExploreClick={handleExploreIntro}
        onExploreMoreAbout={handleExploreMoreAbout}
        onSelectProject={handleSelectProject}
        onSelectExperience={handleSelectExperience}
        selectedExperienceId={selectedExperience?.id}
        onRestartExperience={handleRestart}
      />

      {/* 2D HUD Overlays */}
      <HeaderNav
        activeSectionIndex={activeSectionIndex}
        onNavigate={jumpToSection}
        isMuted={isMuted}
        onToggleSound={toggleSound}
        onPlayClick={playClick}
      />

      <SectionProgress
        activeSectionIndex={activeSectionIndex}
        onNavigate={jumpToSection}
        onPlayClick={playClick}
      />

      <TelemetryHUD
        currentZ={currentZ}
        velocity={velocity}
        scrollProgress={scrollProgress}
        activeSectionIndex={activeSectionIndex}
      />

      {/* Interactive Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onPlayClick={playClick}
      />

      {/* Interactive Experience Milestone Detail Modal */}
      <ExperienceModal
        experience={selectedExperience}
        onClose={() => setSelectedExperience(null)}
        onSelectMilestone={(exp) => {
          playClick();
          setSelectedExperience(exp);
        }}
        onPlayClick={playClick}
      />

      {/* Initial Startup Cyber Loader */}
      {!isLoaded && <LoadingScreen onLoaded={() => setIsLoaded(true)} />}
    </main>
  );
}

