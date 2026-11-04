"use client";

import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import {
  Sparkles,
  ExternalLink,
  GitPullRequest,
  Package,
  BookOpen,
  Database,
  Github,
  Trophy,
} from "lucide-react";
import { NeonCardBorders } from "@/components/ui/NeonCardBorders";

interface Scene6GithubProps {
  currentZ: number;
}

interface MainProjectStar {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  url: string;
  buttonText: string;
  secondaryUrl?: string;
  secondaryText?: string;
}

const MAIN_PROJECTS: MainProjectStar[] = [
  {
    id: "fr-explorer",
    title: "FR AI Explorer",
    subtitle: "DuckDB-WASM · WebGPU Gemma · HF Space",
    badge: "LIVE APP",
    url: "https://ashish50514561-fr-data-analysis.static.hf.space/index.html",
    buttonText: "Launch FR Explorer",
    secondaryUrl: "https://huggingface.co/datasets/GadgetSoftware/federal-register",
    secondaryText: "Dataset",
  },
  {
    id: "specforge-api",
    title: "SpecForge API",
    subtitle: "PyPI Package · Swagger Alternative",
    badge: "OPEN SOURCE",
    url: "https://pypi.org/project/specforge-api/",
    buttonText: "specforge-api · PyPI",
    secondaryUrl: "https://specforge-api.github.io/specforge/",
    secondaryText: "Documentation",
  },
  {
    id: "floci",
    title: "Floci",
    subtitle: "Open Source Cloud UI · PR Contributions",
    badge: "CONTRIBUTIONS",
    url: "https://github.com/floci-io/floci-ui/pulls?q=author%3AAshish50514561",
    buttonText: "View Pull Requests",
    secondaryUrl: "https://github.com/floci-io/floci-ui",
    secondaryText: "Repository",
  },
];

// Single Big Star Node: Bright center dot, neon pink border ring, outer glowing aura, stem, and floating title badge
function BigStarNode({
  project,
  position,
  radius,
  dotRadius,
  tubeRadius,
  opacity,
  index,
}: {
  project: MainProjectStar;
  position: [number, number, number];
  radius: number;
  dotRadius: number;
  tubeRadius: number;
  opacity: number;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);
  const innerOrbitRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const stemHeight = 0.95;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Gentle vertical floating oscillation
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(time * 1.6 + index * 1.4) * 0.05;
    }

    // Breathing scale expansion
    if (ringRef.current) {
      const baseScale = isHovered ? 1.15 : 1.0;
      const breath = Math.sin(time * 2.2 + index * 1.2) * 0.08;
      const targetScale = baseScale * (1.0 + breath);
      ringRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.12
      );
    }

    // Inner orbital tick ring rotation
    if (innerOrbitRef.current) {
      innerOrbitRef.current.rotation.z = time * (0.35 + index * 0.1);
    }

    // Animated energy spark traveling up the stem into the title
    if (pulseRef.current) {
      const upT = (time * 1.4 + index * 0.4) % 1;
      pulseRef.current.position.y = radius + upT * stemHeight;
    }
  });

  const handleOpen = (e?: { stopPropagation?: () => void }) => {
    if (e && typeof e.stopPropagation === "function") {
      e.stopPropagation();
    }
    window.open(project.url, "_blank", "noopener,noreferrer");
  };

  return (
    <group ref={groupRef} position={position}>
      {/* 1. INTERACTIVE STAR CORE (Round Neon Border + Bright Center Dot + Hit Area) */}
      <group
        ref={ringRef}
        onClick={(e) => handleOpen(e)}
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
        {/* Invisible hit plane for reliable click anywhere inside the circle */}
        <mesh>
          <circleGeometry args={[radius * 1.12, 32]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>

        {/* Primary Round Neon Border Ring (Hot Pink Accent) */}
        <mesh>
          <torusGeometry args={[radius, tubeRadius, 16, 64]} />
          <meshStandardMaterial
            color="#FF2E93"
            emissive="#FF2E93"
            emissiveIntensity={(isHovered ? 4.8 : 3.4) * opacity}
            roughness={0.15}
            metalness={0.88}
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* Outer Concentric Glowing Aura Sheath */}
        <mesh>
          <torusGeometry args={[radius * 1.16, tubeRadius * 1.7, 16, 64]} />
          <meshBasicMaterial
            color="#FF007F"
            transparent
            opacity={(isHovered ? 0.45 : 0.22) * opacity}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Inner Subtle Rotating Orbital Ring */}
        <mesh ref={innerOrbitRef}>
          <ringGeometry args={[radius * 0.68, radius * 0.72, 32]} />
          <meshBasicMaterial
            color="#FF66B2"
            transparent
            opacity={(isHovered ? 0.4 : 0.2) * opacity}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Bright Dot in Center: Intense Hot Pink Outer Sphere */}
        <mesh>
          <sphereGeometry args={[dotRadius, 24, 24]} />
          <meshStandardMaterial
            color="#FF2E93"
            emissive="#FF2E93"
            emissiveIntensity={(isHovered ? 5.0 : 3.8) * opacity}
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* Bright Dot in Center: Radiant White Core */}
        <mesh>
          <sphereGeometry args={[dotRadius * 0.45, 16, 16]} />
          <meshBasicMaterial
            color="#FFFFFF"
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* Local Pink Point Light */}
        <pointLight
          color="#FF2E93"
          intensity={(isHovered ? 4.8 : 3.2) * opacity}
          distance={5.5}
        />
      </group>

      {/* 2. VERTICAL CONNECTOR STEM (Rising up from top of border to Title) */}
      <group>
        {/* Glowing vertical cylinder */}
        <mesh position={[0, radius + stemHeight / 2, 0]}>
          <cylinderGeometry args={[0.016, 0.016, stemHeight, 16]} />
          <meshStandardMaterial
            color="#FF2E93"
            emissive="#FF2E93"
            emissiveIntensity={(isHovered ? 4.0 : 2.8) * opacity}
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* Joint Spheres */}
        <mesh position={[0, radius, 0]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color="#FF2E93" transparent opacity={opacity} />
        </mesh>
        <mesh position={[0, radius + stemHeight, 0]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={opacity} />
        </mesh>

        {/* Traveling energy spark moving up the stem */}
        <mesh ref={pulseRef} position={[0, radius, 0]}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={opacity} />
        </mesh>
      </group>

      {/* 3. FLOATING HEADER & LINK BADGE (Directly Above the Node) */}
      <Html
        transform
        distanceFactor={5.5}
        position={[0, radius + stemHeight + 0.32, 0]}
        center
        style={{
          opacity,
          pointerEvents: opacity <= 0.3 ? "none" : "auto",
          transition: "opacity 0.25s ease-out",
        }}
      >
        <div
          onClick={handleOpen}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="cursor-pointer group flex flex-col items-center select-none transform transition-transform duration-300 hover:scale-105"
        >
          {/* Neon Pink Cyber Glass Badge */}
          <div
            className={`w-[85vw] max-w-[260px] sm:max-w-none sm:w-[250px] px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl border backdrop-blur-xl transition-all duration-300 text-center relative overflow-visible ${
              isHovered
                ? "bg-[#22041D]/75 border-[#FF2E93] shadow-[0_0_35px_rgba(255,46,147,0.65)]"
                : "bg-[#140212]/60 border-[#FF2E93]/45 shadow-[0_0_22px_rgba(255,46,147,0.3)]"
            }`}
          >
            {/* Neon Pink Corner Edges */}
            <NeonCardBorders rounded="2xl" color="pink" />

            {/* Badge Tag */}
            <div className="flex items-center justify-center gap-1.5 mb-1.5">
              <span className="text-[9.5px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FF2E93]/15 border border-[#FF2E93]/50 text-[#FF85C0] shadow-[0_0_10px_rgba(255,46,147,0.3)]">
                {project.badge}
              </span>
            </div>

            {/* Project Title Header */}
            <h4 className="text-xs sm:text-sm font-bold font-orbitron text-white group-hover:text-[#FF85C0] transition-colors drop-shadow-[0_0_10px_rgba(255,46,147,0.9)] tracking-wide sm:whitespace-nowrap flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E93] animate-pulse shadow-[0_0_8px_#FF2E93]" />
              {project.title}
            </h4>

            {/* Subtitle / Tech summary */}
            <p className="text-[10.5px] sm:text-[11px] font-mono font-medium mt-1 text-[#FFB6DB] drop-shadow-[0_0_6px_rgba(255,46,147,0.6)]">
              {project.subtitle}
            </p>

            {/* Primary Action Button linking directly to the project */}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mt-2.5 inline-flex items-center justify-center gap-1.5 w-full py-1.5 px-3 rounded-full bg-[#FF2E93]/20 hover:bg-[#FF2E93] border border-[#FF2E93] text-[#FFD1E8] hover:text-white text-[11px] font-mono font-bold transition-all duration-200 shadow-[0_0_14px_rgba(255,46,147,0.3)] hover:shadow-[0_0_24px_rgba(255,46,147,0.85)] group/btn"
            >
              {project.id === "floci" ? (
                <GitPullRequest className="w-3.5 h-3.5 text-[#FF85C0] group-hover/btn:text-white flex-shrink-0" />
              ) : project.id === "specforge-api" ? (
                <Package className="w-3.5 h-3.5 text-[#FF85C0] group-hover/btn:text-white flex-shrink-0" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-[#FF85C0] group-hover/btn:text-white flex-shrink-0" />
              )}
              <span className="truncate">{project.buttonText}</span>
              <ExternalLink className="w-3 h-3 opacity-80 flex-shrink-0" />
            </a>

            {/* Secondary Link Row (Dataset / Docs / Repo) */}
            {project.secondaryUrl && (
              <div className="mt-1.5 pt-1.5 border-t border-[#FF2E93]/20 flex items-center justify-center gap-1 text-[9.5px] font-mono text-[#FF85C0]">
                <span>Source:</span>
                <a
                  href={project.secondaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="underline hover:text-white transition-colors inline-flex items-center gap-0.5"
                >
                  <span>{project.secondaryText}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </Html>
    </group>
  );
}

// Small Hive Satellite Node: Pink circular neon ring + central glowing dot
function SmallSatelliteNode({
  position,
  radius,
  dotRadius,
  opacity,
  index,
}: {
  position: [number, number, number];
  radius: number;
  dotRadius: number;
  opacity: number;
  index: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y =
        position[1] + Math.sin(time * 1.5 + index * 1.1) * 0.04;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Small Pink Round Neon Border */}
      <mesh>
        <torusGeometry args={[radius, 0.015, 12, 32]} />
        <meshStandardMaterial
          color="#FF2E93"
          emissive="#FF2E93"
          emissiveIntensity={3.2 * opacity}
          transparent
          opacity={opacity * 0.85}
        />
      </mesh>

      {/* Bright Center Glowing Dot */}
      <mesh>
        <sphereGeometry args={[dotRadius, 12, 12]} />
        <meshStandardMaterial
          color="#FF66B2"
          emissive="#FF2E93"
          emissiveIntensity={4.0 * opacity}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Inner White Pinpoint */}
      <mesh>
        <sphereGeometry args={[dotRadius * 0.45, 8, 8]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={opacity} />
      </mesh>
    </group>
  );
}

export function Scene6Github({ currentZ }: Scene6GithubProps) {
  const { size, viewport } = useThree();
  const isMobile = size.width < 768 || viewport.aspect < 1.0;

  const zPos = -560;
  const dist = Math.abs(currentZ - zPos);
  const ringRef = useRef<THREE.Mesh>(null);
  const sparksGroupRef = useRef<THREE.Group>(null);

  // Smooth continuous opacity for entire star hive scene
  const opacity = useMemo(() => {
    if (dist > 52) return 0;
    return Math.max(0, 1 - dist / 46);
  }, [dist]);

  // SIZES FOR THE 3 BIGGER NODES
  const bigNodeSizes = useMemo(() => {
    if (isMobile) {
      return [
        { radius: 0.52, dotRadius: 0.11, tubeRadius: 0.022 },
        { radius: 0.58, dotRadius: 0.13, tubeRadius: 0.024 },
        { radius: 0.52, dotRadius: 0.11, tubeRadius: 0.022 },
      ];
    }
    return [
      { radius: 0.72, dotRadius: 0.14, tubeRadius: 0.026 },
      { radius: 0.84, dotRadius: 0.16, tubeRadius: 0.030 },
      { radius: 0.72, dotRadius: 0.14, tubeRadius: 0.026 },
    ];
  }, [isMobile]);

  // 3D POSITIONS FOR THE 3 BIGGER NODES (Triangular Constellation Hive)
  const bigNodePositions: [number, number, number][] = useMemo(() => {
    if (isMobile) {
      return [
        [-1.35, 1.25, 0.0], // Node 0: FR AI Explorer (Left)
        [0.0, 3.25, 0.0],   // Node 1: SpecForge API (Top Apex)
        [1.35, 1.25, 0.0],  // Node 2: Floci (Right)
      ];
    }
    return [
      [-4.8, 1.8, 0.0],   // Node 0: FR AI Explorer (Left)
      [0.0, 3.3, -0.6],   // Node 1: SpecForge API (Center elevated apex)
      [4.8, 1.8, 0.0],    // Node 2: Floci (Right)
    ];
  }, [isMobile]);

  // SMALL SATELLITE HIVE NODES (Concentric star cloud surrounding the 3 main stars)
  const smallSatellites = useMemo(() => {
    // 20 deterministic small hive nodes
    const coords: [number, number, number, number, number][] = isMobile
      ? [
          [-2.2, 2.4, -0.4, 0.18, 0.045],
          [-1.9, 0.3, 0.3, 0.20, 0.050],
          [-0.8, 0.4, -0.2, 0.16, 0.040],
          [0.8, 0.4, -0.2, 0.16, 0.040],
          [1.9, 0.3, 0.3, 0.20, 0.050],
          [2.2, 2.4, -0.4, 0.18, 0.045],
          [-1.1, 3.9, 0.2, 0.22, 0.055],
          [1.1, 3.9, 0.2, 0.22, 0.055],
          [0.0, 4.4, -0.3, 0.18, 0.045],
          [-2.4, 1.3, 0.4, 0.17, 0.042],
          [2.4, 1.3, 0.4, 0.17, 0.042],
          [-0.7, 2.3, 0.5, 0.19, 0.048],
          [0.7, 2.3, 0.5, 0.19, 0.048],
          [-1.5, 2.9, -0.3, 0.16, 0.040],
          [1.5, 2.9, -0.3, 0.16, 0.040],
          [0.0, 0.0, 0.2, 0.21, 0.052],
        ]
      : [
          [-6.5, 2.8, -0.8, 0.22, 0.055],
          [-6.2, 0.7, 0.6, 0.24, 0.060],
          [-3.3, 0.6, -0.4, 0.18, 0.045],
          [-2.6, 2.8, 0.4, 0.20, 0.050],
          [-2.2, 4.2, -0.6, 0.22, 0.055],
          [-4.5, 3.7, 0.5, 0.19, 0.048],
          [-1.2, 1.6, -0.5, 0.17, 0.042],
          [-0.9, 4.4, 0.4, 0.23, 0.058],
          [0.0, 1.2, 0.3, 0.21, 0.052],
          [0.0, 4.7, -0.4, 0.19, 0.048],
          [0.9, 4.4, 0.4, 0.23, 0.058],
          [1.2, 1.6, -0.5, 0.17, 0.042],
          [2.2, 4.2, -0.6, 0.22, 0.055],
          [2.6, 2.8, 0.4, 0.20, 0.050],
          [3.3, 0.6, -0.4, 0.18, 0.045],
          [4.5, 3.7, 0.5, 0.19, 0.048],
          [6.2, 0.7, 0.6, 0.24, 0.060],
          [6.5, 2.8, -0.8, 0.22, 0.055],
          [-5.5, -0.1, 0.2, 0.20, 0.050],
          [5.5, -0.1, 0.2, 0.20, 0.050],
        ];

    return coords.map(([x, y, z, r, dr]) => ({
      pos: [x, y, z] as [number, number, number],
      radius: r,
      dotRadius: dr,
    }));
  }, [isMobile]);

  // STRAIGHT CONNECTING LINES (Hive Network Graph)
  const { linePositions, linePairs } = useMemo(() => {
    const pairs: [number[], number[]][] = [];

    // 1. Direct straight lines connecting the 3 bigger stars
    pairs.push([bigNodePositions[0], bigNodePositions[1]]);
    pairs.push([bigNodePositions[1], bigNodePositions[2]]);
    pairs.push([bigNodePositions[2], bigNodePositions[0]]);

    // 2. Connect each Big Node to its nearest small satellite nodes
    bigNodePositions.forEach((bPos) => {
      const sorted = [...smallSatellites]
        .map((s) => {
          const dx = s.pos[0] - bPos[0];
          const dy = s.pos[1] - bPos[1];
          const dz = s.pos[2] - bPos[2];
          return { s, dist: Math.sqrt(dx * dx + dy * dy + dz * dz) };
        })
        .sort((a, b) => a.dist - b.dist);

      // Connect 4 closest satellites to this big star
      sorted.slice(0, 4).forEach((item) => {
        pairs.push([bPos, item.s.pos]);
      });
    });

    // 3. Connect neighboring small satellite nodes to each other
    for (let i = 0; i < smallSatellites.length; i++) {
      for (let j = i + 1; j < smallSatellites.length; j++) {
        const p1 = smallSatellites[i].pos;
        const p2 = smallSatellites[j].pos;
        const dx = p1[0] - p2[0];
        const dy = p1[1] - p2[1];
        const dz = p1[2] - p2[2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const maxLinkDist = isMobile ? 1.6 : 2.5;
        if (d < maxLinkDist) {
          pairs.push([p1, p2]);
        }
      }
    }

    // Convert pairs to flat Float32Array for lineSegments
    const flat: number[] = [];
    pairs.forEach(([p1, p2]) => {
      flat.push(p1[0], p1[1], p1[2], p2[0], p2[1], p2[2]);
    });

    return {
      linePositions: new Float32Array(flat),
      linePairs: pairs,
    };
  }, [bigNodePositions, smallSatellites, isMobile]);

  // Pre-allocate traveling energy sparks along 6 main network lines
  const sparkRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.12;
    }

    // Animate traveling photon sparks along the hive lines
    if (linePairs.length > 0) {
      sparkRefs.current.forEach((sparkMesh, idx) => {
        if (!sparkMesh) return;
        const pair = linePairs[idx % Math.min(linePairs.length, 9)];
        if (!pair) return;
        const [p1, p2] = pair;
        const t = (time * (0.35 + (idx % 3) * 0.1) + idx * 0.18) % 1;

        sparkMesh.position.set(
          p1[0] + (p2[0] - p1[0]) * t,
          p1[1] + (p2[1] - p1[1]) * t,
          p1[2] + (p2[2] - p1[2]) * t
        );
      });
    }
  });

  if (opacity <= 0.005) return null;

  return (
    <group position={[0, 2.0, zPos]}>
      {/* 1. OVERHEAD RADAR ARCH (Pinkish Accent) */}
      <mesh ref={ringRef} position={[0, isMobile ? 4.2 : 3.6, 0]}>
        <torusGeometry args={[isMobile ? 3.0 : 8.8, 0.06, 16, 64, Math.PI]} />
        <meshStandardMaterial
          color="#FF2E93"
          emissive="#FF2E93"
          emissiveIntensity={opacity * 2.8}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Overhead Section Header Banner */}
      <Html
        transform
        distanceFactor={6}
        position={[0, isMobile ? 4.6 : 4.4, 0]}
        center
        style={{
          opacity,
          pointerEvents: "none",
          transition: "opacity 0.25s ease-out",
        }}
      >
        <div className="flex flex-col items-center select-none text-center">
          <div className="flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#160214]/65 border border-[#FF2E93]/50 backdrop-blur-md shadow-[0_0_24px_rgba(255,46,147,0.35)] max-w-[90vw]">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF2E93] drop-shadow-[0_0_8px_#FF2E93]" />
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.85)]">
              OPEN SOURCE HIVE // CELESTIAL NETWORK
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono text-[#FF2E93] font-bold px-2 py-0.5 rounded bg-[#2D0524] border border-[#FF2E93]/60">
              07
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono text-[#FFD1E8] mt-1.5 drop-shadow-[0_0_4px_rgba(255,46,147,0.6)] px-2">
            Interactive Star Hive · Select any core or button to launch
          </span>
        </div>
      </Html>

      {/* 2. STRAIGHT CONNECTING LINES (Pink Neon Hive Web) */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#FF2E93"
          transparent
          opacity={opacity * 0.72}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Traveling Energy Sparks along Hive Lines */}
      <group ref={sparksGroupRef}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => (
          <mesh
            key={idx}
            ref={(el) => {
              sparkRefs.current[idx] = el;
            }}
          >
            <sphereGeometry args={[0.065, 12, 12]} />
            <meshBasicMaterial
              color="#FFFFFF"
              transparent
              opacity={opacity * 0.95}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>

      {/* 3. SMALL SATELLITE HIVE NODES (Circles & Dots) */}
      {smallSatellites.map((s, idx) => (
        <SmallSatelliteNode
          key={idx}
          position={s.pos}
          radius={s.radius}
          dotRadius={s.dotRadius}
          opacity={opacity}
          index={idx}
        />
      ))}

      {/* 4. THE THREE BIGGER STAR NODES (FR AI Explorer, SpecForge API, Floci) */}
      {MAIN_PROJECTS.map((proj, idx) => (
        <BigStarNode
          key={proj.id}
          project={proj}
          position={bigNodePositions[idx]}
          radius={bigNodeSizes[idx].radius}
          dotRadius={bigNodeSizes[idx].dotRadius}
          tubeRadius={bigNodeSizes[idx].tubeRadius}
          opacity={opacity}
          index={idx}
        />
      ))}
    </group>
  );
}
