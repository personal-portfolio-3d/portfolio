"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { ChevronDown, Mouse } from "lucide-react";

interface Scene1PortalProps {
  currentZ: number;
  onExploreClick?: () => void;
  isModalOpen?: boolean;
}

export function Scene1Portal({ currentZ, onExploreClick, isModalOpen }: Scene1PortalProps) {
  const { size, viewport } = useThree();
  const isMobile = size.width < 768 || viewport.aspect < 1.0;

  const outerSpinRef = useRef<THREE.Group>(null);
  const innerSpinRef = useRef<THREE.Group>(null);

  // Portal placed further down the highway at Z = -18
  const portalZ = -18;

  // Opacity fading as camera travels forward
  const leftInfoOpacity = Math.max(0, Math.min(1, (currentZ + 12) / 14));
  const portalOpacity = Math.max(0, Math.min(1, (currentZ + 36) / 20));

  // 16 Alternating Neon Pink and Electric Blue Segmented Light Modules
  const segmentCount = 16;
  const segments = useMemo(() => {
    const list = [];
    const arcLength = (Math.PI * 2 / segmentCount) * 0.74; // Sleek gap between segments

    for (let i = 0; i < segmentCount; i++) {
      const angle = (i * Math.PI * 2) / segmentCount;
      const isPink = i % 2 === 1;
      const color = isPink ? "#FF007F" : "#00D2FF"; // Hot Neon Pink & Electric Cyan-Blue

      list.push({
        id: i,
        angle,
        arcLength,
        color,
        isPink,
      });
    }
    return list;
  }, [segmentCount]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (outerSpinRef.current) {
      outerSpinRef.current.rotation.z = t * 0.08;
    }
    if (innerSpinRef.current) {
      innerSpinRef.current.rotation.z = -t * 0.16;
    }
  });

  if (currentZ < -38) return null;

  return (
    <group>
      {/* ============================================================== */}
      {/* 1. INTRO TYPOGRAPHY INFO (RESPONSIVE: CENTERED ON MOBILE, LEFT ON DESKTOP) */}
      {/* ============================================================== */}
      <group
        position={isMobile ? [0, 2.2, -5.5] : [-8.2, 2.8, -7]}
        rotation={isMobile ? [0, 0, 0] : [0, 0.28, 0]}
      >
        <Html
          transform
          distanceFactor={isMobile ? 5.2 : 5.6}
          position={[0, 0, 0]}
          style={{
            opacity: isModalOpen ? 0 : leftInfoOpacity,
            transition: "opacity 0.25s ease-out",
            pointerEvents: leftInfoOpacity > 0.3 && !isModalOpen ? "auto" : "none",
          }}
        >
          <div
            className={`select-none flex flex-col ${
              isMobile
                ? "w-[90vw] max-w-[350px] text-center items-center px-4 py-6 rounded-2xl bg-[#040817]/65 border border-[#00D2FF]/35 backdrop-blur-xl shadow-[0_0_24px_rgba(0,210,255,0.2)]"
                : "w-[480px] max-w-[85vw] text-left items-start"
            }`}
          >
            {/* Category Kicker */}
            <div className={`flex items-center gap-2 mb-2 ${isMobile ? "justify-center" : ""}`}>
              <span className="w-2 h-2 rounded-full bg-[#00D2FF] shadow-[0_0_8px_#00D2FF] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-[#00D2FF] uppercase drop-shadow-[0_0_8px_rgba(0,210,255,0.8)]">
                // IDENTITY MATRIX • LEAD ENGINEER
              </span>
            </div>

            {/* Name */}
            <h1
              className={`font-black font-orbitron tracking-tight text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.95)] leading-tight ${
                isMobile ? "text-3xl sm:text-4xl my-1" : "text-4xl sm:text-5xl lg:text-6xl"
              }`}
            >
              {PERSONAL_INFO.name}
            </h1>

            {/* Role / Title */}
            <div
              className={`mt-2 flex flex-wrap items-center gap-2 ${
                isMobile ? "justify-center" : "items-center"
              }`}
            >
              <span
                className={`font-bold font-orbitron text-[#00D2FF] drop-shadow-[0_0_16px_rgba(0,210,255,0.85)] tracking-wide ${
                  isMobile ? "text-sm sm:text-base" : "text-lg sm:text-xl"
                }`}
              >
                {PERSONAL_INFO.title}
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#00D2FF]/15 border border-[#00D2FF]/40 text-[#00D2FF] font-bold shadow-[0_0_8px_rgba(0,210,255,0.3)]">
                5+ YRS PROD XP
              </span>
            </div>

            {/* Tagline */}
            <p
              className={`mt-3 font-inter font-normal leading-relaxed drop-shadow-[0_0_6px_rgba(255,255,255,0.35)] ${
                isMobile
                  ? "text-xs text-[#EDF4FF] max-w-[320px]"
                  : "text-sm sm:text-base text-[#EDF4FF] max-w-[460px]"
              }`}
            >
              {PERSONAL_INFO.tagline}
            </p>

            {/* Info Highlights (Concise 2 bullets on mobile, 3 bullets on desktop) */}
            <div className={`mt-3.5 space-y-1.5 text-xs font-mono ${isMobile ? "text-left w-full px-1" : "text-left"}`}>
              <div className="flex items-center gap-2 text-[#EDF4FF] text-[11px] sm:text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF007F] shadow-[0_0_6px_#FF007F] shrink-0" />
                <span className="line-clamp-1 sm:line-clamp-none">Microservices, Event-Driven &amp; Distributed Cloud</span>
              </div>
              <div className="flex items-center gap-2 text-[#EDF4FF] text-[11px] sm:text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] shadow-[0_0_6px_#00D2FF] shrink-0" />
                <span className="line-clamp-1 sm:line-clamp-none">Production AI Pipelines &amp; AWS Bedrock</span>
              </div>
              {!isMobile && (
                <div className="flex items-center gap-2 text-[#EDF4FF] text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#925CFF] shadow-[0_0_6px_#925CFF] shrink-0" />
                  <span>HIPAA Clinical Platforms, Enterprise PWAs &amp; High-Volume B2B Engines</span>
                </div>
              )}
            </div>

            {/* Action Cue Button */}
            <div className={`mt-5 flex items-center ${isMobile ? "justify-center w-full" : "gap-3"}`}>
              <div
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-full border border-[#00D2FF]/60 hover:border-[#FF007F] text-xs font-mono text-white font-bold bg-[#00D2FF]/15 hover:bg-[#FF007F]/20 backdrop-blur-md shadow-[0_0_15px_rgba(0,210,255,0.35)] hover:shadow-[0_0_20px_rgba(255,0,127,0.5)] transition-all cursor-pointer group"
              >
                <span className="text-white group-hover:text-[#00D2FF] transition-colors">
                  ENTER HIGHWAY EXPERIENCE
                </span>
                <span className="text-[#00D2FF] group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </div>
        </Html>
      </group>

      {/* ============================================================== */}
      {/* 2. THE STARTING PORTAL UNIT (POSITIONED FURTHER AT Z = -18)    */}
      {/* ============================================================== */}
      <group position={[0, 4.4, portalZ]}>
        {/* Main Massive Heavy Obsidian/Black Outer Housing */}
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[7.2, 0.42, 32, 100]} />
          <meshStandardMaterial
            color="#04060E"
            roughness={0.2}
            metalness={0.95}
            envMapIntensity={1}
          />
        </mesh>

        {/* Secondary Inner Bevel Black Collar */}
        <mesh position={[0, 0, 0.08]}>
          <torusGeometry args={[6.6, 0.22, 24, 80]} />
          <meshStandardMaterial
            color="#020308"
            roughness={0.3}
            metalness={0.9}
          />
        </mesh>

        {/* Inner Recessed Dark Lip */}
        <mesh position={[0, 0, -0.1]}>
          <torusGeometry args={[6.0, 0.18, 24, 80]} />
          <meshStandardMaterial
            color="#03050B"
            roughness={0.4}
            metalness={0.8}
          />
        </mesh>

        {/* Segmented Pink & Blue Outer Lights (Refined balanced thickness) */}
        <group ref={outerSpinRef} position={[0, 0, 0.16]}>
          {segments.map((seg) => (
            <group key={seg.id} rotation={[0, 0, seg.angle]}>
              <mesh>
                <torusGeometry args={[7.2, 0.1, 16, 32, seg.arcLength]} />
                <meshStandardMaterial
                  color={seg.color}
                  emissive={seg.color}
                  emissiveIntensity={4.8}
                  roughness={0.1}
                  toneMapped={false}
                />
              </mesh>
            </group>
          ))}
        </group>

        {/* Inner Counter-Rotating Pink & Blue Energy Vortex Arcs (Refined balanced thickness) */}
        <group ref={innerSpinRef} position={[0, 0, 0.05]}>
          {/* Pink Curved Laser Arc */}
          <mesh rotation={[0, 0, 0]}>
            <torusGeometry args={[6.35, 0.075, 16, 48, Math.PI * 0.65]} />
            <meshStandardMaterial
              color="#FF007F"
              emissive="#FF007F"
              emissiveIntensity={4.8}
              toneMapped={false}
            />
          </mesh>
          <mesh rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[6.35, 0.075, 16, 48, Math.PI * 0.65]} />
            <meshStandardMaterial
              color="#FF007F"
              emissive="#FF007F"
              emissiveIntensity={4.8}
              toneMapped={false}
            />
          </mesh>

          {/* Blue Curved Laser Arc */}
          <mesh rotation={[0, 0, Math.PI * 0.5]}>
            <torusGeometry args={[6.05, 0.075, 16, 48, Math.PI * 0.65]} />
            <meshStandardMaterial
              color="#00D2FF"
              emissive="#00D2FF"
              emissiveIntensity={4.8}
              toneMapped={false}
            />
          </mesh>
          <mesh rotation={[0, 0, Math.PI * 1.5]}>
            <torusGeometry args={[6.05, 0.075, 16, 48, Math.PI * 0.65]} />
            <meshStandardMaterial
              color="#00D2FF"
              emissive="#00D2FF"
              emissiveIntensity={4.8}
              toneMapped={false}
            />
          </mesh>
        </group>

        {/* Very Faint Translucent Haze in Portal Center */}
        <mesh position={[0, 0, -0.2]}>
          <circleGeometry args={[5.6, 48]} />
          <meshBasicMaterial
            color="#0066FF"
            transparent
            opacity={0.045 * portalOpacity}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        <mesh position={[0, 0, -0.15]}>
          <ringGeometry args={[5.58, 5.72, 64]} />
          <meshStandardMaterial
            color="#FF007F"
            emissive="#FF007F"
            emissiveIntensity={3.8}
            transparent
            opacity={0.75 * portalOpacity}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>

        {/* ============================================================== */}
        {/* 3. INSIDE PORTAL RING: ONLY PORTAL ONLINE CARD                 */}
        {/*    (TRANSPARENT BACKGROUND, HIGHWAY VISIBLE THROUGH IT)       */}
        {/* ============================================================== */}
        <Html
          transform
          distanceFactor={6.5}
          position={[0, -0.6, 0.4]}
          center
          style={{
            opacity: isModalOpen ? 0 : portalOpacity,
            transition: "opacity 0.25s ease-out",
            pointerEvents: portalOpacity > 0.3 && !isModalOpen ? "auto" : "none",
          }}
        >
          <div className="flex flex-col items-center select-none text-center">
            {/* Dual-Tone Pink & Blue Portal Online Card with Transparent Background */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-transparent border border-[#00D2FF]/60 text-xs font-mono tracking-widest uppercase mb-4 backdrop-blur-md shadow-[0_0_20px_rgba(0,210,255,0.35)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF007F] shadow-[0_0_10px_#FF007F] animate-ping" />
              <span className="text-white font-bold tracking-wider drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                PORTAL ONLINE
              </span>
              <span className="text-[#FF007F] font-bold">•</span>
              <span className="text-[#00D2FF] font-bold tracking-wider drop-shadow-[0_0_8px_rgba(0,210,255,0.8)]">
                WARP GATEWAY
              </span>
            </div>

            {/* Scroll Cue Button with Transparent Background */}
            <div
              onClick={onExploreClick}
              className="flex flex-col items-center gap-2 text-[#00D2FF] hover:text-white transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-transparent border-2 border-[#00D2FF]/70 group-hover:border-[#FF007F] backdrop-blur-md shadow-[0_0_20px_rgba(0,210,255,0.4)] group-hover:shadow-[0_0_25px_rgba(255,0,127,0.6)] group-hover:scale-105 transition-all">
                <Mouse className="w-4 h-4 animate-bounce text-[#FF007F] drop-shadow-[0_0_6px_#FF007F]" />
                <span className="text-xs font-mono tracking-wider font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.85)]">
                  SCROLL TO ENTER PORTAL
                </span>
                <ChevronDown className="w-4 h-4 text-[#00D2FF] group-hover:translate-y-0.5 transition-transform" />
              </div>
              <span className="text-[10px] font-mono text-[#00D2FF] font-semibold tracking-wider drop-shadow-[0_0_6px_rgba(0,210,255,0.6)]">
                USE MOUSE WHEEL, TRACKPAD OR DOWN ARROW
              </span>
            </div>
          </div>
        </Html>
      </group>
    </group>
  );
}
