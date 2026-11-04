"use client";

import { useMemo, useState, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { PROJECTS } from "@/data/portfolioData";
import { Project } from "@/types/portfolio";
import { ArrowUpRight, ChevronRight } from "lucide-react";
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
  const opacity = dist > (isMobile ? 36 : 45) ? 0 : Math.max(0, 1 - dist / (isMobile ? 28 : 38));

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
        <mesh position={[0, -1.9, 0]}>
          <cylinderGeometry args={[0.5, 0.7, 0.4, 6]} />
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
          <planeGeometry args={[3.8, 4.4]} />
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
          className={`w-[88vw] max-w-[325px] md:w-[315px] p-4 rounded-3xl transition-all duration-300 backdrop-blur-md relative cursor-pointer overflow-visible select-none group ${
            isHovered
              ? "bg-[#061226]/50 border-2 border-[#22D3EE] shadow-[0_0_30px_rgba(34,211,238,0.5)]"
              : "bg-[#040817]/40 border border-[#22D3EE]/35 shadow-[0_0_20px_rgba(22,139,255,0.2)]"
          }`}
        >
          {/* Shiny Neon Blue Corner Edges covering vertical and horizontal portions */}
          <NeonCardBorders rounded="3xl" />

          {/* Project Image Thumbnail */}
          <div className="relative w-full h-[142px] rounded-xl overflow-hidden border border-[#22D3EE]/40 mb-3 bg-[#03060D]/60">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060F22]/90 via-transparent to-transparent" />

            {/* Top Category Badge */}
            <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-[#03060D]/80 border border-[#22D3EE]/70 text-[10px] font-mono text-[#22D3EE] font-bold shadow-[0_0_10px_rgba(34,211,238,0.5)]">
              {project.category.split(" ")[0]}
            </div>

            <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-[#168BFF] text-white shadow-[0_0_12px_#168BFF] group-hover:scale-110 transition-transform">
              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </div>
          </div>

          {/* Project Title (Brilliant White with Neon Glow) */}
          <h3 className="text-base font-bold font-orbitron text-white group-hover:text-[#22D3EE] transition-colors truncate drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]">
            {project.title}
          </h3>

          {/* Short Description (Luminous Bright Slate) */}
          <p className="text-[12px] text-[#E2E8F0] font-inter font-normal line-clamp-2 mt-1.5 leading-relaxed drop-shadow-[0_0_4px_rgba(255,255,255,0.2)]">
            {project.description}
          </p>

          {/* Technology Tags (Neon Cyan with glowing border) */}
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-md bg-[#081836]/70 border border-[#22D3EE]/50 text-[#22D3EE] shadow-[0_0_8px_rgba(34,211,238,0.25)]"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#168BFF]/40 border border-[#168BFF] text-white shadow-[0_0_8px_rgba(22,139,255,0.5)]">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Click Cue */}
          <div className="mt-3.5 pt-2.5 border-t border-[#22D3EE]/25 flex items-center justify-between text-[11px] font-mono text-[#22D3EE] font-bold group-hover:text-white transition-colors">
            <span className="tracking-wider">CLICK TO EXPAND DETAILS</span>
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
      // On mobile: Sequential drive-through layout directly along highway center (X = 0)
      return [
        { project: PROJECTS[0], x: 0, y: 1.8, z: -205, side: "left" as const },
        { project: PROJECTS[1], x: 0, y: 1.8, z: -225, side: "right" as const },
        { project: PROJECTS[2], x: 0, y: 1.8, z: -245, side: "left" as const },
        { project: PROJECTS[3], x: 0, y: 1.8, z: -265, side: "right" as const },
      ];
    }
    return [
      { project: PROJECTS[0], x: -4.9, y: 1.8, z: -205, side: "left" as const },
      { project: PROJECTS[1], x: 4.9, y: 1.8, z: -225, side: "right" as const },
      { project: PROJECTS[2], x: -4.9, y: 1.8, z: -245, side: "left" as const },
      { project: PROJECTS[3], x: 4.9, y: 1.8, z: -265, side: "right" as const },
    ];
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
