"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { Highway } from "./Highway";
import { TunnelRings } from "./TunnelRings";
import { CitySkyline } from "./CitySkyline";
import { ParticleField } from "./ParticleField";
import { CameraController } from "./CameraController";
import { Scene1Portal } from "./scenes/Scene1Portal";
import { Scene2About } from "./scenes/Scene2About";
import { Scene3Skills } from "./scenes/Scene3Skills";
import { Scene4Projects } from "./scenes/Scene4Projects";
import { Scene5Experience } from "./scenes/Scene5Experience";
import { Scene6Articles } from "./scenes/Scene6Articles";
import { Scene6Github } from "./scenes/Scene6Github";
import { Scene7Contact } from "./scenes/Scene7Contact";
import { Project, ExperienceItem } from "@/types/portfolio";

interface ExperienceCanvasProps {
  currentZ: number;
  velocity: number;
  isModalOpen?: boolean;
  onExploreClick: () => void;
  onExploreMoreAbout: () => void;
  onSelectProject: (project: Project) => void;
  onSelectExperience?: (exp: ExperienceItem) => void;
  selectedExperienceId?: string;
  onRestartExperience: () => void;
}

export function ExperienceCanvas({
  currentZ,
  velocity,
  isModalOpen,
  onExploreClick,
  onExploreMoreAbout,
  onSelectProject,
  onSelectExperience,
  selectedExperienceId,
  onRestartExperience,
}: ExperienceCanvasProps) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#03060D] z-0">
      <Canvas
        camera={{ position: [0, 2.2, 8], fov: 55, near: 0.1, far: 1500 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: false,
        }}
        dpr={[1, 1.75]}
      >
        <color attach="background" args={["#03060D"]} />
        {/* Dark cinematic atmospheric fog blending into horizon */}
        <fogExp2 attach="fog" args={["#03060D", 0.0032]} />

        {/* Ambient & Sci-Fi City Lighting */}
        <ambientLight intensity={0.5} color="#081426" />
        <directionalLight position={[0, 25, currentZ + 15]} intensity={1.1} color="#168BFF" />
        <pointLight position={[0, 16, currentZ - 20]} intensity={0.06} color="#168BFF" distance={80} decay={2} />

        <Suspense fallback={null}>
          {/* Camera Controller driven by scroll progress */}
          <CameraController currentZ={currentZ} velocity={velocity} />

          {/* Highway Infrastructure */}
          <Highway velocity={velocity} />
          <TunnelRings velocity={velocity} />
          <CitySkyline currentZ={currentZ} />
          <ParticleField />

          {/* 8 Interactive Spatial Scenes */}
          <Scene1Portal currentZ={currentZ} onExploreClick={onExploreClick} isModalOpen={isModalOpen} />
          <Scene2About currentZ={currentZ} onExploreMore={onExploreMoreAbout} isModalOpen={isModalOpen} />
          <Scene3Skills currentZ={currentZ} isModalOpen={isModalOpen} />
          <Scene4Projects currentZ={currentZ} onSelectProject={onSelectProject} isModalOpen={isModalOpen} />
          <Scene5Experience
            currentZ={currentZ}
            onSelectExperience={onSelectExperience}
            selectedExperienceId={selectedExperienceId}
            isModalOpen={isModalOpen}
          />
          <Scene6Articles currentZ={currentZ} isModalOpen={isModalOpen} />
          <Scene6Github currentZ={currentZ} />
          <Scene7Contact currentZ={currentZ} onRestartExperience={onRestartExperience} />

          {/* Post Processing for Cinematic Neon Bloom */}
          <EffectComposer multisampling={0}>
            <Bloom
              luminanceThreshold={0.58}
              luminanceSmoothing={0.7}
              intensity={1.05}
              mipmapBlur
            />
            <Vignette eskil={false} offset={0.16} darkness={0.92} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
