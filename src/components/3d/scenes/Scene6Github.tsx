"use client";

import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { OPEN_SOURCE_ACHIEVEMENTS, GITHUB_DATA } from "@/data/portfolioData";
import { OpenSourceProject } from "@/types/portfolio";
import {
  Trophy,
  Sparkles,
  ExternalLink,
  Github,
  Terminal,
  Copy,
  Check,
  Database,
  Cpu,
  BookOpen,
  Code2,
  GitBranch,
  CheckCircle2,
  Package,
  GitPullRequest,
} from "lucide-react";
import { NeonCardBorders } from "@/components/ui/NeonCardBorders";

interface Scene6GithubProps {
  currentZ: number;
}

// 3D Interactive Achievement Card (Tilts like Project roadside cards on Left/Right, straight in Middle)
function Achievement3DCard({
  project,
  x,
  y,
  z,
  side,
  opacity,
  copiedCommand,
  onCopy,
  isMobile,
  mobileActiveIndex,
  onSelectMobileTab,
}: {
  project: OpenSourceProject;
  x: number;
  y: number;
  z: number;
  side: "left" | "middle" | "right";
  opacity: number;
  copiedCommand: boolean;
  onCopy: (cmd: string) => void;
  isMobile: boolean;
  mobileActiveIndex?: number;
  onSelectMobileTab?: (index: number) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);

  const isLeft = side === "left";
  const isRight = side === "right";

  // Left card tilts ~29 deg (+0.50 rad) towards highway center
  // Right card tilts ~29 deg (-0.50 rad) towards highway center
  // Middle card faces straight (0 rad)
  const baseRotY = isMobile ? 0 : isLeft ? 0.50 : isRight ? -0.50 : 0;
  const hoverRotY = isMobile ? 0 : isLeft ? 0.04 : isRight ? -0.04 : 0;

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetRotY = isHovered ? hoverRotY : baseRotY;
    const targetZ = z + (isHovered ? 0.35 : 0);

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
    <group ref={groupRef} position={[x, y, z]} rotation={[0, baseRotY, 0]}>
      {/* 3D Glowing Wireframe Outline (Desktop only) */}
      {!isMobile && (
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[4.2, 5.8]} />
          <meshBasicMaterial
            color={isHovered ? "#22D3EE" : "#168BFF"}
            wireframe
            transparent
            opacity={opacity * 0.35}
          />
        </mesh>
      )}

      {/* Floating 3D Card */}
      <Html
        transform
        distanceFactor={5.5}
        center
        position={[0, 0, 0.05]}
        style={{
          opacity,
          transition: "opacity 0.25s ease-out, transform 0.3s ease-out",
          pointerEvents: opacity > 0.3 ? "auto" : "none",
          transform: isHovered ? "scale(1.02)" : "scale(1)",
        }}
      >
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`w-[90vw] max-w-[340px] sm:max-w-[350px] md:w-[350px] p-5 sm:p-6 rounded-3xl backdrop-blur-2xl transition-all duration-300 relative select-none flex flex-col justify-between overflow-visible group ${
            isHovered
              ? "bg-[#061226]/85 border-2 border-[#00D2FF] shadow-[0_0_35px_rgba(0,210,255,0.45)]"
              : "bg-[#040D1E]/80 border border-[#22D3EE]/40 shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_22px_rgba(34,211,238,0.2)]"
          }`}
        >
          {/* Shiny Neon Blue Corner Edges */}
          <NeonCardBorders rounded="3xl" />

          {/* Mobile Tab Selector (Only displayed on small screens inside the card) */}
          {isMobile && onSelectMobileTab && (
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#020612]/95 border border-[#00D2FF]/50 mb-3 shadow-[0_0_14px_rgba(0,210,255,0.25)] w-full justify-between">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectMobileTab(0);
                }}
                className={`flex-1 py-1.5 px-2 rounded-xl text-[10px] font-mono font-bold tracking-tight transition-all text-center ${
                  mobileActiveIndex === 0
                    ? "bg-[#168BFF] text-white shadow-[0_0_10px_#168BFF]"
                    : "text-[#94A3B8] hover:text-white"
                }`}
              >
                FR Explorer
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectMobileTab(1);
                }}
                className={`flex-1 py-1.5 px-2 rounded-xl text-[10px] font-mono font-bold tracking-tight transition-all text-center ${
                  mobileActiveIndex === 1
                    ? "bg-[#168BFF] text-white shadow-[0_0_10px_#168BFF]"
                    : "text-[#94A3B8] hover:text-white"
                }`}
              >
                SpecForge
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectMobileTab(2);
                }}
                className={`flex-1 py-1.5 px-2 rounded-xl text-[10px] font-mono font-bold tracking-tight transition-all text-center ${
                  mobileActiveIndex === 2
                    ? "bg-[#168BFF] text-white shadow-[0_0_10px_#168BFF]"
                    : "text-[#94A3B8] hover:text-white"
                }`}
              >
                Floci PRs
              </button>
            </div>
          )}

          <div>
            {/* Top Header Badge */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span
                className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase border shadow-sm flex items-center gap-1.5"
                style={{
                  backgroundColor: `${project.badgeColor || "#00D2FF"}18`,
                  borderColor: `${project.badgeColor || "#00D2FF"}60`,
                  color: project.badgeColor || "#00D2FF",
                }}
              >
                {project.id === "federal-register-explorer" && <Cpu className="w-3 h-3 text-[#F59E0B]" />}
                {project.id === "specforge-api" && <Package className="w-3 h-3 text-[#38BDF8]" />}
                {project.id === "floci" && <GitPullRequest className="w-3 h-3 text-[#10B981]" />}
                <span>{project.badge}</span>
              </span>

              <span className="text-[10px] font-mono text-[#94A3B8] font-semibold">
                {isMobile ? `0${(mobileActiveIndex ?? 0) + 1} / 03` : side === "left" ? "01 / 03" : side === "middle" ? "02 / 03" : "03 / 03"}
              </span>
            </div>

            {/* Project Image Banner with Solid Opaque Background */}
            {project.image && (
              <div className="relative w-full h-[120px] sm:h-[130px] rounded-2xl overflow-hidden border border-[#22D3EE]/40 mb-2.5 bg-[#040A18] shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
                <img
                  src={project.image}
                  alt={project.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 bg-[#040A18]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040A18]/50 via-transparent to-transparent pointer-events-none" />
              </div>
            )}

            {/* Title */}
            <h3 className="text-base sm:text-lg font-bold font-orbitron text-white group-hover:text-[#00D2FF] transition-colors drop-shadow-[0_0_10px_rgba(255,255,255,0.85)] tracking-wide">
              {project.name}
            </h3>

            {/* Subtitle / Tagline */}
            <span className="text-[10.5px] font-mono text-[#22D3EE] font-semibold block mt-0.5 leading-snug drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]">
              {project.tagline}
            </span>

            {/* Description */}
            <p className="text-[11.5px] text-[#E2E8F0] font-inter mt-2 leading-relaxed drop-shadow-[0_0_2px_rgba(255,255,255,0.2)] line-clamp-2">
              {project.description}
            </p>

            {/* Terminal Install Snippet for SpecForge */}
            {project.installCommand && (
              <div className="mt-2.5 p-1.5 px-2.5 rounded-xl bg-[#020612]/90 border border-[#22D3EE]/35 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2 overflow-x-auto text-[#38BDF8]">
                  <Terminal className="w-3 h-3 text-[#38BDF8] flex-shrink-0" />
                  <span className="text-[10.5px] select-all font-semibold">{project.installCommand}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCopy(project.installCommand!);
                  }}
                  className="p-1 rounded hover:bg-[#081836] text-[#22D3EE] transition-colors ml-2 flex-shrink-0"
                  title="Copy command"
                >
                  {copiedCommand ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            )}

            {/* Feature Highlights */}
            <div className="mt-2 space-y-1">
              {project.highlights.slice(0, 2).map((item, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-[10.5px] text-[#CBD5E1] font-inter leading-tight">
                  <CheckCircle2 className="w-3 h-3 text-[#00D2FF] mt-0.5 flex-shrink-0 drop-shadow-[0_0_4px_#00D2FF]" />
                  <span className="line-clamp-2">{item}</span>
                </div>
              ))}
            </div>

            {/* Tech Stack Tags */}
            <div className="mt-2.5 flex flex-wrap gap-1">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#030A17]/85 border border-[#22D3EE]/35 text-[#22D3EE]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="mt-3.5 pt-2.5 border-t border-[#22D3EE]/25 flex flex-wrap items-center gap-1.5">
            {/* Card 1: Federal Register Explorer */}
            {project.id === "federal-register-explorer" && (
              <>
                <a
                  href={project.liveUrl || "https://ashish50514561-fr-data-analysis.static.hf.space/index.html"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-1.5 px-3 rounded-xl bg-[#168BFF] hover:bg-[#007BFF] text-white text-[10.5px] font-mono font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 shadow-[0_0_14px_rgba(22,139,255,0.6)]"
                >
                  <span>Launch FR Explorer</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                {project.datasetUrl && (
                  <a
                    href={project.datasetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 px-2.5 rounded-xl bg-[#081836]/75 hover:bg-[#101F38] border border-[#22D3EE]/40 text-[#F59E0B] hover:text-white text-[10.5px] font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-1.5"
                  >
                    <Database className="w-3 h-3 text-[#F59E0B]" />
                    <span>Dataset</span>
                  </a>
                )}
              </>
            )}

            {/* Card 2: SpecForge API */}
            {project.id === "specforge-api" && (
              <>
                <a
                  href={project.pypiUrl || "https://pypi.org/project/specforge-api/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-1.5 px-3 rounded-xl bg-[#168BFF] hover:bg-[#007BFF] text-white text-[10.5px] font-mono font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 shadow-[0_0_14px_rgba(22,139,255,0.6)]"
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>specforge-api · PyPI</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
                {project.docsUrl && (
                  <a
                    href={project.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 px-2.5 rounded-xl bg-[#081836]/75 hover:bg-[#101F38] border border-[#22D3EE]/40 text-[#22D3EE] hover:text-white text-[10.5px] font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>Docs</span>
                  </a>
                )}
              </>
            )}

            {/* Card 3: Floci (floci-ui) */}
            {project.id === "floci" && (
              <>
                <a
                  href={project.prUrl || "https://github.com/floci-io/floci-ui/pulls?q=author%3AAshish50514561"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-1.5 px-3 rounded-xl bg-[#168BFF] hover:bg-[#007BFF] text-white text-[10.5px] font-mono font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 shadow-[0_0_14px_rgba(22,139,255,0.6)]"
                >
                  <GitPullRequest className="w-3.5 h-3.5 text-white" />
                  <span>View Pull Requests</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 px-2.5 rounded-xl bg-[#081836]/75 hover:bg-[#101F38] border border-[#22D3EE]/40 text-[#22D3EE] hover:text-white text-[10.5px] font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-1.5"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Floci Repo</span>
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </Html>
    </group>
  );
}

export function Scene6Github({ currentZ }: Scene6GithubProps) {
  const { size, viewport } = useThree();
  const isMobile = size.width < 768 || viewport.aspect < 1.0;

  const zPos = -560;
  const dist = Math.abs(currentZ - zPos);
  const constellationRef = useRef<THREE.Group>(null);

  // Active tab state for mobile screens
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const [copiedCommand, setCopiedCommand] = useState(false);

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2000);
  };

  // Continuous smooth linear opacity across approach distance
  const opacity = useMemo(() => {
    if (dist > 52) return 0;
    return Math.max(0, 1 - dist / 46);
  }, [dist]);

  // Generate 3D Neural Constellation Network background lines
  const { nodePositions, linePositions } = useMemo(() => {
    const nodes: [number, number, number][] = [];
    const lines: number[] = [];
    const numNodes = 26;

    for (let i = 0; i < numNodes; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = 0.5 + Math.random() * 5.5;
      const z = (Math.random() - 0.5) * 10;
      nodes.push([x, y, z]);
    }

    for (let i = 0; i < numNodes; i++) {
      for (let j = i + 1; j < numNodes; j++) {
        const dx = nodes[i][0] - nodes[j][0];
        const dy = nodes[i][1] - nodes[j][1];
        const dz = nodes[i][2] - nodes[j][2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < 5.8) {
          lines.push(
            nodes[i][0], nodes[i][1], nodes[i][2],
            nodes[j][0], nodes[j][1], nodes[j][2]
          );
        }
      }
    }

    return { nodePositions: nodes, linePositions: new Float32Array(lines) };
  }, []);

  useFrame((state) => {
    if (constellationRef.current) {
      constellationRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  if (opacity <= 0.005) return null;

  const frProject = OPEN_SOURCE_ACHIEVEMENTS.find((p) => p.id === "federal-register-explorer") || OPEN_SOURCE_ACHIEVEMENTS[0];
  const specforgeProject = OPEN_SOURCE_ACHIEVEMENTS.find((p) => p.id === "specforge-api") || OPEN_SOURCE_ACHIEVEMENTS[1];
  const flociProject = OPEN_SOURCE_ACHIEVEMENTS.find((p) => p.id === "floci") || OPEN_SOURCE_ACHIEVEMENTS[2];

  const threeProjects = [frProject, specforgeProject, flociProject];

  return (
    <group position={[0, 2.0, zPos]}>
      {/* 1. 3D Neural Constellation Network Background */}
      <group ref={constellationRef} position={[0, 0.8, 0]}>
        {nodePositions.map((pos, idx) => (
          <mesh key={idx} position={pos}>
            <sphereGeometry args={[0.065, 12, 12]} />
            <meshStandardMaterial
              color="#00D2FF"
              emissive="#00D2FF"
              emissiveIntensity={opacity * 3.2}
              transparent
              opacity={opacity}
            />
          </mesh>
        ))}

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
            color="#168BFF"
            transparent
            opacity={opacity * 0.7}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
      </group>

      {/* 2. OVERHEAD SECTION HEADER & TOP ACTION BUTTON CARDS (Placed high at Y = 4.45 with generous clearance above cards) */}
      <Html
        transform
        distanceFactor={6.2}
        position={[0, 4.45, 0]}
        center
        style={{
          opacity,
          pointerEvents: opacity > 0.3 ? "auto" : "none",
          transition: "opacity 0.25s ease-out",
        }}
      >
        <div className="flex flex-col items-center select-none text-center">
          {/* Top Row: Left Metric Buttons | Center Section Banner | Right Metric & GitHub Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-[95vw]">
            {/* Left Button-like Metric Cards */}
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-2xl bg-[#040D1F]/80 border border-[#00D2FF]/40 backdrop-blur-md shadow-[0_0_14px_rgba(0,210,255,0.2)] flex items-center gap-2 hover:border-[#00D2FF] transition-all">
                <Code2 className="w-3.5 h-3.5 text-[#00D2FF]" />
                <span className="text-xs font-bold font-orbitron text-white">25+</span>
                <span className="text-[10px] font-mono text-[#94A3B8]">Repos</span>
              </div>

              <div className="px-3 py-1.5 rounded-2xl bg-[#040D1F]/80 border border-[#00D2FF]/40 backdrop-blur-md shadow-[0_0_14px_rgba(0,210,255,0.2)] flex items-center gap-2 hover:border-[#00D2FF] transition-all">
                <GitPullRequest className="w-3.5 h-3.5 text-[#10B981]" />
                <span className="text-xs font-bold font-orbitron text-white">40+</span>
                <span className="text-[10px] font-mono text-[#94A3B8]">PRs</span>
              </div>
            </div>

            {/* Center Main Heading Banner */}
            <div className="flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-[#040D1F]/90 border border-[#00D2FF]/60 backdrop-blur-md shadow-[0_0_24px_rgba(0,210,255,0.35)]">
              <Trophy className="w-4 h-4 text-[#00D2FF] drop-shadow-[0_0_8px_#00D2FF]" />
              <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.85)] uppercase">
                Open Source Achievements
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono text-[#00D2FF] font-bold px-2 py-0.5 rounded bg-[#0A224D] border border-[#00D2FF]/60">
                07
              </span>
            </div>

            {/* Right Button-like Metric & Profile Cards */}
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-2xl bg-[#040D1F]/80 border border-[#00D2FF]/40 backdrop-blur-md shadow-[0_0_14px_rgba(0,210,255,0.2)] flex items-center gap-2 hover:border-[#00D2FF] transition-all">
                <GitBranch className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span className="text-xs font-bold font-orbitron text-white">1.5K+</span>
                <span className="text-[10px] font-mono text-[#94A3B8]">Commits</span>
              </div>

              {/* GitHub Profile Action Button */}
              <a
                href={GITHUB_DATA.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-2xl bg-[#168BFF] hover:bg-[#007BFF] border border-[#00D2FF]/60 text-white text-[11px] font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-2 shadow-[0_0_16px_rgba(22,139,255,0.6)] group cursor-pointer"
              >
                <Github className="w-3.5 h-3.5 text-white" />
                <span>@{GITHUB_DATA.username}</span>
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          <span className="text-[10.5px] sm:text-[11.5px] font-mono text-[#BAE6FD] mt-2 drop-shadow-[0_0_4px_rgba(0,210,255,0.6)] px-2">
            In-Browser WebGPU AI · Published PyPI Packages · Upstream Cloud UI Contributions
          </span>
        </div>
      </Html>

      {/* 3. THREE CARDS (Left tilted, Middle straight, Right tilted - lowered to Y = 0.05 for ample breathing space) */}
      {!isMobile ? (
        /* --- DESKTOP 3-CARD ARRAY (Spacious separation: x = -5.5, 0, +5.5; Left tilted +29 deg, Right tilted -29 deg) --- */
        <group>
          {/* CARD 1 (LEFT): Federal Register Explorer (x = -5.5, tilted towards center highway by +0.50 rad) */}
          <Achievement3DCard
            project={frProject}
            x={-5.5}
            y={0.05}
            z={0.2}
            side="left"
            opacity={opacity}
            copiedCommand={copiedCommand}
            onCopy={handleCopy}
            isMobile={false}
          />

          {/* CARD 2 (MIDDLE): SpecForge API (x = 0, facing straight ahead) */}
          <Achievement3DCard
            project={specforgeProject}
            x={0.0}
            y={0.05}
            z={0.0}
            side="middle"
            opacity={opacity}
            copiedCommand={copiedCommand}
            onCopy={handleCopy}
            isMobile={false}
          />

          {/* CARD 3 (RIGHT): Floci Contribution (x = +5.5, tilted towards center highway by -0.50 rad) */}
          <Achievement3DCard
            project={flociProject}
            x={5.5}
            y={0.05}
            z={0.2}
            side="right"
            opacity={opacity}
            copiedCommand={copiedCommand}
            onCopy={handleCopy}
            isMobile={false}
          />
        </group>
      ) : (
        /* --- MOBILE SCREEN: Single Interactive Achievement Card (directly in Canvas tree, NO nested Html!) --- */
        <Achievement3DCard
          key={mobileActiveIndex}
          project={threeProjects[mobileActiveIndex]}
          x={0}
          y={0.05}
          z={0}
          side="middle"
          opacity={opacity}
          copiedCommand={copiedCommand}
          onCopy={handleCopy}
          isMobile={true}
          mobileActiveIndex={mobileActiveIndex}
          onSelectMobileTab={(idx) => setMobileActiveIndex(idx)}
        />
      )}
    </group>
  );
}
