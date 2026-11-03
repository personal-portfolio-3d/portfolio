"use client";

import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { EXPERIENCES } from "@/data/portfolioData";
import { ExperienceItem } from "@/types/portfolio";
import { Briefcase } from "lucide-react";

interface Scene5ExperienceProps {
  currentZ: number;
  onSelectExperience?: (exp: ExperienceItem) => void;
  selectedExperienceId?: string;
  isModalOpen?: boolean;
}

// Thick 3D Volumetric Wavy Electric Lightning Current (No straight continuous line, connects only at circle borders)
function ElectricWavySegment({
  start,
  end,
  arch = 0.2,
  pulseOffset = 0,
}: {
  start: [number, number, number];
  end: [number, number, number];
  arch?: number;
  pulseOffset?: number;
}) {
  const numPoints = 36;
  const ribbon1GeomRef = useRef<THREE.BufferGeometry>(null);
  const ribbon2GeomRef = useRef<THREE.BufferGeometry>(null);
  const coreLineGeomRef = useRef<THREE.BufferGeometry>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  // Pre-allocate buffer arrays and quad indices once
  const { positions1, positions2, coreLinePositions, indices } = useMemo(() => {
    const totalVertices = (numPoints + 1) * 2;
    const pos1 = new Float32Array(totalVertices * 3);
    const pos2 = new Float32Array(totalVertices * 3);
    const corePos = new Float32Array((numPoints + 1) * 3);

    // Quad indices connecting adjacent slices
    const idx = new Uint16Array(numPoints * 6);
    for (let i = 0; i < numPoints; i++) {
      const v0 = i * 2;
      const v1 = i * 2 + 1;
      const v2 = (i + 1) * 2;
      const v3 = (i + 1) * 2 + 1;

      idx[i * 6] = v0;
      idx[i * 6 + 1] = v1;
      idx[i * 6 + 2] = v2;

      idx[i * 6 + 3] = v1;
      idx[i * 6 + 4] = v3;
      idx[i * 6 + 5] = v2;
    }

    return {
      positions1: pos1,
      positions2: pos2,
      coreLinePositions: corePos,
      indices: idx,
    };
  }, [numPoints]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (ribbon1GeomRef.current && ribbon2GeomRef.current && coreLineGeomRef.current) {
      const p1 = ribbon1GeomRef.current.attributes.position.array as Float32Array;
      const p2 = ribbon2GeomRef.current.attributes.position.array as Float32Array;
      const pCore = coreLineGeomRef.current.attributes.position.array as Float32Array;

      for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;
        const env = Math.sin(t * Math.PI); // Strictly pinned to 0 at start and end circle borders!

        // Base linear + arch position
        const baseX = start[0] + (end[0] - start[0]) * t;
        const baseY = start[1] + (end[1] - start[1]) * t + arch * env;
        const baseZ = start[2] + (end[2] - start[2]) * t;

        // Wavy electric lightning oscillations (multi-frequency high-voltage wave)
        const w1y = (Math.sin(t * 22 + time * 14) * 0.085 + Math.sin(t * 44 - time * 20) * 0.038) * env;
        const w1z = (Math.cos(t * 18 + time * 9) * 0.065) * env;

        const currX = baseX;
        const currY = baseY + w1y;
        const currZ = baseZ + w1z;

        // Center core lightning line
        pCore[i * 3] = currX;
        pCore[i * 3 + 1] = currY;
        pCore[i * 3 + 2] = currZ;

        // Thickness of the wavy electric beam (tapers smoothly at borders, reaches 0.065 width in middle)
        const halfWidth = 0.032 * env;

        // Ribbon 1: Vertical quad strip (+Y / -Y)
        const v0 = i * 2;
        p1[v0 * 3] = currX;
        p1[v0 * 3 + 1] = currY + halfWidth;
        p1[v0 * 3 + 2] = currZ;

        const v1 = i * 2 + 1;
        p1[v1 * 3] = currX;
        p1[v1 * 3 + 1] = currY - halfWidth;
        p1[v1 * 3 + 2] = currZ;

        // Ribbon 2: Perpendicular horizontal quad strip (+Z / -Z) for full 3D volumetric thickness
        p2[v0 * 3] = currX;
        p2[v0 * 3 + 1] = currY;
        p2[v0 * 3 + 2] = currZ + halfWidth;

        p2[v1 * 3] = currX;
        p2[v1 * 3 + 1] = currY;
        p2[v1 * 3 + 2] = currZ - halfWidth;
      }

      ribbon1GeomRef.current.attributes.position.needsUpdate = true;
      ribbon2GeomRef.current.attributes.position.needsUpdate = true;
      coreLineGeomRef.current.attributes.position.needsUpdate = true;
    }

    // Animated traveling electric spark along the wavy current
    if (pulseRef.current) {
      const t = (time * 0.45 + pulseOffset) % 1;
      const env = Math.sin(t * Math.PI);
      const baseX = start[0] + (end[0] - start[0]) * t;
      const baseY = start[1] + (end[1] - start[1]) * t + arch * env;
      const baseZ = start[2] + (end[2] - start[2]) * t;

      const wy = (Math.sin(t * 22 + time * 14) * 0.085) * env;
      const wz = (Math.cos(t * 18 + time * 9) * 0.065) * env;

      pulseRef.current.position.set(baseX, baseY + wy, baseZ + wz);
    }
  });

  return (
    <group>
      {/* 3D Volumetric Wavy Electric Cross-Ribbon 1 (Vertical Strip) */}
      <mesh>
        <bufferGeometry ref={ribbon1GeomRef}>
          <bufferAttribute
            attach="attributes-position"
            count={(numPoints + 1) * 2}
            array={positions1}
            itemSize={3}
          />
          <bufferAttribute attach="index" count={indices.length} array={indices} itemSize={1} />
        </bufferGeometry>
        <meshStandardMaterial
          color="#00F0FF"
          emissive="#00F0FF"
          emissiveIntensity={3.6}
          roughness={0.15}
          metalness={0.9}
          side={THREE.DoubleSide}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* 3D Volumetric Wavy Electric Cross-Ribbon 2 (Horizontal Strip - creates full 3D thickness) */}
      <mesh>
        <bufferGeometry ref={ribbon2GeomRef}>
          <bufferAttribute
            attach="attributes-position"
            count={(numPoints + 1) * 2}
            array={positions2}
            itemSize={3}
          />
          <bufferAttribute attach="index" count={indices.length} array={indices} itemSize={1} />
        </bufferGeometry>
        <meshStandardMaterial
          color="#00F0FF"
          emissive="#00F0FF"
          emissiveIntensity={3.6}
          roughness={0.15}
          metalness={0.9}
          side={THREE.DoubleSide}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Radiant High-Energy White Core Lightning Line */}
      <line>
        <bufferGeometry ref={coreLineGeomRef}>
          <bufferAttribute
            attach="attributes-position"
            count={numPoints + 1}
            array={coreLinePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.95}
          blending={THREE.AdditiveBlending}
        />
      </line>

      {/* Connection Joint Anchors located strictly at the circle borders */}
      <mesh position={start}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#00F0FF" />
      </mesh>
      <mesh position={end}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#00F0FF" />
      </mesh>

      {/* High-Energy Traveling Electric Spark */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.075, 12, 12]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
    </group>
  );
}

// Single interactive Neon Blue Circle Node (Dot inside, Border only, 100% Transparent Interior, Growing in size towards right)
function ElectricCircleNode({
  position,
  exp,
  radius,
  dotRadius,
  tubeRadius,
  isSelected,
  isModalOpen,
  onClick,
  index,
}: {
  position: [number, number, number];
  exp: ExperienceItem;
  radius: number;
  dotRadius: number;
  tubeRadius: number;
  isSelected: boolean;
  isModalOpen?: boolean;
  onClick: () => void;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const circleRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const stemHeight = 1.0;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Subtle gentle float
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(time * 1.8 + index * 1.5) * 0.04;
    }

    // Pure breathing animation: getting bigger and smaller rhythmically
    if (circleRef.current) {
      const baseScale = isSelected ? 1.25 : isHovered ? 1.15 : 1.0;
      // Smooth organic breathing cycle (±10% expansion)
      const breath = Math.sin(time * 2.4 + index * 1.2) * 0.10;
      const targetScale = baseScale * (1.0 + breath);
      circleRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.14
      );
    }

    // Vertical line electric pulse traveling upwards from circle border into title
    if (pulseRef.current) {
      const upT = (time * 1.3 + index * 0.4) % 1;
      pulseRef.current.position.y = radius + upT * stemHeight;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* --- 1. NEON BLUE CIRCLE BORDER + CENTER DOT + 100% TRANSPARENT BACKGROUND (No line inside) --- */}
      <group
        ref={circleRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setIsHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setIsHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        {/* Invisible hit plane for reliable clicking anywhere within the circle */}
        <mesh>
          <circleGeometry args={[radius * 1.08, 32]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>

        {/* Neon Blue Circular Border Ring (Facing camera) */}
        <mesh>
          <torusGeometry args={[radius, tubeRadius, 16, 64]} />
          <meshStandardMaterial
            color="#00F0FF"
            emissive="#00F0FF"
            emissiveIntensity={isSelected ? 4.2 : isHovered ? 3.6 : 2.8}
            roughness={0.15}
            metalness={0.88}
          />
        </mesh>

        {/* Subtle Outer Glowing Aura Sheath along the border */}
        <mesh>
          <torusGeometry args={[radius, tubeRadius * 2.2, 16, 64]} />
          <meshBasicMaterial
            color="#00F0FF"
            transparent
            opacity={isHovered || isSelected ? 0.35 : 0.18}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Center Dot (Inside the circle) */}
        <mesh>
          <sphereGeometry args={[dotRadius, 24, 24]} />
          <meshStandardMaterial
            color="#00F0FF"
            emissive="#00F0FF"
            emissiveIntensity={isSelected ? 4.6 : isHovered ? 3.8 : 3.0}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Inner High-Energy White Core in Center Dot */}
        <mesh>
          <sphereGeometry args={[dotRadius * 0.45, 16, 16]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>

        {/* Local Neon Blue Point Light */}
        <pointLight
          color="#00F0FF"
          intensity={isSelected ? 4.2 : isHovered ? 3.4 : 2.2}
          distance={5.5}
        />
      </group>

      {/* --- 2. VERTICAL CONNECTOR LINE (Rising up from top of border to Title) --- */}
      <group>
        {/* Glowing vertical cylinder stem */}
        <mesh position={[0, radius + stemHeight / 2, 0]}>
          <cylinderGeometry args={[0.02, 0.02, stemHeight, 16]} />
          <meshStandardMaterial
            color="#00F0FF"
            emissive="#00F0FF"
            emissiveIntensity={isSelected ? 3.4 : 2.5}
          />
        </mesh>

        {/* Bottom Joint Sphere (at top of circle border) */}
        <mesh position={[0, radius, 0]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color="#00F0FF" />
        </mesh>

        {/* Top Joint Sphere (at bottom of title card) */}
        <mesh position={[0, radius + stemHeight, 0]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>

        {/* Animated energy pulse travelling up the vertical line */}
        <mesh ref={pulseRef} position={[0, radius, 0]}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>

      {/* --- 3. FLOATING HOLOGRAPHIC TITLE BADGE (Ultra-Transparent & Circular) --- */}
      <Html
        transform
        distanceFactor={5.5}
        position={[0, radius + stemHeight + 0.32, 0]}
        center
        style={{
          opacity: isModalOpen ? 0 : 1,
          pointerEvents: isModalOpen ? "none" : "auto",
          transition: "opacity 0.25s ease-out",
        }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="cursor-pointer group flex flex-col items-center select-none transform transition-transform duration-300 hover:scale-105"
        >
          {/* Ultra-Transparent Circular / Pill Card */}
          <div
            className={`px-6 py-3.5 rounded-3xl border backdrop-blur-md transition-all duration-300 text-center min-w-[220px] ${
              isSelected
                ? "bg-[#0A224D]/45 border-2 border-[#00F0FF] shadow-[0_0_35px_rgba(0,240,255,0.6)]"
                : isHovered
                ? "bg-[#06142E]/35 border border-[#00F0FF]/70 shadow-[0_0_25px_rgba(0,240,255,0.45)]"
                : "bg-[#04091A]/20 border border-[#00F0FF]/35 shadow-[0_0_20px_rgba(0,240,255,0.2)]"
            }`}
          >
            {/* Period Badge */}
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <span className="text-[10px] font-mono font-bold px-3 py-0.5 rounded-full bg-[#00F0FF]/15 border border-[#00F0FF]/50 text-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                {exp.period}
              </span>
            </div>

            {/* Role Title */}
            <h4 className="text-sm font-bold font-orbitron text-white group-hover:text-[#00F0FF] transition-colors drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] tracking-wide whitespace-nowrap">
              {exp.role}
            </h4>

            {/* Company / Institution */}
            <p className="text-xs font-semibold mt-0.5 whitespace-nowrap text-[#00F0FF] drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">
              {exp.company}
            </p>

            {/* Prompt */}
            <div className="mt-1.5 flex items-center justify-center gap-1 text-[9px] font-mono text-[#EDF4FF] group-hover:text-white transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-ping" />
              <span>Click node for details</span>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}

export function Scene5Experience({
  currentZ,
  onSelectExperience,
  selectedExperienceId,
  isModalOpen,
}: Scene5ExperienceProps) {
  const zPos = -295;
  const dist = Math.abs(currentZ - zPos);
  const ringRef = useRef<THREE.Mesh>(null);

  const opacity = useMemo(() => {
    if (dist > 45) return 0;
    return Math.max(0, 1 - dist / 38);
  }, [dist]);

  // Chronological Milestones: Left -> Center -> Right
  const chronologicalMilestones = useMemo(() => {
    const mca = EXPERIENCES.find((e) => e.id === "education") || EXPERIENCES[2];
    const freelance = EXPERIENCES.find((e) => e.id === "freelance") || EXPERIENCES[1];
    const gadget = EXPERIENCES.find((e) => e.id === "gadget") || EXPERIENCES[0];
    return [mca, freelance, gadget];
  }, []);

  // Node 3D positions with LENGTHIER spacing across the highway: Left (MCA) -> Center (Freelance) -> Right (Gadget)
  const nodePositions: [number, number, number][] = useMemo(
    () => [
      [-5.6, 0.0, 0],   // Left (Wide spacing at -5.6)
      [0.0, 0.75, 0],   // Center (Elevated suspension arch at 0.0)
      [5.6, 0.0, 0],    // Right (Wide spacing at +5.6)
    ],
    []
  );

  // SIZES INCREASING TOWARDS RIGHT: Small -> Medium -> Large
  const nodeSizes = useMemo(
    () => [
      { radius: 0.42, dotRadius: 0.07, tubeRadius: 0.018 }, // Node 0 (Left - MCA): Smallest
      { radius: 0.65, dotRadius: 0.10, tubeRadius: 0.022 }, // Node 1 (Center - Freelance): Medium
      { radius: 0.92, dotRadius: 0.14, tubeRadius: 0.026 }, // Node 2 (Right - Gadget Sr. Eng): Largest
    ],
    []
  );

  // BORDER-ONLY CONNECTION COORDINATES (Lines connect at borders - NEVER pass through circles!)
  const segments = useMemo(() => {
    // Node 0 borders (center: -5.6, radius: 0.42)
    const n0Left: [number, number, number] = [-5.6 - 0.42, 0.0, 0];   // [-6.02, 0, 0]
    const n0Right: [number, number, number] = [-5.6 + 0.42, 0.0, 0];  // [-5.18, 0, 0]

    // Node 1 borders (center: 0.0, y: 0.75, radius: 0.65)
    const n1Left: [number, number, number] = [0.0 - 0.65, 0.75, 0];   // [-0.65, 0.75, 0]
    const n1Right: [number, number, number] = [0.0 + 0.65, 0.75, 0];  // [0.65, 0.75, 0]

    // Node 2 borders (center: 5.6, radius: 0.92)
    const n2Left: [number, number, number] = [5.6 - 0.92, 0.0, 0];    // [4.68, 0, 0]
    const n2Right: [number, number, number] = [5.6 + 0.92, 0.0, 0];   // [6.52, 0, 0]

    const farLeft: [number, number, number] = [-7.4, -0.45, 0];
    const farRight: [number, number, number] = [7.4, -0.45, 0];

    return [
      { start: farLeft, end: n0Left, arch: 0.12, pulseOffset: 0.0 },
      { start: n0Right, end: n1Left, arch: 0.35, pulseOffset: 0.25 },
      { start: n1Right, end: n2Left, arch: 0.35, pulseOffset: 0.5 },
      { start: n2Right, end: farRight, arch: 0.12, pulseOffset: 0.75 },
    ];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.15;
    }
  });

  if (opacity <= 0.01) return null;

  return (
    <group position={[0, 2.0, zPos]}>
      {/* --- 1. OVERHEAD RADAR ARCH (Spanning across the wider nodes) --- */}
      <mesh ref={ringRef} position={[0, 3.4, 0]}>
        <torusGeometry args={[8.8, 0.06, 16, 64, Math.PI]} />
        <meshStandardMaterial
          color="#00F0FF"
          emissive="#00F0FF"
          emissiveIntensity={2.5}
        />
      </mesh>

      {/* Overhead Header Banner */}
      <Html
        transform
        distanceFactor={6}
        position={[0, 4.3, 0]}
        center
        style={{
          opacity: isModalOpen ? 0 : opacity,
          pointerEvents: "none",
          transition: "opacity 0.25s ease-out",
        }}
      >
        <div className="flex flex-col items-center select-none text-center">
          <div className="flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#04091A]/35 border border-[#00F0FF]/35 backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.25)]">
            <Briefcase className="w-4 h-4 text-[#00F0FF] drop-shadow-[0_0_6px_#00F0FF]" />
            <span className="text-xs font-mono font-bold tracking-widest text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.85)]">
              ENGINEERING TIMELINE // CHRONOLOGICAL NODES
            </span>
            <span className="text-[10px] font-mono text-[#00F0FF] font-bold px-2 py-0.5 rounded bg-[#0A224D] border border-[#00F0FF]/50">
              05 • CAREER
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#EDF4FF] mt-1.5 drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]">
            Electric lightning currents connecting border nodes • Select any node or title for details
          </span>
        </div>
      </Html>

      {/* --- 2. THICK 3D WAVY ELECTRIC LIGHTNING CURRENTS (NO straight continuous tube, connects ONLY at borders) --- */}
      <group>
        {segments.map((seg, idx) => (
          <ElectricWavySegment
            key={idx}
            start={seg.start}
            end={seg.end}
            arch={seg.arch}
            pulseOffset={seg.pulseOffset}
          />
        ))}
      </group>

      {/* --- 3. THE 3 NEON BLUE CIRCLES (Dot inside, Border only, 100% Transparent Interior, Growing towards right) --- */}
      {chronologicalMilestones.map((exp, idx) => (
        <ElectricCircleNode
          key={exp.id}
          index={idx}
          position={nodePositions[idx]}
          radius={nodeSizes[idx].radius}
          dotRadius={nodeSizes[idx].dotRadius}
          tubeRadius={nodeSizes[idx].tubeRadius}
          exp={exp}
          isSelected={selectedExperienceId === exp.id}
          isModalOpen={isModalOpen}
          onClick={() => {
            if (onSelectExperience) {
              onSelectExperience(exp);
            }
          }}
        />
      ))}
    </group>
  );
}
