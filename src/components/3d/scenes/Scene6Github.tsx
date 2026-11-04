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

// --------------------------------------------------------------------------
// 1. OVERHEAD HIVE CANOPY (At the top of the highway, in place of round arch)
// Pure constellation of glowing dots and straight lines, NO circles around dots.
// --------------------------------------------------------------------------
function OverheadHiveCanopy({
  isMobile,
  opacity,
}: {
  isMobile: boolean;
  opacity: number;
}) {
  const canopyRef = useRef<THREE.Group>(null);
  const sparkRefs = useRef<(THREE.Mesh | null)[]>([]);

  // Generate overhead hive constellation dots spanning across the top of the highway
  const { dots, linePositions, linePairs } = useMemo(() => {
    const dotList: { pos: [number, number, number]; size: number }[] = [];

    if (isMobile) {
      // Mobile upper canopy spanning X in [-2.6, 2.6], Y in [4.0, 5.4]
      const coords: [number, number, number, number][] = [
        [-2.5, 4.2, -0.4, 0.08],
        [-2.1, 4.7, 0.3, 0.09],
        [-1.6, 4.3, -0.2, 0.07],
        [-1.2, 5.1, 0.2, 0.10],
        [-0.7, 4.5, -0.3, 0.08],
        [-0.4, 5.3, 0.4, 0.09],
        [0.0, 4.6, 0.0, 0.11],
        [0.4, 5.3, -0.3, 0.09],
        [0.7, 4.5, 0.3, 0.08],
        [1.2, 5.1, -0.2, 0.10],
        [1.6, 4.3, 0.2, 0.07],
        [2.1, 4.7, -0.3, 0.09],
        [2.5, 4.2, 0.4, 0.08],
        [-1.9, 5.4, 0.0, 0.08],
        [1.9, 5.4, 0.0, 0.08],
        [0.0, 5.5, -0.4, 0.10],
      ];
      coords.forEach(([x, y, z, s]) => dotList.push({ pos: [x, y, z], size: s }));
    } else {
      // Desktop grand arched canopy spanning X in [-8.5, 8.5], Y in [3.8, 5.6]
      const coords: [number, number, number, number][] = [
        [-8.2, 3.8, -0.5, 0.08],
        [-7.5, 4.2, 0.4, 0.10],
        [-6.8, 4.6, -0.3, 0.09],
        [-6.0, 4.3, 0.5, 0.08],
        [-5.3, 4.9, -0.4, 0.11],
        [-4.5, 4.5, 0.3, 0.09],
        [-3.8, 5.2, -0.2, 0.10],
        [-3.0, 4.7, 0.4, 0.09],
        [-2.2, 5.4, -0.5, 0.11],
        [-1.5, 4.8, 0.3, 0.08],
        [-0.8, 5.5, -0.2, 0.12],
        [0.0, 4.9, 0.4, 0.13],
        [0.0, 5.6, -0.4, 0.11],
        [0.8, 5.5, 0.2, 0.12],
        [1.5, 4.8, -0.3, 0.08],
        [2.2, 5.4, 0.5, 0.11],
        [3.0, 4.7, -0.4, 0.09],
        [3.8, 5.2, 0.2, 0.10],
        [4.5, 4.5, -0.3, 0.09],
        [5.3, 4.9, 0.4, 0.11],
        [6.0, 4.3, -0.5, 0.08],
        [6.8, 4.6, 0.3, 0.09],
        [7.5, 4.2, -0.4, 0.10],
        [8.2, 3.8, 0.5, 0.08],
        [-4.0, 5.6, 0.2, 0.09],
        [4.0, 5.6, -0.2, 0.09],
        [-6.2, 5.1, 0.0, 0.08],
        [6.2, 5.1, 0.0, 0.08],
      ];
      coords.forEach(([x, y, z, s]) => dotList.push({ pos: [x, y, z], size: s }));
    }

    // Connect nearby dots with straight lines to form the overhead hive web
    const pairs: [number[], number[]][] = [];
    const maxDist = isMobile ? 1.4 : 2.2;

    for (let i = 0; i < dotList.length; i++) {
      for (let j = i + 1; j < dotList.length; j++) {
        const p1 = dotList[i].pos;
        const p2 = dotList[j].pos;
        const dx = p1[0] - p2[0];
        const dy = p1[1] - p2[1];
        const dz = p1[2] - p2[2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < maxDist) {
          pairs.push([p1, p2]);
        }
      }
    }

    const flatLines: number[] = [];
    pairs.forEach(([p1, p2]) => {
      flatLines.push(p1[0], p1[1], p1[2], p2[0], p2[1], p2[2]);
    });

    return {
      dots: dotList,
      linePositions: new Float32Array(flatLines),
      linePairs: pairs,
    };
  }, [isMobile]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Gentle canopy breathing float
    if (canopyRef.current) {
      canopyRef.current.position.y = Math.sin(time * 0.9) * 0.03;
    }

    // Animate traveling photon sparks along canopy lines
    if (linePairs.length > 0) {
      sparkRefs.current.forEach((sparkMesh, idx) => {
        if (!sparkMesh) return;
        const pair = linePairs[idx % linePairs.length];
        if (!pair) return;
        const [p1, p2] = pair;
        const t = (time * (0.35 + (idx % 3) * 0.1) + idx * 0.16) % 1;

        sparkMesh.position.set(
          p1[0] + (p2[0] - p1[0]) * t,
          p1[1] + (p2[1] - p1[1]) * t,
          p1[2] + (p2[2] - p1[2]) * t
        );
      });
    }
  });

  return (
    <group ref={canopyRef}>
      {/* Straight Hive Lines at the top (Connecting Canopy) */}
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
          opacity={opacity * 0.68}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Hive Dots (Just dots, NO circles around them!) */}
      {dots.map((dot, idx) => (
        <group key={idx} position={dot.pos}>
          {/* Outer Glowing Dot Sphere */}
          <mesh>
            <sphereGeometry args={[dot.size, 14, 14]} />
            <meshStandardMaterial
              color="#00F0FF"
              emissive="#00F0FF"
              emissiveIntensity={3.8 * opacity}
              roughness={0.1}
              metalness={0.9}
              transparent
              opacity={opacity}
            />
          </mesh>
          {/* Inner Radiant White Core */}
          <mesh>
            <sphereGeometry args={[dot.size * 0.45, 10, 10]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={opacity} />
          </mesh>
        </group>
      ))}

      {/* Traveling Energy Sparks along the Canopy Lines */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => (
        <mesh
          key={idx}
          ref={(el) => {
            sparkRefs.current[idx] = el;
          }}
        >
          <sphereGeometry args={[0.055, 12, 12]} />
          <meshBasicMaterial
            color="#FFFFFF"
            transparent
            opacity={opacity * 0.95}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

// --------------------------------------------------------------------------
// 2. PROJECT STAR NODE (Three dots with twinkling stars around them)
// Just a glowing core dot and stars around it, with floating header and link badge.
// --------------------------------------------------------------------------
function ProjectStarNode({
  project,
  position,
  stemHeight = 0.55,
  badgeWidthClass,
  opacity,
  index,
  isMobile,
}: {
  project: MainProjectStar;
  position: [number, number, number];
  stemHeight?: number;
  badgeWidthClass?: string;
  opacity: number;
  index: number;
  isMobile: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Group>(null);
  const starsGroupRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  const dotRadius = isMobile ? 0.16 : 0.22;

  // Orbiting satellite stars around the central dot
  const satelliteStars = useMemo(() => {
    const starList: {
      angle: number;
      dist: number;
      speed: number;
      size: number;
      zOffset: number;
    }[] = [];
    const count = 7;
    const baseDist = isMobile ? 0.42 : 0.62;

    for (let i = 0; i < count; i++) {
      starList.push({
        angle: (i / count) * Math.PI * 2 + (i % 2) * 0.2,
        dist: baseDist + ((i * 17) % 5) * 0.05,
        speed: (0.45 + (i % 3) * 0.15) * (i % 2 === 0 ? 1 : -1),
        size: 0.035 + (i % 3) * 0.012,
        zOffset: ((i % 3) - 1) * 0.12,
      });
    }

    return starList;
  }, [isMobile]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Gentle vertical floating oscillation
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(time * 1.6 + index * 1.4) * 0.04;
    }

    // Central star breathing pulse
    if (coreRef.current) {
      const baseScale = isHovered ? 1.25 : 1.0;
      const breath = Math.sin(time * 2.4 + index * 1.2) * 0.08;
      const targetScale = baseScale * (1.0 + breath);
      coreRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.14
      );
    }

    // Orbiting stars motion and twinkle
    if (starsGroupRef.current) {
      starsGroupRef.current.children.forEach((child, idx) => {
        const starData = satelliteStars[idx];
        if (!starData) return;
        const currentAngle = starData.angle + time * starData.speed;
        child.position.x = Math.cos(currentAngle) * starData.dist;
        child.position.y = Math.sin(currentAngle) * starData.dist * 0.75;
        child.position.z = starData.zOffset + Math.sin(time * 1.5 + idx) * 0.08;
      });
    }

    // Traveling energy spark moving up the connector stem
    if (pulseRef.current) {
      const upT = (time * 1.4 + index * 0.4) % 1;
      pulseRef.current.position.y = dotRadius + upT * stemHeight;
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
      {/* 1. CENTRAL GLOWING STAR DOT (Hit Area + Bright Dot + Point Light) */}
      <group
        ref={coreRef}
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
        {/* Invisible hit plane */}
        <mesh>
          <sphereGeometry args={[dotRadius * 2.2, 16, 16]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>

        {/* Central Intense Neon Blue Outer Star Dot */}
        <mesh>
          <sphereGeometry args={[dotRadius, 24, 24]} />
          <meshStandardMaterial
            color="#00F0FF"
            emissive="#00F0FF"
            emissiveIntensity={(isHovered ? 5.2 : 4.0) * opacity}
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* Radiant White Core */}
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

      {/* 2. STARS AROUND THE CENTRAL DOT */}
      <group ref={starsGroupRef}>
        {satelliteStars.map((star, idx) => (
          <group key={idx}>
            {/* Twinkling Star Pinpoint */}
            <mesh>
              <sphereGeometry args={[star.size, 10, 10]} />
              <meshStandardMaterial
                color="#00F0FF"
                emissive="#00F0FF"
                emissiveIntensity={(isHovered ? 4.5 : 3.5) * opacity}
                transparent
                opacity={opacity * 0.9}
              />
            </mesh>
            {/* Tiny White Spark Core */}
            <mesh>
              <sphereGeometry args={[star.size * 0.45, 8, 8]} />
              <meshBasicMaterial color="#FFFFFF" transparent opacity={opacity} />
            </mesh>
          </group>
        ))}
      </group>

      {/* 3. VERTICAL CONNECTOR STEM (Rising up from dot to Title) */}
      <group>
        <mesh position={[0, dotRadius + stemHeight / 2, 0]}>
          <cylinderGeometry args={[0.014, 0.014, stemHeight, 16]} />
          <meshStandardMaterial
            color="#00F0FF"
            emissive="#00F0FF"
            emissiveIntensity={(isHovered ? 4.0 : 2.8) * opacity}
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* Joint Spheres */}
        <mesh position={[0, dotRadius, 0]}>
          <sphereGeometry args={[0.035, 14, 14]} />
          <meshBasicMaterial color="#00F0FF" transparent opacity={opacity} />
        </mesh>
        <mesh position={[0, dotRadius + stemHeight, 0]}>
          <sphereGeometry args={[0.035, 14, 14]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={opacity} />
        </mesh>

        {/* Animated pulse travelling up the stem */}
        <mesh ref={pulseRef} position={[0, dotRadius, 0]}>
          <sphereGeometry args={[0.045, 14, 14]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={opacity} />
        </mesh>
      </group>

      {/* 4. FLOATING HEADER & LINK BADGE */}
      <Html
        transform
        distanceFactor={5.5}
        position={[0, dotRadius + stemHeight + 0.18, 0]}
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
          {/* Pure Blue Neon Cyber Glass Badge */}
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

// --------------------------------------------------------------------------
// 3. MAIN SCENE COMPONENT
// --------------------------------------------------------------------------
export function Scene6Github({ currentZ }: Scene6GithubProps) {
  const { size, viewport } = useThree();
  const isMobile = size.width < 768 || viewport.aspect < 1.0;

  const zPos = -560;
  const dist = Math.abs(currentZ - zPos);

  // Smooth continuous opacity across 46 units approach
  const opacity = useMemo(() => {
    if (dist > 52) return 0;
    return Math.max(0, 1 - dist / 46);
  }, [dist]);

  // 3D POSITIONS SPREAD ACROSS THE SCREEN WITH ZERO OVERLAP
  // Desktop: Wide span across X (-5.5, 0.0, +5.5). Canopy at Y = 4.0+. Heading at Y = 4.4.
  // Mobile: Triangular constellation hive (Top apex at Y = 2.45, Bottom two at Y = 0.4, X = +-1.4). Heading at Y = 4.7.
  const projectPositions: [number, number, number][] = useMemo(() => {
    if (isMobile) {
      return [
        [-1.4, 0.4, 0.0],  // Node 0: FR AI Explorer (Bottom Left)
        [0.0, 2.45, 0.0],  // Node 1: SpecForge API (Top Apex)
        [1.4, 0.4, 0.0],   // Node 2: Floci (Bottom Right)
      ];
    }
    return [
      [-5.5, 0.7, 0.0],  // Node 0: FR AI Explorer (Left roadside)
      [0.0, 1.4, -0.6],  // Node 1: SpecForge API (Center elevated apex)
      [5.5, 0.7, 0.0],   // Node 2: Floci (Right roadside)
    ];
  }, [isMobile]);

  // Stem heights for clean vertical separation
  const stemHeights = useMemo(() => {
    if (isMobile) {
      return [0.42, 0.42, 0.42];
    }
    return [0.55, 0.55, 0.55];
  }, [isMobile]);

  // Responsive badge width classes for zero overlap
  const badgeWidthClasses = useMemo(() => {
    if (isMobile) {
      return ["w-[172px]", "w-[185px]", "w-[172px]"];
    }
    return ["w-[245px]", "w-[250px]", "w-[245px]"];
  }, [isMobile]);

  if (opacity <= 0.005) return null;

  return (
    <group position={[0, 2.0, zPos]}>
      {/* 1. OVERHEAD HIVE CANOPY AT TOP (Replacing the round circle arch) */}
      <OverheadHiveCanopy isMobile={isMobile} opacity={opacity} />

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

      {/* 3. THE THREE PROJECT STAR NODES (Three glowing dots with stars orbiting around them) */}
      {MAIN_PROJECTS.map((proj, idx) => (
        <ProjectStarNode
          key={proj.id}
          project={proj}
          position={projectPositions[idx]}
          stemHeight={stemHeights[idx]}
          badgeWidthClass={badgeWidthClasses[idx]}
          opacity={opacity}
          index={idx}
          isMobile={isMobile}
        />
      ))}
    </group>
  );
}
