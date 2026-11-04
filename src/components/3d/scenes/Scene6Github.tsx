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
  Layers,
} from "lucide-react";
import { NeonCardBorders } from "@/components/ui/NeonCardBorders";

interface Scene6GithubProps {
  currentZ: number;
}

// Single Open Source Achievement Card Component
function AchievementCard({
  project,
  copiedCommand,
  onCopy,
  isMiddle = false,
}: {
  project: OpenSourceProject;
  copiedCommand: boolean;
  onCopy: (cmd: string) => void;
  isMiddle?: boolean;
}) {
  return (
    <div className="w-[330px] sm:w-[350px] lg:w-[370px] p-5 sm:p-6 rounded-3xl bg-[#040D1E]/80 border border-[#22D3EE]/40 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.65),0_0_24px_rgba(34,211,238,0.2)] relative overflow-visible select-none flex flex-col justify-between transition-all duration-300 hover:border-[#00D2FF] hover:shadow-[0_0_35px_rgba(0,210,255,0.4)] group">
      {/* Shiny Neon Blue Corner Edges */}
      <NeonCardBorders rounded="3xl" />

      <div>
        {/* Top Header Badge */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span
            className="px-2.5 py-0.5 rounded-full text-[9.5px] font-mono font-bold uppercase border shadow-sm flex items-center gap-1.5"
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
            {project.id === "federal-register-explorer" ? "01 / 03" : project.id === "specforge-api" ? "02 / 03" : "03 / 03"}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold font-orbitron text-white group-hover:text-[#00D2FF] transition-colors drop-shadow-[0_0_10px_rgba(255,255,255,0.85)] tracking-wide">
          {project.name}
        </h3>

        {/* Subtitle / Tagline */}
        <span className="text-[11px] font-mono text-[#22D3EE] font-semibold block mt-1 leading-snug drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]">
          {project.tagline}
        </span>

        {/* Short Description */}
        <p className="text-xs text-[#E2E8F0] font-inter mt-2.5 leading-relaxed drop-shadow-[0_0_2px_rgba(255,255,255,0.2)] line-clamp-3">
          {project.description}
        </p>

        {/* Terminal Install Snippet for SpecForge */}
        {project.installCommand && (
          <div className="mt-3 p-2 rounded-xl bg-[#020612]/90 border border-[#22D3EE]/35 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2 overflow-x-auto text-[#38BDF8]">
              <Terminal className="w-3.5 h-3.5 text-[#38BDF8] flex-shrink-0" />
              <span className="text-[11px] select-all font-semibold">{project.installCommand}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCopy(project.installCommand!);
              }}
              className="p-1 rounded hover:bg-[#081836] text-[#22D3EE] transition-colors ml-2 flex-shrink-0"
              title="Copy command"
            >
              {copiedCommand ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        )}

        {/* Feature Highlights */}
        <div className="mt-3 space-y-1.5">
          {project.highlights.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-[11px] text-[#CBD5E1] font-inter leading-tight">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00D2FF] mt-0.5 flex-shrink-0 drop-shadow-[0_0_4px_#00D2FF]" />
              <span className="line-clamp-2">{item}</span>
            </div>
          ))}
        </div>

        {/* Tech Stack Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-[#030A17]/85 border border-[#22D3EE]/35 text-[#22D3EE]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="mt-4 pt-3.5 border-t border-[#22D3EE]/25 flex flex-wrap items-center gap-2">
        {/* Card 1: Federal Register Explorer */}
        {project.id === "federal-register-explorer" && (
          <>
            <a
              href={project.liveUrl || "https://ashish50514561-fr-data-analysis.static.hf.space/index.html"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 px-3 rounded-xl bg-[#168BFF] hover:bg-[#007BFF] text-white text-[11px] font-mono font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 shadow-[0_0_14px_rgba(22,139,255,0.6)]"
            >
              <span>Launch FR Explorer</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            {project.datasetUrl && (
              <a
                href={project.datasetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 rounded-xl bg-[#081836]/75 hover:bg-[#101F38] border border-[#22D3EE]/40 text-[#F59E0B] hover:text-white text-[11px] font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-1.5"
              >
                <Database className="w-3.5 h-3.5 text-[#F59E0B]" />
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
              className="flex-1 py-2 px-3 rounded-xl bg-[#168BFF] hover:bg-[#007BFF] text-white text-[11px] font-mono font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 shadow-[0_0_14px_rgba(22,139,255,0.6)]"
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
                className="py-2 px-3 rounded-xl bg-[#081836]/75 hover:bg-[#101F38] border border-[#22D3EE]/40 text-[#22D3EE] hover:text-white text-[11px] font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
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
              className="flex-1 py-2 px-3 rounded-xl bg-[#168BFF] hover:bg-[#007BFF] text-white text-[11px] font-mono font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 shadow-[0_0_14px_rgba(22,139,255,0.6)]"
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
                className="py-2 px-3 rounded-xl bg-[#081836]/75 hover:bg-[#101F38] border border-[#22D3EE]/40 text-[#22D3EE] hover:text-white text-[11px] font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Floci Repo</span>
              </a>
            )}
          </>
        )}
      </div>
    </div>
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
      const x = (Math.random() - 0.5) * 18;
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

      {/* 2. OVERHEAD SECTION HEADER BANNER */}
      <Html
        transform
        distanceFactor={6}
        position={[0, 3.4, 0]}
        center
        style={{
          opacity,
          pointerEvents: "none",
          transition: "opacity 0.25s ease-out",
        }}
      >
        <div className="flex flex-col items-center select-none text-center">
          <div className="flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#040D1F]/70 border border-[#00D2FF]/45 backdrop-blur-md shadow-[0_0_24px_rgba(0,210,255,0.3)] max-w-[92vw]">
            <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00D2FF] drop-shadow-[0_0_8px_#00D2FF]" />
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.85)] uppercase">
              Open Source Contributions &amp; Launched Products
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono text-[#00D2FF] font-bold px-2 py-0.5 rounded bg-[#0A224D] border border-[#00D2FF]/60">
              07
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono text-[#BAE6FD] mt-1.5 drop-shadow-[0_0_4px_rgba(0,210,255,0.6)] px-2">
            In-Browser WebGPU AI · Published PyPI Packages · Upstream Cloud UI Contributions
          </span>
        </div>
      </Html>

      {/* 3. THREE CARDS (Left, Middle, Right) */}
      {!isMobile ? (
        /* --- DESKTOP 3-CARD ARRAY (Left & Right facing inward towards center) --- */
        <group>
          {/* CARD 1 (LEFT): Federal Register Explorer (Angled inward by +0.22 rad) */}
          <group position={[-4.7, 0.0, 0.35]} rotation={[0, 0.22, 0]}>
            <Html
              transform
              distanceFactor={5.6}
              center
              style={{
                opacity,
                transition: "opacity 0.25s ease-out",
                pointerEvents: opacity > 0.3 ? "auto" : "none",
              }}
            >
              <AchievementCard
                project={frProject}
                copiedCommand={copiedCommand}
                onCopy={handleCopy}
              />
            </Html>
          </group>

          {/* CARD 2 (MIDDLE): SpecForge API (Facing straight forward) */}
          <group position={[0.0, 0.0, 0.0]} rotation={[0, 0, 0]}>
            <Html
              transform
              distanceFactor={5.6}
              center
              style={{
                opacity,
                transition: "opacity 0.25s ease-out",
                pointerEvents: opacity > 0.3 ? "auto" : "none",
              }}
            >
              <AchievementCard
                project={specforgeProject}
                copiedCommand={copiedCommand}
                onCopy={handleCopy}
                isMiddle
              />
            </Html>
          </group>

          {/* CARD 3 (RIGHT): Floci Contribution (Angled inward by -0.22 rad) */}
          <group position={[4.7, 0.0, 0.35]} rotation={[0, -0.22, 0]}>
            <Html
              transform
              distanceFactor={5.6}
              center
              style={{
                opacity,
                transition: "opacity 0.25s ease-out",
                pointerEvents: opacity > 0.3 ? "auto" : "none",
              }}
            >
              <AchievementCard
                project={flociProject}
                copiedCommand={copiedCommand}
                onCopy={handleCopy}
              />
            </Html>
          </group>
        </group>
      ) : (
        /* --- MOBILE SCREEN (Centered Card with Sleek Tab Selector) --- */
        <group position={[0, 0.0, 0]}>
          <Html
            transform
            distanceFactor={5.6}
            center
            style={{
              opacity,
              transition: "opacity 0.25s ease-out",
              pointerEvents: opacity > 0.3 ? "auto" : "none",
            }}
          >
            <div className="flex flex-col items-center select-none w-[92vw] max-w-[380px]">
              {/* Mobile Tab Selector */}
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#040D1E]/90 border border-[#00D2FF]/40 mb-3 shadow-[0_0_15px_rgba(0,210,255,0.25)] w-full justify-between">
                <button
                  onClick={() => setMobileActiveIndex(0)}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-[10px] font-mono font-bold tracking-tight transition-all text-center ${
                    mobileActiveIndex === 0
                      ? "bg-[#168BFF] text-white shadow-[0_0_10px_#168BFF]"
                      : "text-[#94A3B8] hover:text-white"
                  }`}
                >
                  FR Explorer
                </button>
                <button
                  onClick={() => setMobileActiveIndex(1)}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-[10px] font-mono font-bold tracking-tight transition-all text-center ${
                    mobileActiveIndex === 1
                      ? "bg-[#168BFF] text-white shadow-[0_0_10px_#168BFF]"
                      : "text-[#94A3B8] hover:text-white"
                  }`}
                >
                  SpecForge API
                </button>
                <button
                  onClick={() => setMobileActiveIndex(2)}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-[10px] font-mono font-bold tracking-tight transition-all text-center ${
                    mobileActiveIndex === 2
                      ? "bg-[#168BFF] text-white shadow-[0_0_10px_#168BFF]"
                      : "text-[#94A3B8] hover:text-white"
                  }`}
                >
                  Floci PRs
                </button>
              </div>

              {/* Active Mobile Card */}
              <AchievementCard
                project={threeProjects[mobileActiveIndex]}
                copiedCommand={copiedCommand}
                onCopy={handleCopy}
                isMiddle={mobileActiveIndex === 1}
              />
            </div>
          </Html>
        </group>
      )}

      {/* 4. HOLOGRAPHIC GITHUB ECOSYSTEM FOOTER BAR */}
      <Html
        transform
        distanceFactor={6}
        position={[0, -2.6, 0]}
        center
        style={{
          opacity,
          pointerEvents: opacity > 0.4 ? "auto" : "none",
          transition: "opacity 0.25s ease-out",
        }}
      >
        <div className="w-[94vw] max-w-[1140px] px-4 py-3 rounded-2xl bg-[#030917]/75 border border-[#22D3EE]/35 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.6)] flex flex-wrap items-center justify-between gap-3 select-none">
          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            {GITHUB_DATA.stats.map((stat, idx) => {
              const icons = [Code2, Package, GitPullRequest, GitBranch];
              const IconComp = icons[idx % icons.length];
              return (
                <div key={idx} className="flex items-center gap-2">
                  <IconComp className="w-3.5 h-3.5 text-[#00D2FF]" />
                  <div className="text-left">
                    <span className="text-xs sm:text-sm font-bold font-orbitron text-white mr-1.5">
                      {stat.value}
                    </span>
                    <span className="text-[9.5px] sm:text-[10.5px] font-mono text-[#94A3B8]">
                      {stat.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* GitHub Profile Action Link */}
          <a
            href={GITHUB_DATA.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-1.5 px-3.5 rounded-xl bg-[#081836]/90 hover:bg-[#10244C] border border-[#00D2FF]/50 text-white text-[11px] font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-2 shadow-[0_0_12px_rgba(0,210,255,0.25)] group"
          >
            <Github className="w-3.5 h-3.5 text-[#00D2FF]" />
            <span>GitHub (@{GITHUB_DATA.username})</span>
            <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </Html>
    </group>
  );
}
