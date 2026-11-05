"use client";

import { useMemo, useState, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { CheckCircle2, Sparkles, Terminal, ArrowRight, MapPin, Zap, Cpu, ShieldCheck } from "lucide-react";
import { NeonCardBorders } from "@/components/ui/NeonCardBorders";

interface Scene2AboutProps {
  currentZ: number;
  onExploreMore?: () => void;
  isModalOpen?: boolean;
}

interface AboutRoadsideCardProps {
  side: "left" | "right";
  position: [number, number, number];
  opacity: number;
  isModalOpen?: boolean;
  isMobile?: boolean;
  children: (isHovered: boolean, setIsHovered: (h: boolean) => void) => React.ReactNode;
}

function AboutRoadsideCard({
  side,
  position,
  opacity,
  isModalOpen,
  isMobile = false,
  children,
}: AboutRoadsideCardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);

  const isLeft = side === "left";
  // Highway is at X=0. On mobile cards face screen directly (rotY = 0).
  const baseRotY = isMobile ? 0 : isLeft ? 0.50 : -0.50; // ~28.6 deg towards highway
  const hoverRotY = isMobile ? 0 : isLeft ? 0.04 : -0.04; // ~2.3 deg facing screen/camera

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetRotY = isHovered ? hoverRotY : baseRotY;
    const targetZ = position[2] + (isHovered ? 0.35 : 0);

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

  return (
    <group ref={groupRef} position={position} rotation={[0, baseRotY, 0]}>
      {children(isHovered, setIsHovered)}
    </group>
  );
}

export function Scene2About({ currentZ, onExploreMore, isModalOpen }: Scene2AboutProps) {
  const { size, viewport } = useThree();
  const isMobile = size.width < 768 || viewport.aspect < 1.0;

  const zPos = -60;
  const dist = Math.abs(currentZ - zPos);

  const opacity = useMemo(() => {
    if (dist > 40) return 0;
    return Math.max(0, 1 - dist / 35);
  }, [dist]);

  // Sequential card opacities on mobile as user drives forward
  const card1MobileOpacity = useMemo(() => {
    const d = Math.abs(currentZ - (zPos + 5));
    if (d > 25) return 0;
    return Math.max(0, 1 - d / 20);
  }, [currentZ, zPos]);

  const card2MobileOpacity = useMemo(() => {
    const d = Math.abs(currentZ - (zPos - 5));
    if (d > 25) return 0;
    return Math.max(0, 1 - d / 20);
  }, [currentZ, zPos]);

  if (opacity <= 0.01) return null;

  return (
    <group position={[0, 2, zPos]}>
      {/* 3D Holographic Side Podiums (Desktop only) */}
      {!isMobile && (
        <>
          <mesh position={[-4.5, -0.8, 0]}>
            <cylinderGeometry args={[0.6, 0.8, 0.4, 6]} />
            <meshStandardMaterial
              color="#168BFF"
              emissive="#168BFF"
              emissiveIntensity={2}
              wireframe
            />
          </mesh>
          <mesh position={[4.5, -0.8, 0]}>
            <cylinderGeometry args={[0.6, 0.8, 0.4, 6]} />
            <meshStandardMaterial
              color="#22D3EE"
              emissive="#22D3EE"
              emissiveIntensity={2}
              wireframe
            />
          </mesh>
        </>
      )}

      {/* Left Glassmorphic HUD Card: ABOUT ME */}
      <AboutRoadsideCard
        side="left"
        position={isMobile ? [0, 0.4, 5] : [-4.8, 0.4, 0]}
        opacity={isMobile ? card1MobileOpacity : opacity}
        isModalOpen={isModalOpen}
        isMobile={isMobile}
      >
        {(isHovered, setIsHovered) => (
          <Html
            transform
            distanceFactor={isMobile ? 5.5 : 5.2}
            position={[0, 0, 0.05]}
            style={{
              opacity: isModalOpen ? 0 : (isMobile ? card1MobileOpacity : opacity),
              transition: "opacity 0.25s ease-out, transform 0.3s ease-out",
              pointerEvents: isModalOpen || (isMobile ? card1MobileOpacity : opacity) <= 0.4 ? "none" : "auto",
              transform: isHovered ? "scale(1.03)" : "scale(1)",
            }}
          >
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`w-[92vw] max-w-[390px] md:w-[470px] p-6 sm:p-7 rounded-2xl transition-all duration-300 backdrop-blur-2xl relative overflow-visible select-none flex flex-col justify-between ${
                isHovered
                  ? "bg-[#030714] sm:bg-[#081836]/65 border-2 border-[#00D2FF] shadow-[0_0_35px_rgba(0,210,255,0.55)]"
                  : "bg-[#030714] sm:bg-[#060F22]/50 border border-[#00D2FF]/40 shadow-[0_8px_32px_rgba(0,0,0,0.85),0_0_20px_rgba(0,210,255,0.25)]"
              }`}
            >
              {/* Shiny Neon Blue Corner Edges covering vertical and horizontal portions */}
              <NeonCardBorders rounded="2xl" />

              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between pb-3 border-b border-[#00D2FF]/30">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-[#00D2FF] animate-pulse" />
                    <span className="text-xs font-mono text-[#00D2FF] font-bold tracking-widest uppercase drop-shadow-[0_0_8px_rgba(0,210,255,0.8)]">
                      IDENTITY MATRIX • PROFILE
                    </span>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#00D2FF]/15 border border-[#00D2FF]/50 text-[#00D2FF] font-bold shadow-[0_0_8px_rgba(0,210,255,0.3)]">
                    5+ YRS PROD XP
                  </span>
                </div>

                {/* Name & Title */}
                <h3 className="text-2xl sm:text-3xl font-black font-orbitron text-white tracking-wide drop-shadow-[0_0_14px_rgba(255,255,255,0.85)] mt-3">
                  ABOUT ME
                </h3>
                <span className="text-xs font-mono text-[#00D2FF] font-semibold tracking-wider block mt-0.5">
                  Senior Software Engineer &amp; Systems Architect
                </span>

                {/* Bio */}
                <p className="mt-3 text-sm text-[#F1F5F9] font-inter font-normal leading-relaxed drop-shadow-[0_0_4px_rgba(255,255,255,0.25)]">
                  {PERSONAL_INFO.bio}
                </p>

                {/* Key Technical Focus Areas (Enriched Content) */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-[#081836]/50 border border-[#00D2FF]/30 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#00D2FF] shrink-0" />
                    <span className="text-white font-medium">Distributed Microservices</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#081836]/50 border border-[#00D2FF]/30 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#00D2FF] shrink-0" />
                    <span className="text-white font-medium">AWS Bedrock &amp; Vector AI</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#081836]/50 border border-[#00D2FF]/30 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#00D2FF] shrink-0" />
                    <span className="text-white font-medium">HIPAA Clinical Security</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#081836]/50 border border-[#00D2FF]/30 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#00D2FF] shrink-0" />
                    <span className="text-white font-medium">High-Scale Enterprise PWAs</span>
                  </div>
                </div>

                {/* Key Metrics Row */}
                <div className="mt-4 pt-3 border-t border-[#00D2FF]/25 grid grid-cols-3 gap-2 text-center font-mono">
                  <div className="p-2 rounded-xl bg-[#081836]/40 border border-[#00D2FF]/20">
                    <span className="block text-base sm:text-lg font-black text-white font-orbitron drop-shadow-[0_0_8px_#00D2FF]">5+</span>
                    <span className="text-[10px] text-[#A0AEC0] uppercase tracking-wider">Years XP</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#081836]/40 border border-[#00D2FF]/20">
                    <span className="block text-base sm:text-lg font-black text-white font-orbitron drop-shadow-[0_0_8px_#00D2FF]">15+</span>
                    <span className="text-[10px] text-[#A0AEC0] uppercase tracking-wider">Services</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#081836]/40 border border-[#00D2FF]/20">
                    <span className="block text-base sm:text-lg font-black text-white font-orbitron drop-shadow-[0_0_8px_#00D2FF]">10+</span>
                    <span className="text-[10px] text-[#A0AEC0] uppercase tracking-wider">Orgs Shipped</span>
                  </div>
                </div>

                {/* Location & Status */}
                <div className="mt-3.5 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-[#E2E8F0]">
                    <MapPin className="w-3.5 h-3.5 text-[#00D2FF] shrink-0 drop-shadow-[0_0_6px_#00D2FF]" />
                    <span>{PERSONAL_INFO.location}</span>
                  </div>
                  <span className="text-[11px] text-[#00D2FF] font-semibold">Available for Senior Roles</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={onExploreMore}
                className="mt-5 w-full py-2.5 px-4 rounded-xl bg-[#081836]/70 hover:bg-[#168BFF]/40 border border-[#00D2FF]/60 hover:border-[#00D2FF] text-white text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_0_16px_rgba(0,210,255,0.3)]"
              >
                <span className="text-white group-hover:text-[#00D2FF] transition-colors">
                  Explore Technical Stack
                </span>
                <ArrowRight className="w-4 h-4 text-[#00D2FF] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </Html>
        )}
      </AboutRoadsideCard>

      {/* Right Glassmorphic HUD Card: PHILOSOPHY */}
      <AboutRoadsideCard
        side="right"
        position={isMobile ? [0, 0.4, -5] : [4.8, 0.4, 0]}
        opacity={isMobile ? card2MobileOpacity : opacity}
        isModalOpen={isModalOpen}
        isMobile={isMobile}
      >
        {(isHovered, setIsHovered) => (
          <Html
            transform
            distanceFactor={isMobile ? 5.5 : 5.2}
            position={[0, 0, 0.05]}
            style={{
              opacity: isModalOpen ? 0 : (isMobile ? card2MobileOpacity : opacity),
              transition: "opacity 0.25s ease-out, transform 0.3s ease-out",
              pointerEvents: isModalOpen || (isMobile ? card2MobileOpacity : opacity) <= 0.4 ? "none" : "auto",
              transform: isHovered ? "scale(1.03)" : "scale(1)",
            }}
          >
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`w-[92vw] max-w-[390px] md:w-[470px] p-6 sm:p-7 rounded-2xl transition-all duration-300 backdrop-blur-2xl relative overflow-visible select-none flex flex-col justify-between ${
                isHovered
                  ? "bg-[#030714] sm:bg-[#081836]/65 border-2 border-[#168BFF] shadow-[0_0_35px_rgba(22,139,255,0.55)]"
                  : "bg-[#030714] sm:bg-[#060F22]/50 border border-[#168BFF]/45 shadow-[0_8px_32px_rgba(0,0,0,0.85),0_0_20px_rgba(22,139,255,0.25)]"
              }`}
            >
              {/* Shiny Neon Blue Corner Edges covering vertical and horizontal portions */}
              <NeonCardBorders rounded="2xl" />

              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between pb-3 border-b border-[#168BFF]/30">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#00D2FF] animate-pulse" />
                    <span className="text-xs font-mono text-[#00D2FF] font-bold tracking-widest uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                      ENGINEERING CORE • VALUES
                    </span>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#168BFF]/20 border border-[#168BFF]/50 text-white font-bold">
                    5 PILLARS
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-2xl sm:text-3xl font-black font-orbitron text-white tracking-wide drop-shadow-[0_0_14px_rgba(255,255,255,0.85)] mt-3">
                  PHILOSOPHY
                </h3>
                <span className="text-xs font-mono text-[#00D2FF] font-semibold tracking-wider block mt-0.5">
                  Architectural Principles &amp; Design Standards
                </span>

                {/* 5 Expanded Principles with Detailed Descriptions */}
                <div className="mt-4 space-y-2.5">
                  {[
                    {
                      title: "Problem Solver",
                      desc: "Pragmatic, maintainable engineering over speculative over-engineering.",
                    },
                    {
                      title: "Clean Architectures",
                      desc: "Observable domain boundaries, strict typing, and decoupled microservices.",
                    },
                    {
                      title: "Scalable Systems",
                      desc: "Asynchronous, event-driven pipelines engineered for heavy traffic spikes.",
                    },
                    {
                      title: "User & Performance Focused",
                      desc: "Sub-100ms response targets, fluid interaction loops, and intuitive UX.",
                    },
                    {
                      title: "Continuous Innovation",
                      desc: "Rapid production adoption of LLMs, vector search, and edge computing.",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 sm:p-3 rounded-xl bg-[#081836]/45 border border-[#00D2FF]/20 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#00D2FF] shrink-0 mt-0.5 drop-shadow-[0_0_6px_#00D2FF]" />
                      <div>
                        <span className="font-orbitron font-bold text-xs sm:text-sm text-white block">
                          {item.title}
                        </span>
                        <span className="font-inter text-[11px] sm:text-xs text-[#CBD5E1] block mt-0.5 leading-snug">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Architectural Ethos Quote */}
              <div className="mt-4 p-3 rounded-xl bg-[#081836]/60 border border-[#00D2FF]/30 text-xs font-mono text-[#E2E8F0] leading-relaxed drop-shadow-[0_0_4px_rgba(255,255,255,0.2)]">
                &ldquo;Code is written once, read thousands of times, and executed millions of times. I architect systems that allow teams to move fast with high confidence.&rdquo;
              </div>
            </div>
          </Html>
        )}
      </AboutRoadsideCard>
    </group>
  );
}
