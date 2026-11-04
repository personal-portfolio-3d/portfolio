"use client";

import { useMemo, useState, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { CheckCircle2, Sparkles, Terminal, ArrowRight, MapPin } from "lucide-react";
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
        position={isMobile ? [0, 0.4, 5] : [-4.4, 0.4, 0]}
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
              className={`w-[90vw] max-w-[340px] md:w-[365px] p-5 sm:p-6 rounded-2xl transition-all duration-300 backdrop-blur-2xl relative overflow-visible select-none ${
                isHovered
                  ? "bg-[#081836]/60 border-2 border-[#22D3EE] shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                  : "bg-[#060F22]/45 border border-[#22D3EE]/45 shadow-[0_8px_32px_rgba(0,0,0,0.65),0_0_20px_rgba(34,211,238,0.25)]"
              }`}
            >
              {/* Shiny Neon Border Accents */}
              <NeonCardBorders color="cyan" />

              {/* Internal Tech Corner Accents (Placed inside so outer rounded border is fully visible) */}
              <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t-2 border-l-2 border-[#22D3EE]/80 pointer-events-none" />
              <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t-2 border-r-2 border-[#22D3EE]/80 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b-2 border-l-2 border-[#22D3EE]/80 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b-2 border-r-2 border-[#22D3EE]/80 pointer-events-none" />

              <div className="flex items-center gap-2 mb-3">
                <Terminal className="w-5 h-5 text-[#22D3EE] animate-pulse" />
                <span className="text-xs font-mono text-[#22D3EE] font-bold tracking-widest uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                  IDENTITY PROFILE
                </span>
              </div>

              <h3 className="text-2xl font-black font-orbitron text-white tracking-wide drop-shadow-[0_0_14px_rgba(255,255,255,0.85)]">
                ABOUT ME
              </h3>

              <p className="mt-4 text-sm text-[#F1F5F9] font-inter font-normal leading-relaxed drop-shadow-[0_0_4px_rgba(255,255,255,0.25)]">
                {PERSONAL_INFO.bio}
              </p>

              <div className="mt-4 pt-3 border-t border-[#22D3EE]/30 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5 text-[#E2E8F0] font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#22D3EE] flex-shrink-0 drop-shadow-[0_0_6px_#22D3EE]" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
                <span className="text-[#22D3EE] font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                  5+ Yrs Prod XP
                </span>
              </div>

              <button
                onClick={onExploreMore}
                className="mt-5 w-full py-2.5 px-4 rounded-xl bg-[#081836]/60 hover:bg-[#168BFF]/40 border border-[#22D3EE]/60 hover:border-[#22D3EE] text-white text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_0_16px_rgba(34,211,238,0.3)]"
              >
                <span className="text-white group-hover:text-[#22D3EE] transition-colors">
                  Explore Technical Stack
                </span>
                <ArrowRight className="w-4 h-4 text-[#22D3EE] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </Html>
        )}
      </AboutRoadsideCard>

      {/* Right Glassmorphic HUD Card: PHILOSOPHY */}
      <AboutRoadsideCard
        side="right"
        position={isMobile ? [0, 0.4, -5] : [4.4, 0.4, 0]}
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
              className={`w-[90vw] max-w-[340px] md:w-[365px] p-5 sm:p-6 rounded-2xl transition-all duration-300 backdrop-blur-2xl relative overflow-visible select-none ${
                isHovered
                  ? "bg-[#081836]/60 border-2 border-[#168BFF] shadow-[0_0_30px_rgba(22,139,255,0.5)]"
                  : "bg-[#060F22]/45 border border-[#168BFF]/45 shadow-[0_8px_32px_rgba(0,0,0,0.65),0_0_20px_rgba(22,139,255,0.25)]"
              }`}
            >
              {/* Shiny Neon Border Accents */}
              <NeonCardBorders color="blue" />

              {/* Internal Tech Corner Accents (Placed inside so outer rounded border is fully visible) */}
              <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t-2 border-l-2 border-[#168BFF]/80 pointer-events-none" />
              <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t-2 border-r-2 border-[#168BFF]/80 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b-2 border-l-2 border-[#168BFF]/80 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b-2 border-r-2 border-[#168BFF]/80 pointer-events-none" />

              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#22D3EE] animate-pulse" />
                <span className="text-xs font-mono text-[#22D3EE] font-bold tracking-widest uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                  ENGINEERING CORE
                </span>
              </div>

              <h3 className="text-2xl font-black font-orbitron text-white tracking-wide drop-shadow-[0_0_14px_rgba(255,255,255,0.85)]">
                PHILOSOPHY
              </h3>

              <div className="mt-4 space-y-2.5">
                {PERSONAL_INFO.philosophy.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#22D3EE] flex-shrink-0 drop-shadow-[0_0_6px_#22D3EE]" />
                    <span className="font-inter font-semibold text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 p-3 rounded-xl bg-[#081836]/60 border border-[#22D3EE]/30 text-xs font-mono text-[#E2E8F0] leading-relaxed drop-shadow-[0_0_4px_rgba(255,255,255,0.2)]">
                Driven by clean modular abstractions, automated testability, and resilient distributed architectures.
              </div>
            </div>
          </Html>
        )}
      </AboutRoadsideCard>
    </group>
  );
}
