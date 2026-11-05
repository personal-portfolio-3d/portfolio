"use client";

import { useMemo, useState, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { PROJECTS } from "@/data/portfolioData";
import { Project } from "@/types/portfolio";
import { ArrowUpRight, ChevronRight, Sparkles } from "lucide-react";
import { NeonCardBorders } from "@/components/ui/NeonCardBorders";

interface Scene4ProjectsProps {
  currentZ: number;
  onSelectProject: (project: Project) => void;
  isModalOpen?: boolean;
}

interface ProjectRoadsideCardProps {
  project: Project;
  x: number;
  y: number;
  z: number;
  side: "left" | "right";
  currentZ: number;
  isModalOpen?: boolean;
  isMobile?: boolean;
  onSelectProject: (project: Project) => void;
}

function ProjectRoadsideCard({
  project,
  x,
  y,
  z,
  side,
  currentZ,
  isModalOpen,
  isMobile = false,
  onSelectProject,
}: ProjectRoadsideCardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);

  const dist = Math.abs(currentZ - z);
  const maxDist = isMobile ? 16 : 38;
  const fadeDist = isMobile ? 11 : 28;
  const opacity = dist > maxDist ? 0 : Math.max(0, 1 - dist / fadeDist);

  const isLeft = side === "left";
  // On mobile: cards face screen directly along highway centerline (rotY = 0)
  const baseRotY = isMobile ? 0 : isLeft ? 0.52 : -0.52; // ~30 deg towards highway
  const hoverRotY = isMobile ? 0 : isLeft ? 0.04 : -0.04; // ~2.3 deg facing screen/camera

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetRotY = isHovered ? hoverRotY : baseRotY;
    const targetZ = z + (isHovered ? 0.4 : 0);

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotY,
      7,
      delta
    );
    groupRef.current.position.z = THREE.MathUtils.damp(
      groupRef.current.position.z,
      targetZ,
      7,
      delta
    );
  });

  if (opacity <= 0.01) return null;

  return (
    <group ref={groupRef} position={[x, y, z]} rotation={[0, baseRotY, 0]}>
      {/* 3D Base Pylon (Desktop only) */}
      {!isMobile && (
        <mesh position={[0, -2.2, 0]}>
          <cylinderGeometry args={[0.55, 0.75, 0.45, 6]} />
          <meshStandardMaterial
            color="#168BFF"
            emissive="#168BFF"
            emissiveIntensity={2}
            wireframe
          />
        </mesh>
      )}

      {/* Glowing 3D Wireframe Boundary (Desktop only) */}
      {!isMobile && (
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[4.4, 5.5]} />
          <meshBasicMaterial
            color={isHovered ? "#22D3EE" : "#168BFF"}
            wireframe
            transparent
            opacity={opacity * 0.45}
          />
        </mesh>
      )}

      {/* 3D Ultra-Transparent Glass Card */}
      <Html
        transform
        distanceFactor={isMobile ? 5.5 : 5.2}
        position={[0, 0, 0.05]}
        style={{
          opacity: isModalOpen ? 0 : opacity,
          transition: "opacity 0.25s ease-out, transform 0.3s ease-out",
          pointerEvents: isModalOpen || opacity <= 0.3 ? "none" : "auto",
          transform: isHovered ? "scale(1.03)" : "scale(1)",
        }}
      >
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => onSelectProject(project)}
          className={`w-[90vw] max-w-[365px] md:w-[410px] p-5 sm:p-5.5 rounded-3xl transition-all duration-300 backdrop-blur-2xl relative cursor-pointer overflow-visible select-none group ${
            isHovered
              ? "bg-[#050D1E]/95 sm:bg-[#061226]/55 border-2 border-[#22D3EE] shadow-[0_0_35px_rgba(34,211,238,0.55)]"
              : "bg-[#040A18]/92 sm:bg-[#040817]/45 border border-[#22D3EE]/35 shadow-[0_8px_32px_rgba(0,0,0,0.7),0_0_22px_rgba(22,139,255,0.22)]"
          }`}
        >
          {/* Shiny Neon Blue Corner Edges covering vertical and horizontal portions */}
          <NeonCardBorders rounded="3xl" />

          {/* Project Image Thumbnail with Solid Opaque Background */}
          <div className="relative w-full h-[165px] sm:h-[185px] rounded-2xl overflow-hidden border border-[#22D3EE]/40 mb-3.5 bg-[#040A18] shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 bg-[#040A18]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040A18]/60 via-transparent to-transparent pointer-events-none" />

            {/* Top Category Badge */}
            <div className="absolute top-2.5 left-2.5 px-3 py-1 rounded-full bg-[#03060D]/85 border border-[#22D3EE]/70 text-[10.5px] font-mono text-[#22D3EE] font-bold shadow-[0_0_10px_rgba(34,211,238,0.5)]">
              {project.category}
            </div>

            <div className="absolute bottom-2.5 right-2.5 p-2 rounded-full bg-[#168BFF] text-white shadow-[0_0_14px_#168BFF] group-hover:scale-110 transition-transform">
              <ArrowUpRight className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Project Title (Brilliant White with Neon Glow) */}
          <h3 className="text-lg font-bold font-orbitron text-white group-hover:text-[#22D3EE] transition-colors truncate drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]">
            {project.title}
          </h3>

          {/* Project Subtitle */}
          {project.subtitle && (
            <div className="text-[11px] font-mono font-semibold text-[#00D2FF] truncate mt-1 flex items-center gap-1.5 drop-shadow-[0_0_6px_rgba(0,210,255,0.6)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] animate-pulse inline-block flex-shrink-0" />
              <span className="truncate">{project.subtitle}</span>
            </div>
          )}

          {/* Expanded Description (Luminous Bright Slate) */}
          <p className="text-[12.5px] text-[#E2E8F0] font-inter font-normal line-clamp-3 mt-2 leading-relaxed drop-shadow-[0_0_4px_rgba(255,255,255,0.2)]">
            {project.description}
          </p>

          {/* Key Architectural Impact Highlight Box */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="mt-3 p-2.5 rounded-xl bg-[#030B1C]/75 border border-[#00D2FF]/30 flex items-start gap-2 shadow-[0_0_12px_rgba(0,210,255,0.1)]">
              <div className="p-1 rounded bg-[#00D2FF]/15 text-[#00D2FF] mt-0.5 flex-shrink-0">
                <Sparkles className="w-3 h-3 text-[#00D2FF]" />
              </div>
              <div className="text-[11px] font-inter text-[#CBD5E1] leading-snug line-clamp-2">
                <span className="font-mono font-bold text-[#00D2FF] uppercase mr-1 text-[10px]">Impact:</span>
                {project.highlights[0]}
              </div>
            </div>
          )}

          {/* Technology Tags (Neon Cyan with glowing border) */}
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-md bg-[#081836]/70 border border-[#22D3EE]/50 text-[#22D3EE] shadow-[0_0_8px_rgba(34,211,238,0.25)]"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#168BFF]/40 border border-[#168BFF] text-white shadow-[0_0_8px_rgba(22,139,255,0.5)]">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Click Cue */}
          <div className="mt-3.5 pt-2.5 border-t border-[#22D3EE]/25 flex items-center justify-between text-[11px] font-mono text-[#22D3EE] font-bold group-hover:text-white transition-colors">
            <span className="tracking-wider">CLICK TO VIEW FULL CASE STUDY</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#22D3EE]" />
          </div>
        </div>
      </Html>
    </group>
  );
}

export function Scene4Projects({ currentZ, onSelectProject, isModalOpen }: Scene4ProjectsProps) {
  const { size, viewport } = useThree();
  const isMobile = size.width < 768 || viewport.aspect < 1.0;

  const sideProjects = useMemo(() => {
    if (isMobile) {
      // On mobile: Sequential drive-through layout directly along highway center with spacious 18m spacing
      return [
        { project: PROJECTS[0], x: 0, y: 1.8, z: -192, side: "left" as const },
        { project: PROJECTS[1], x: 0, y: 1.8, z: -210, side: "right" as const },
        { project: PROJECTS[2], x: 0, y: 1.8, z: -228, side: "left" as const },
        { project: PROJECTS[3], x: 0, y: 1.8, z: -246, side: "right" as const },
        { project: PROJECTS[4], x: 0, y: 1.8, z: -264, side: "left" as const },
        { project: PROJECTS[5], x: 0, y: 1.8, z: -282, side: "right" as const },
        { project: PROJECTS[6], x: 0, y: 1.8, z: -300, side: "left" as const },
        { project: PROJECTS[7], x: 0, y: 1.8, z: -318, side: "right" as const },
        { project: PROJECTS[8], x: 0, y: 1.8, z: -336, side: "left" as const },
        { project: PROJECTS[9], x: 0, y: 1.8, z: -354, side: "right" as const },
      ].filter((item) => Boolean(item.project));
    }
    return [
      { project: PROJECTS[0], x: -5.1, y: 1.8, z: -192, side: "left" as const },
      { project: PROJECTS[1], x: 5.1, y: 1.8, z: -210, side: "right" as const },
      { project: PROJECTS[2], x: -5.1, y: 1.8, z: -228, side: "left" as const },
      { project: PROJECTS[3], x: 5.1, y: 1.8, z: -246, side: "right" as const },
      { project: PROJECTS[4], x: -5.1, y: 1.8, z: -264, side: "left" as const },
      { project: PROJECTS[5], x: 5.1, y: 1.8, z: -282, side: "right" as const },
      { project: PROJECTS[6], x: -5.1, y: 1.8, z: -300, side: "left" as const },
      { project: PROJECTS[7], x: 5.1, y: 1.8, z: -318, side: "right" as const },
      { project: PROJECTS[8], x: -5.1, y: 1.8, z: -336, side: "left" as const },
      { project: PROJECTS[9], x: 5.1, y: 1.8, z: -354, side: "right" as const },
    ].filter((item) => Boolean(item.project));
  }, [isMobile]);

  return (
    <group>
      {sideProjects.map(({ project, x, y, z, side }) => (
        <ProjectRoadsideCard
          key={project.id}
          project={project}
          x={x}
          y={y}
          z={z}
          side={side}
          currentZ={currentZ}
          isModalOpen={isModalOpen}
          isMobile={isMobile}
          onSelectProject={onSelectProject}
        />
      ))}
    </group>
  );
}
