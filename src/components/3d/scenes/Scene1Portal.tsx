"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { ChevronDown, Mouse } from "lucide-react";
import { NeonCardBorders } from "@/components/ui/NeonCardBorders";

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

  // Flashlight light sources and dynamic aim targets
  const flashlight1SpotRef = useRef<THREE.SpotLight>(null);
  const flashlight1PointRef = useRef<THREE.PointLight>(null);
  const flashlight2SpotRef = useRef<THREE.SpotLight>(null);
  const flashlight2PointRef = useRef<THREE.PointLight>(null);
  const flashlight3SpotRef = useRef<THREE.SpotLight>(null);
  const flashlight3PointRef = useRef<THREE.PointLight>(null);
  const flashlight4SpotRef = useRef<THREE.SpotLight>(null);
  const flashlight4PointRef = useRef<THREE.PointLight>(null);

  const flashlight1Target = useMemo(() => {
    const obj = new THREE.Object3D();
    obj.position.set(1.8, 7.0, 0);
    return obj;
  }, []);

  const flashlight2Target = useMemo(() => {
    const obj = new THREE.Object3D();
    obj.position.set(-2.0, 6.7, 0);
    return obj;
  }, []);

  const flashlight3Target = useMemo(() => {
    const obj = new THREE.Object3D();
    obj.position.set(6.9, 1.8, 0);
    return obj;
  }, []);

  const flashlight4Target = useMemo(() => {
    const obj = new THREE.Object3D();
    obj.position.set(-6.9, 1.8, 0);
    return obj;
  }, []);

  useEffect(() => {
    if (flashlight1SpotRef.current && flashlight1Target) {
      flashlight1SpotRef.current.target = flashlight1Target;
    }
    if (flashlight2SpotRef.current && flashlight2Target) {
      flashlight2SpotRef.current.target = flashlight2Target;
    }
    if (flashlight3SpotRef.current && flashlight3Target) {
      flashlight3SpotRef.current.target = flashlight3Target;
    }
    if (flashlight4SpotRef.current && flashlight4Target) {
      flashlight4SpotRef.current.target = flashlight4Target;
    }
  }, [flashlight1Target, flashlight2Target, flashlight3Target, flashlight4Target]);

  // Portal placed further down the highway at Z = -18 on desktop, -13 on mobile so it cleanly frames the intro
  const portalZ = isMobile ? -13 : -18;

  // Opacity fading as camera travels forward
  const leftInfoOpacity = Math.max(0, Math.min(1, (currentZ + 12) / 14));
  const portalOpacity = useMemo(() => {
    if (currentZ >= portalZ) return 1;
    return Math.max(0, 1 - (portalZ - currentZ) / 12);
  }, [currentZ, portalZ]);

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
    // Organic flashlight aim sway (as if flashlights are pointed at parts of the black housing)
    if (flashlight1Target) {
      flashlight1Target.position.x = 1.8 + Math.sin(t * 0.75) * 0.28;
      flashlight1Target.position.y = 7.0 + Math.cos(t * 0.6) * 0.16;
    }
    if (flashlight1PointRef.current) {
      flashlight1PointRef.current.position.x = 1.8 + Math.sin(t * 0.75) * 0.24;
      flashlight1PointRef.current.position.y = 7.0 + Math.cos(t * 0.6) * 0.14;
    }
    if (flashlight2Target) {
      flashlight2Target.position.x = -2.0 + Math.cos(t * 0.7) * 0.28;
      flashlight2Target.position.y = 6.7 + Math.sin(t * 0.85) * 0.16;
    }
    if (flashlight2PointRef.current) {
      flashlight2PointRef.current.position.x = -2.0 + Math.cos(t * 0.7) * 0.24;
      flashlight2PointRef.current.position.y = 6.7 + Math.sin(t * 0.85) * 0.14;
    }
    // Right flank flashlight sway
    if (flashlight3Target) {
      flashlight3Target.position.x = 6.9 + Math.cos(t * 0.8) * 0.18;
      flashlight3Target.position.y = 1.8 + Math.sin(t * 0.7) * 0.22;
    }
    if (flashlight3PointRef.current) {
      flashlight3PointRef.current.position.x = 6.9 + Math.cos(t * 0.8) * 0.15;
      flashlight3PointRef.current.position.y = 1.8 + Math.sin(t * 0.7) * 0.18;
    }
    // Left flank flashlight sway
    if (flashlight4Target) {
      flashlight4Target.position.x = -6.9 + Math.sin(t * 0.75) * 0.18;
      flashlight4Target.position.y = 1.8 + Math.cos(t * 0.65) * 0.22;
    }
    if (flashlight4PointRef.current) {
      flashlight4PointRef.current.position.x = -6.9 + Math.sin(t * 0.75) * 0.15;
      flashlight4PointRef.current.position.y = 1.8 + Math.cos(t * 0.65) * 0.18;
    }
  });

  if (currentZ < portalZ - 15) return null;

  return (
    <group>
      {/* ============================================================== */}
      {/* 1. INTRO TYPOGRAPHY INFO (DESKTOP ONLY: ON ROADSIDE LEFT)      */}
      {/* ============================================================== */}
      {!isMobile && (
        <group
          position={[-8.2, 2.8, -7]}
          rotation={[0, 0.28, 0]}
        >
          <Html
            transform
            distanceFactor={5.6}
            position={[0, 0, 0]}
            style={{
              opacity: isModalOpen ? 0 : leftInfoOpacity,
              transition: "opacity 0.25s ease-out",
              pointerEvents: leftInfoOpacity > 0.3 && !isModalOpen ? "auto" : "none",
            }}
          >
            <div className="w-[480px] max-w-[85vw] text-left items-start select-none flex flex-col">
              {/* Category Kicker */}
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#00D2FF] shadow-[0_0_8px_#00D2FF] animate-pulse" />
                <span className="text-xs font-mono font-bold tracking-widest text-[#00D2FF] uppercase drop-shadow-[0_0_8px_rgba(0,210,255,0.8)]">
                  // IDENTITY MATRIX • LEAD ENGINEER
                </span>
              </div>

              {/* Name & Avatar */}
              <div className="flex items-stretch gap-4 sm:gap-6 my-2">
                <div className="relative shrink-0 w-28 sm:w-32 lg:w-[140px] aspect-square">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#00D2FF] via-[#168BFF] to-[#22D3EE] opacity-75 blur-sm" />
                  <div className="relative w-full h-full rounded-2xl p-[2px] bg-gradient-to-br from-[#00D2FF] via-[#007BFF] to-[#22D3EE] shadow-[0_0_24px_rgba(0,210,255,0.6)]">
                    <div className="w-full h-full rounded-[14px] overflow-hidden bg-[#040816]">
                      <img
                        src={PERSONAL_INFO.avatar}
                        alt={PERSONAL_INFO.name}
                        className="w-full h-full object-cover object-[center_20%]"
                        loading="eager"
                        decoding="async"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#00D2FF] border-2 border-[#03060D] shadow-[0_0_8px_#00D2FF] flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  </div>
                </div>

                <div className="flex flex-col justify-between py-1">
                  <h1 className="font-black font-orbitron tracking-tight text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.95)] leading-none text-4xl sm:text-5xl lg:text-[62px]">
                    <span className="block">ASHISH</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-[#EDF4FF] to-[#22D3EE] mt-1.5 sm:mt-2">
                      DOGRA
                    </span>
                  </h1>
                </div>
              </div>

              {/* Role / Title */}
              <div className="mt-2 flex items-center gap-2">
                <span className="font-bold font-orbitron text-[#00D2FF] drop-shadow-[0_0_16px_rgba(0,210,255,0.85)] tracking-wide text-lg sm:text-xl">
                  {PERSONAL_INFO.title}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#00D2FF]/15 border border-[#00D2FF]/40 text-[#00D2FF] font-bold shadow-[0_0_8px_rgba(0,210,255,0.3)]">
                  5+ YRS PROD XP
                </span>
              </div>

              {/* Tagline */}
              <p className="mt-3 font-inter font-normal leading-relaxed drop-shadow-[0_0_6px_rgba(255,255,255,0.35)] text-sm sm:text-base text-[#EDF4FF] max-w-[460px]">
                {PERSONAL_INFO.tagline}
              </p>

              {/* Info Highlights */}
              <div className="mt-3.5 space-y-1.5 text-xs font-mono text-left">
                <div className="flex items-center gap-2 text-[#EDF4FF]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF007F] shadow-[0_0_6px_#FF007F] shrink-0" />
                  <span>Microservices, Event-Driven &amp; Distributed Cloud</span>
                </div>
                <div className="flex items-center gap-2 text-[#EDF4FF]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] shadow-[0_0_6px_#00D2FF] shrink-0" />
                  <span>Production AI Pipelines &amp; AWS Bedrock</span>
                </div>
                <div className="flex items-center gap-2 text-[#EDF4FF]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#925CFF] shadow-[0_0_6px_#925CFF] shrink-0" />
                  <span>HIPAA Clinical Platforms, Enterprise PWAs &amp; High-Volume B2B Engines</span>
                </div>
              </div>

              {/* Action Cue Button */}
              <div className="mt-5 flex items-center gap-3">
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
      )}

      {/* ============================================================== */}
      {/* 2. THE STARTING PORTAL UNIT                                    */}
      {/* ============================================================== */}
      <group position={[0, isMobile ? 3.8 : 4.4, portalZ]}>
        {/* Flashlight Light Sources Aimed Specifically at Upper Black Housing */}
        {/* Flashlight 1: Pointed at upper-right section of the black housing */}
        <primitive object={flashlight1Target} />
        <spotLight
          ref={flashlight1SpotRef}
          position={[2.4, 7.8, 3.6]}
          target={flashlight1Target}
          angle={0.44}
          penumbra={0.85}
          intensity={22}
          color="#00D2FF"
          distance={10}
          decay={2}
        />
        {/* Localized specular highlight hotspot reflecting directly back into camera */}
        <pointLight
          ref={flashlight1PointRef}
          position={[1.8, 7.0, 1.4]}
          intensity={4.8}
          color="#00D2FF"
          distance={4.2}
          decay={2}
        />

        {/* Flashlight 2: Pointed at upper-left section of the black housing */}
        <primitive object={flashlight2Target} />
        <spotLight
          ref={flashlight2SpotRef}
          position={[-2.8, 7.4, 3.6]}
          target={flashlight2Target}
          angle={0.42}
          penumbra={0.85}
          intensity={18}
          color="#00D2FF"
          distance={10}
          decay={2}
        />
        {/* Localized specular highlight hotspot reflecting directly back into camera */}
        <pointLight
          ref={flashlight2PointRef}
          position={[-2.0, 6.7, 1.4]}
          intensity={4.0}
          color="#00D2FF"
          distance={4.0}
          decay={2}
        />

        {/* Flashlight 3: Pointed at right-side flank of the black housing */}
        <primitive object={flashlight3Target} />
        <spotLight
          ref={flashlight3SpotRef}
          position={[7.8, 2.4, 3.6]}
          target={flashlight3Target}
          angle={0.42}
          penumbra={0.85}
          intensity={20}
          color="#00D2FF"
          distance={10}
          decay={2}
        />
        {/* Localized specular highlight hotspot on right flank */}
        <pointLight
          ref={flashlight3PointRef}
          position={[6.9, 1.8, 1.4]}
          intensity={4.6}
          color="#00D2FF"
          distance={4.2}
          decay={2}
        />

        {/* Flashlight 4: Pointed at left-side flank of the black housing */}
        <primitive object={flashlight4Target} />
        <spotLight
          ref={flashlight4SpotRef}
          position={[-7.8, 2.4, 3.6]}
          target={flashlight4Target}
          angle={0.42}
          penumbra={0.85}
          intensity={20}
          color="#00D2FF"
          distance={10}
          decay={2}
        />
        {/* Localized specular highlight hotspot on left flank */}
        <pointLight
          ref={flashlight4PointRef}
          position={[-6.9, 1.8, 1.4]}
          intensity={4.6}
          color="#00D2FF"
          distance={4.2}
          decay={2}
        />

        {/* Main Massive Heavy Obsidian/Lacquer Pure Black Outer Housing */}
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[7.2, 0.42, 32, 100]} />
          <meshPhysicalMaterial
            color="#000000"
            emissive="#000000"
            roughness={0.14}
            metalness={0.15}
            clearcoat={1.0}
            clearcoatRoughness={0.06}
            reflectivity={1.0}
          />
        </mesh>

        {/* Secondary Inner Bevel Glossy Black Collar */}
        <mesh position={[0, 0, 0.08]}>
          <torusGeometry args={[6.6, 0.22, 24, 80]} />
          <meshPhysicalMaterial
            color="#010102"
            emissive="#000000"
            roughness={0.18}
            metalness={0.12}
            clearcoat={0.85}
            clearcoatRoughness={0.08}
            reflectivity={0.9}
          />
        </mesh>

        {/* Inner Recessed Dark Lip */}
        <mesh position={[0, 0, -0.1]}>
          <torusGeometry args={[6.0, 0.18, 24, 80]} />
          <meshPhysicalMaterial
            color="#020203"
            emissive="#000000"
            roughness={0.25}
            metalness={0.1}
            clearcoat={0.6}
            clearcoatRoughness={0.12}
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
        {/* 3. INSIDE PORTAL RING:                                         */}
        {/*    - MOBILE: Complete Hero Intro Section centered in portal    */}
        {/*    - DESKTOP: Portal Online / Warp Gateway scroll cue          */}
        {/* ============================================================== */}
        <Html
          transform
          distanceFactor={isMobile ? 4.2 : 6.5}
          position={[0, isMobile ? -0.1 : -0.6, 0.4]}
          center
          style={{
            opacity: isModalOpen ? 0 : portalOpacity,
            transition: "opacity 0.25s ease-out",
            pointerEvents: portalOpacity > 0.3 && !isModalOpen ? "auto" : "none",
          }}
        >
          {isMobile ? (
            /* Mobile: Pure Holographic Text inside the Portal Ring (Scaled up & bolder) */
            <div className="flex flex-col items-center select-none text-center w-[92vw] max-w-[340px] px-2 bg-transparent pointer-events-auto">
              {/* Category Kicker */}
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00D2FF] shadow-[0_0_10px_#00D2FF] animate-pulse" />
                <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-[#00D2FF] uppercase drop-shadow-[0_0_10px_rgba(0,210,255,0.9)]">
                  // IDENTITY MATRIX • LEAD ENGINEER
                </span>
              </div>

              {/* Name & Avatar: Ashish Dogra */}
              <div className="flex items-stretch justify-center gap-3.5 my-1.5">
                <div className="relative shrink-0 w-[72px] sm:w-[84px] aspect-square">
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#00D2FF] via-[#168BFF] to-[#22D3EE] opacity-80 blur-xs" />
                  <div className="relative w-full h-full rounded-2xl p-[1.5px] bg-gradient-to-br from-[#00D2FF] via-[#007BFF] to-[#22D3EE] shadow-[0_0_18px_rgba(0,210,255,0.6)]">
                    <div className="w-full h-full rounded-[14px] overflow-hidden bg-[#040816]">
                      <img
                        src={PERSONAL_INFO.avatar}
                        alt={PERSONAL_INFO.name}
                        className="w-full h-full object-cover object-[center_20%]"
                        loading="eager"
                        decoding="async"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#00D2FF] border-2 border-[#03060D] shadow-[0_0_6px_#00D2FF] flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                </div>

                <div className="flex flex-col justify-between py-0.5 text-left">
                  <h1 className="font-black font-orbitron tracking-tight text-white drop-shadow-[0_0_32px_rgba(255,255,255,1),0_0_16px_#00D2FF] leading-none text-2xl sm:text-3xl">
                    <span className="block">ASHISH</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-[#EDF4FF] to-[#22D3EE] mt-1">
                      DOGRA
                    </span>
                  </h1>
                </div>
              </div>

              {/* Role / Title & Experience */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 my-1.5">
                <span className="font-bold font-orbitron text-[#00D2FF] drop-shadow-[0_0_16px_rgba(0,210,255,0.9)] tracking-wide text-sm sm:text-base">
                  {PERSONAL_INFO.title}
                </span>
                <span className="text-[10px] sm:text-xs font-mono px-3 py-0.5 rounded-full border border-[#00D2FF]/70 text-[#00D2FF] font-bold shadow-[0_0_10px_rgba(0,210,255,0.5)]">
                  5+ YRS PROD XP
                </span>
              </div>

              {/* Tagline */}
              <p className="mt-2 font-inter text-xs sm:text-sm text-[#EDF4FF] leading-relaxed drop-shadow-[0_0_6px_rgba(255,255,255,0.4)] max-w-[320px]">
                {PERSONAL_INFO.tagline}
              </p>

              {/* Info Highlights */}
              <div className="mt-3 space-y-1.5 text-xs sm:text-sm font-mono text-left w-full px-2">
                <div className="flex items-center gap-2.5 text-[#EDF4FF]">
                  <span className="w-2 h-2 rounded-full bg-[#00D2FF] shadow-[0_0_8px_#00D2FF] shrink-0" />
                  <span className="truncate drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]">Microservices, Event-Driven &amp; Cloud</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#EDF4FF]">
                  <span className="w-2 h-2 rounded-full bg-[#00D2FF] shadow-[0_0_8px_#00D2FF] shrink-0" />
                  <span className="truncate drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]">Production AI Pipelines &amp; AWS Bedrock</span>
                </div>
              </div>

              {/* Action Cue Button */}
              <div
                onClick={onExploreClick}
                className="mt-4 sm:mt-5 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-[#00D2FF] hover:border-white text-xs sm:text-sm font-mono text-white font-bold bg-[#00D2FF]/20 hover:bg-[#00D2FF]/35 backdrop-blur-md shadow-[0_0_24px_rgba(0,210,255,0.7)] hover:shadow-[0_0_36px_#00D2FF] transition-all cursor-pointer group"
              >
                <span>ENTER HIGHWAY EXPERIENCE</span>
                <span className="text-[#00D2FF] group-hover:translate-x-1 transition-transform">→</span>
              </div>

              {/* Subtle Swipe / Scroll Cue */}
              <span className="mt-2.5 text-[11px] font-mono text-[#00D2FF] tracking-wider uppercase opacity-90 flex items-center gap-1.5 justify-center drop-shadow-[0_0_8px_rgba(0,210,255,0.7)]">
                <span>SWIPE OR SCROLL FORWARD</span>
                <ChevronDown className="w-4 h-4 text-[#00D2FF] animate-bounce" />
              </span>
            </div>
          ) : (
            /* Desktop: Portal Online / Warp Gateway Cue */
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
          )}
        </Html>
      </group>
    </group>
  );
}
