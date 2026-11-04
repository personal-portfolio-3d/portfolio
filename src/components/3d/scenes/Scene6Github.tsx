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

// Single Big Star Node in Pure Blue Neon:
// Bright center dot, neon blue circular border ring, outer glowing aura sheath, vertical connector stem, and floating title badge
function BigStarNode({
  project,
  position,
  radius,
  dotRadius,
  tubeRadius,
  stemHeight = 0.55,
  badgeWidthClass,
  opacity,
  index,
}: {
  project: MainProjectStar;
  position: [number, number, number];
  radius: number;
  dotRadius: number;
  tubeRadius: number;
  stemHeight?: number;
  badgeWidthClass?: string;
  opacity: number;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);
  const innerOrbitRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Gentle vertical floating oscillation
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(time * 1.6 + index * 1.4) * 0.04;
    }

    // Breathing scale expansion
    if (ringRef.current) {
      const baseScale = isHovered ? 1.15 : 1.0;
      const breath = Math.sin(time * 2.2 + index * 1.2) * 0.07;
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
      {/* 1. INTERACTIVE STAR CORE (Round Neon Blue Border + Bright Center Dot + Hit Area) */}
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

        {/* Primary Round Neon Border Ring (Neon Blue #00F0FF) */}
        <mesh>
          <torusGeometry args={[radius, tubeRadius, 16, 64]} />
          <meshStandardMaterial
            color="#00F0FF"
            emissive="#00F0FF"
            emissiveIntensity={(isHovered ? 4.8 : 3.4) * opacity}
            roughness={0.15}
            metalness={0.88}
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* Outer Concentric Glowing Aura Sheath (Cyan Glow) */}
        <mesh>
          <torusGeometry args={[radius * 1.16, tubeRadius * 1.7, 16, 64]} />
          <meshBasicMaterial
            color="#00D2FF"
            transparent
            opacity={(isHovered ? 0.45 : 0.22) * opacity}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Inner Subtle Rotating Orbital Ring */}
        <mesh ref={innerOrbitRef}>
          <ringGeometry args={[radius * 0.68, radius * 0.72, 32]} />
          <meshBasicMaterial
            color="#22D3EE"
            transparent
            opacity={(isHovered ? 0.4 : 0.2) * opacity}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Bright Dot in Center: Intense Neon Blue Outer Sphere */}
        <mesh>
          <sphereGeometry args={[dotRadius, 24, 24]} />
          <meshStandardMaterial
            color="#00F0FF"
            emissive="#00F0FF"
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
          <meshBasicMaterial color="#FFFFFF" transparent opacity={opacity} />
        </mesh>

        {/* Local Neon Blue Point Light */}
        <pointLight
          color="#00F0FF"
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
            color="#00F0FF"
            emissive="#00F0FF"
            emissiveIntensity={(isHovered ? 4.0 : 2.8) * opacity}
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* Joint Spheres */}
        <mesh position={[0, radius, 0]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color="#00F0FF" transparent opacity={opacity} />
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
        position={[0, radius + stemHeight + 0.22, 0]}
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
          {/* Neon Blue Cyber Glass Badge */}
          <div
            className={`${
              badgeWidthClass || "w-[85vw] max-w-[250px] sm:max-w-none sm:w-[240px]"
            } px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl border backdrop-blur-xl transition-all duration-300 text-center relative overflow-visible ${
              isHovered
                ? "bg-[#06142E]/85 border-[#00F0FF] shadow-[0_0_35px_rgba(0,240,255,0.65)]"
                : "bg-[#040D1F]/70 border-[#00F0FF]/45 shadow-[0_0_22px_rgba(0,240,255,0.3)]"
            }`}
          >
            {/* Neon Blue Corner Edges */}
            <NeonCardBorders rounded="2xl" color="blue" />

            {/* Badge Tag */}
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#00F0FF]/15 border border-[#00F0FF]/50 text-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                {project.badge}
              </span>
            </div>

            {/* Project Title Header */}
            <h4 className="text-xs sm:text-[13px] font-bold font-orbitron text-white group-hover:text-[#00F0FF] transition-colors drop-shadow-[0_0_10px_rgba(0,240,255,0.9)] tracking-wide sm:whitespace-nowrap flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse shadow-[0_0_8px_#00F0FF]" />
              {project.title}
            </h4>

            {/* Subtitle / Tech summary */}
            <p className="text-[10px] font-mono font-medium mt-0.5 text-[#BAE6FD] drop-shadow-[0_0_6px_rgba(0,240,255,0.5)]">
              {project.subtitle}
            </p>

            {/* Primary Action Button linking directly to the project */}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mt-2 inline-flex items-center justify-center gap-1.5 w-full py-1.5 px-2.5 rounded-full bg-[#00F0FF]/20 hover:bg-[#00F0FF] border border-[#00F0FF] text-[#E0F2FE] hover:text-[#040D1F] text-[10.5px] font-mono font-bold transition-all duration-200 shadow-[0_0_14px_rgba(0,240,255,0.3)] hover:shadow-[0_0_24px_rgba(0,240,255,0.85)] group/btn"
            >
              {project.id === "floci" ? (
                <GitPullRequest className="w-3.5 h-3.5 text-[#00F0FF] group-hover/btn:text-[#040D1F] flex-shrink-0" />
              ) : project.id === "specforge-api" ? (
                <Package className="w-3.5 h-3.5 text-[#00F0FF] group-hover/btn:text-[#040D1F] flex-shrink-0" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-[#00F0FF] group-hover/btn:text-[#040D1F] flex-shrink-0" />
              )}
              <span className="truncate">{project.buttonText}</span>
              <ExternalLink className="w-3 h-3 opacity-80 flex-shrink-0" />
            </a>

            {/* Secondary Link Row (Dataset / Docs / Repo) */}
            {project.secondaryUrl && (
              <div className="mt-1 pt-1 border-t border-[#00F0FF]/20 flex items-center justify-center gap-1 text-[9px] font-mono text-[#67E8F9]">
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

// Small Hive Satellite Node in Pure Blue Neon: Circular border + center glowing dot
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
      {/* Small Neon Blue Round Border */}
      <mesh>
        <torusGeometry args={[radius, 0.015, 12, 32]} />
        <meshStandardMaterial
          color="#00F0FF"
          emissive="#00F0FF"
          emissiveIntensity={3.2 * opacity}
          transparent
          opacity={opacity * 0.85}
        />
      </mesh>

      {/* Bright Center Glowing Dot */}
      <mesh>
        <sphereGeometry args={[dotRadius, 12, 12]} />
        <meshStandardMaterial
          color="#00F0FF"
          emissive="#00F0FF"
          emissiveIntensity={4.2 * opacity}
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

  // Smooth continuous opacity across 46 units approach
  const opacity = useMemo(() => {
    if (dist > 52) return 0;
    return Math.max(0, 1 - dist / 46);
  }, [dist]);

  // SIZES FOR THE 3 BIGGER NODES
  const bigNodeSizes = useMemo(() => {
    if (isMobile) {
      return [
        { radius: 0.44, dotRadius: 0.10, tubeRadius: 0.020, stemHeight: 0.42 },
        { radius: 0.50, dotRadius: 0.12, tubeRadius: 0.022, stemHeight: 0.42 },
        { radius: 0.44, dotRadius: 0.10, tubeRadius: 0.020, stemHeight: 0.42 },
      ];
    }
    return [
      { radius: 0.68, dotRadius: 0.14, tubeRadius: 0.026, stemHeight: 0.55 },
      { radius: 0.78, dotRadius: 0.16, tubeRadius: 0.028, stemHeight: 0.55 },
      { radius: 0.68, dotRadius: 0.14, tubeRadius: 0.026, stemHeight: 0.55 },
    ];
  }, [isMobile]);

  // 3D POSITIONS SPREAD ACROSS THE WHOLE SCREEN WITH ZERO OVERLAP
  // Desktop: Wide span across X (-5.5, 0.0, +5.5). Heading at Y = 4.4.
  // Mobile: Triangular constellation hive (Top apex at Y = 2.5, Bottom two at Y = 0.4, X = +-1.4). Heading at Y = 4.7.
  const bigNodePositions: [number, number, number][] = useMemo(() => {
    if (isMobile) {
      return [
        [-1.4, 0.35, 0.0],  // Node 0: FR AI Explorer (Bottom Left)
        [0.0, 2.45, 0.0],   // Node 1: SpecForge API (Top Apex, badge top at ~3.8, heading at 4.7)
        [1.4, 0.35, 0.0],   // Node 2: Floci (Bottom Right)
      ];
    }
    return [
      [-5.5, 0.7, 0.0],   // Node 0: FR AI Explorer (Left roadside)
      [0.0, 1.4, -0.6],   // Node 1: SpecForge API (Center elevated apex, badge top at ~3.4, heading at 4.4)
      [5.5, 0.7, 0.0],    // Node 2: Floci (Right roadside)
    ];
  }, [isMobile]);

  // Responsive badge width classes for zero overlap
  const badgeWidthClasses = useMemo(() => {
    if (isMobile) {
      return [
        "w-[172px]", // Left
        "w-[185px]", // Top Center
        "w-[172px]", // Right
      ];
    }
    return [
      "w-[245px]",
      "w-[250px]",
      "w-[245px]",
    ];
  }, [isMobile]);

  // SMALL SATELLITE HIVE NODES (Spread out across the screen perimeter)
  const smallSatellites = useMemo(() => {
    const coords: [number, number, number, number, number][] = isMobile
      ? [
          [-2.3, 2.6, -0.3, 0.18, 0.045],
          [-2.1, 0.2, 0.3, 0.20, 0.050],
          [-1.9, -0.7, -0.2, 0.16, 0.040],
          [0.0, -0.6, 0.2, 0.20, 0.050],
          [1.9, -0.7, -0.2, 0.16, 0.040],
          [2.1, 0.2, 0.3, 0.20, 0.050],
          [2.3, 2.6, -0.3, 0.18, 0.045],
          [-1.2, 4.0, 0.2, 0.20, 0.050],
          [1.2, 4.0, 0.2, 0.20, 0.050],
          [0.0, 4.3, -0.3, 0.18, 0.045],
          [-2.4, 1.4, 0.4, 0.17, 0.042],
          [2.4, 1.4, 0.4, 0.17, 0.042],
          [-0.7, 1.4, 0.5, 0.18, 0.045],
          [0.7, 1.4, 0.5, 0.18, 0.045],
          [-1.5, 3.2, -0.3, 0.16, 0.040],
          [1.5, 3.2, -0.3, 0.16, 0.040],
        ]
      : [
          [-7.8, 2.5, -0.8, 0.22, 0.055],
          [-7.2, 0.5, 0.6, 0.24, 0.060],
          [-7.0, 3.8, 0.3, 0.20, 0.050],
          [-3.5, 0.2, -0.4, 0.18, 0.045],
          [-2.8, 2.6, 0.4, 0.20, 0.050],
          [-2.4, 4.1, -0.6, 0.22, 0.055],
          [-4.8, 3.8, 0.5, 0.19, 0.048],
          [-1.3, 0.4, -0.5, 0.17, 0.042],
          [-1.0, 4.3, 0.4, 0.22, 0.055],
          [0.0, 0.0, 0.3, 0.21, 0.052],
          [0.0, 4.6, -0.4, 0.19, 0.048],
          [1.0, 4.3, 0.4, 0.22, 0.055],
          [1.3, 0.4, -0.5, 0.17, 0.042],
          [2.4, 4.1, -0.6, 0.22, 0.055],
          [2.8, 2.6, 0.4, 0.20, 0.050],
          [3.5, 0.2, -0.4, 0.18, 0.045],
          [4.8, 3.8, 0.5, 0.19, 0.048],
          [7.0, 3.8, 0.3, 0.20, 0.050],
          [7.2, 0.5, 0.6, 0.24, 0.060],
          [7.8, 2.5, -0.8, 0.22, 0.055],
        ];

    return coords.map(([x, y, z, r, dr]) => ({
      pos: [x, y, z] as [number, number, number],
      radius: r,
      dotRadius: dr,
    }));
  }, [isMobile]);

  // STRAIGHT CONNECTING LINES (Blue Neon Hive Web)
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
        const maxLinkDist = isMobile ? 1.7 : 2.8;
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

  // Pre-allocate traveling energy sparks along main network lines
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
      {/* 1. OVERHEAD RADAR ARCH (Pure Blue Neon) */}
      <mesh ref={ringRef} position={[0, isMobile ? 4.3 : 3.8, 0]}>
        <torusGeometry args={[isMobile ? 3.0 : 8.8, 0.06, 16, 64, Math.PI]} />
        <meshStandardMaterial
          color="#00F0FF"
          emissive="#00F0FF"
          emissiveIntensity={opacity * 2.8}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* 2. OVERHEAD SECTION HEADER AT TOP: "Open source contributions and launched products" */}
      <Html
        transform
        distanceFactor={6}
        position={[0, isMobile ? 4.7 : 4.4, 0]}
        center
        style={{
          opacity,
          pointerEvents: "none",
          transition: "opacity 0.25s ease-out",
        }}
      >
        <div className="flex flex-col items-center select-none text-center">
          <div className="flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#040D1F]/75 border border-[#00F0FF]/50 backdrop-blur-md shadow-[0_0_24px_rgba(0,240,255,0.35)] max-w-[92vw]">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00F0FF] drop-shadow-[0_0_8px_#00F0FF]" />
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.85)] uppercase">
              Open source contributions and launched products
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono text-[#00F0FF] font-bold px-2 py-0.5 rounded bg-[#0A224D] border border-[#00F0FF]/60">
              07
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono text-[#BAE6FD] mt-1.5 drop-shadow-[0_0_4px_rgba(0,240,255,0.6)] px-2">
            Interactive Star Hive · Select any core or button to visit
          </span>
        </div>
      </Html>

      {/* 3. STRAIGHT CONNECTING LINES (Pure Blue Neon Hive Web) */}
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
          color="#00F0FF"
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

      {/* 4. SMALL SATELLITE HIVE NODES (Blue Neon Circles & Dots) */}
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

      {/* 5. THE THREE BIGGER STAR NODES (FR AI Explorer, SpecForge API, Floci) */}
      {MAIN_PROJECTS.map((proj, idx) => (
        <BigStarNode
          key={proj.id}
          project={proj}
          position={bigNodePositions[idx]}
          radius={bigNodeSizes[idx].radius}
          dotRadius={bigNodeSizes[idx].dotRadius}
          tubeRadius={bigNodeSizes[idx].tubeRadius}
          stemHeight={bigNodeSizes[idx].stemHeight}
          badgeWidthClass={badgeWidthClasses[idx]}
          opacity={opacity}
          index={idx}
        />
      ))}
    </group>
  );
}
