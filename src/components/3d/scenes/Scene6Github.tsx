"use client";

import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { OPEN_SOURCE_ACHIEVEMENTS, GITHUB_DATA } from "@/data/portfolioData";
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
  Cloud,
  CheckCircle2,
  Package,
} from "lucide-react";
import { NeonCardBorders } from "@/components/ui/NeonCardBorders";

interface Scene6GithubProps {
  currentZ: number;
}

export function Scene6Github({ currentZ }: Scene6GithubProps) {
  const { size, viewport } = useThree();
  const isMobile = size.width < 768 || viewport.aspect < 1.0;

  const zPos = -455;
  const dist = Math.abs(currentZ - zPos);
  const constellationRef = useRef<THREE.Group>(null);

  const [activeTab, setActiveTab] = useState<"all" | "federal-register-explorer" | "specforge-api">("all");
  const [copiedCommand, setCopiedCommand] = useState(false);

  const handleCopy = (e: React.MouseEvent, cmd: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(cmd);
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2000);
  };

  const opacity = useMemo(() => {
    if (dist > 48) return 0;
    return Math.max(0, 1 - dist / 42);
  }, [dist]);

  const { nodePositions, linePositions } = useMemo(() => {
    const nodes: [number, number, number][] = [];
    const lines: number[] = [];
    const numNodes = 24;

    for (let i = 0; i < numNodes; i++) {
      const x = (Math.random() - 0.5) * 16;
      const y = 1.5 + Math.random() * 5;
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
      constellationRef.current.rotation.y = state.clock.getElapsedTime() * 0.04;
    }
  });

  if (opacity <= 0.01) return null;

  const projectsToDisplay =
    activeTab === "all"
      ? OPEN_SOURCE_ACHIEVEMENTS
      : OPEN_SOURCE_ACHIEVEMENTS.filter((p) => p.id === activeTab);

  return (
    <group position={[0, 2.2, zPos]}>
      {/* 3D Neural Constellation Network */}
      <group ref={constellationRef} position={[0, 1.5, 0]}>
        {nodePositions.map((pos, idx) => (
          <mesh key={idx} position={pos}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial
              color="#22D3EE"
              emissive="#22D3EE"
              emissiveIntensity={3.5}
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
            opacity={opacity * 0.75}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
      </group>

      {/* Main Holographic Achievements & Open Source Console */}
      <Html
        transform
        distanceFactor={6}
        position={[0, 0.2, 0]}
        style={{
          opacity,
          transition: "opacity 0.2s ease-out",
          pointerEvents: opacity > 0.4 ? "auto" : "none",
        }}
      >
        <div className="w-[94vw] max-w-[420px] md:max-w-[860px] p-5 sm:p-7 rounded-3xl bg-[#060F22]/55 border border-[#22D3EE]/45 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.65),0_0_24px_rgba(34,211,238,0.25)] relative overflow-visible select-none">
          {/* Shiny Neon Blue Corner Edges covering vertical and horizontal portions */}
          <NeonCardBorders rounded="3xl" />

          {/* Console Header */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3.5 sm:pb-4 border-b border-[#22D3EE]/30">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#081836]/90 border border-[#22D3EE]/60 text-[#22D3EE] shadow-[0_0_12px_rgba(34,211,238,0.4)]">
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-[#22D3EE] animate-pulse" />
              </div>
              <div>
                <h3 className="text-base sm:text-xl font-bold font-orbitron text-white tracking-wider drop-shadow-[0_0_12px_rgba(255,255,255,0.85)]">
                  OPEN SOURCE ACHIEVEMENTS
                </h3>
                <span className="text-[10.5px] sm:text-xs font-mono text-[#22D3EE] font-bold tracking-widest uppercase drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]">
                  Live Public Applications • Published PyPI Packages • WebGPU AI
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#081836]/80 border border-[#22D3EE] text-[#22D3EE] shadow-[0_0_10px_rgba(34,211,238,0.4)]">
                07 • ACHIEVEMENTS
              </span>
            </div>
          </div>

          {/* Interactive Filter / Tab Bar */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1 rounded-xl text-[11px] font-mono font-bold tracking-wide transition-all ${
                activeTab === "all"
                  ? "bg-[#168BFF] text-white shadow-[0_0_12px_#168BFF]"
                  : "bg-[#081836]/60 border border-[#22D3EE]/30 text-[#94A3B8] hover:text-white"
              }`}
            >
              All Projects ({OPEN_SOURCE_ACHIEVEMENTS.length})
            </button>
            <button
              onClick={() => setActiveTab("federal-register-explorer")}
              className={`px-3 py-1 rounded-xl text-[11px] font-mono font-bold tracking-wide transition-all flex items-center gap-1.5 ${
                activeTab === "federal-register-explorer"
                  ? "bg-[#F59E0B] text-black shadow-[0_0_12px_rgba(245,158,11,0.6)]"
                  : "bg-[#081836]/60 border border-[#22D3EE]/30 text-[#94A3B8] hover:text-white"
              }`}
            >
              <Cpu className="w-3 h-3 text-[#F59E0B]" />
              Federal Register Explorer
            </button>
            <button
              onClick={() => setActiveTab("specforge-api")}
              className={`px-3 py-1 rounded-xl text-[11px] font-mono font-bold tracking-wide transition-all flex items-center gap-1.5 ${
                activeTab === "specforge-api"
                  ? "bg-[#38BDF8] text-black shadow-[0_0_12px_rgba(56,189,248,0.6)]"
                  : "bg-[#081836]/60 border border-[#22D3EE]/30 text-[#94A3B8] hover:text-white"
              }`}
            >
              <Package className="w-3 h-3 text-[#38BDF8]" />
              SpecForge API (PyPI)
            </button>
          </div>

          {/* Achievement Projects Grid (2-Column on Desktop, Stacked on Mobile) */}
          <div className={`mt-4 grid gap-4 ${activeTab === "all" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
            {projectsToDisplay.map((project) => (
              <div
                key={project.id}
                className="p-4 sm:p-5 rounded-2xl bg-[#081836]/55 border border-[#22D3EE]/35 hover:border-[#22D3EE] transition-all flex flex-col justify-between group shadow-[0_0_15px_rgba(0,0,0,0.4)]"
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[9.5px] font-mono font-bold uppercase border shadow-sm"
                      style={{
                        backgroundColor: `${project.badgeColor || "#00D2FF"}18`,
                        borderColor: `${project.badgeColor || "#00D2FF"}60`,
                        color: project.badgeColor || "#00D2FF",
                      }}
                    >
                      {project.badge}
                    </span>

                    {project.installCommand && (
                      <span className="text-[10px] font-mono text-[#94A3B8] hidden sm:inline">
                        PyPI Verified
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h4 className="text-base sm:text-lg font-bold font-orbitron text-white group-hover:text-[#22D3EE] transition-colors drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
                    {project.name}
                  </h4>
                  <span className="text-[11px] font-mono text-[#00D2FF] font-semibold block mt-0.5 leading-snug drop-shadow-[0_0_6px_rgba(0,210,255,0.6)]">
                    {project.tagline}
                  </span>

                  {/* Description */}
                  <p className="text-xs text-[#EDF4FF] font-inter mt-2 leading-relaxed drop-shadow-[0_0_2px_rgba(255,255,255,0.2)]">
                    {project.description}
                  </p>

                  {/* Terminal Install Snippet for SpecForge */}
                  {project.installCommand && (
                    <div className="mt-3 p-2 rounded-xl bg-[#03060D]/85 border border-[#22D3EE]/30 flex items-center justify-between font-mono text-xs">
                      <div className="flex items-center gap-2 overflow-x-auto text-[#38BDF8]">
                        <Terminal className="w-3.5 h-3.5 text-[#38BDF8] flex-shrink-0" />
                        <span className="text-[11px] select-all">{project.installCommand}</span>
                      </div>
                      <button
                        onClick={(e) => handleCopy(e, project.installCommand!)}
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
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-[#030A17]/80 border border-[#22D3EE]/35 text-[#22D3EE]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 pt-3 border-t border-[#22D3EE]/20 flex flex-wrap items-center gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1.5 px-3 rounded-lg bg-[#168BFF] hover:bg-[#007BFF] text-white text-[10.5px] font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(22,139,255,0.6)]"
                    >
                      <span>{project.pypiUrl ? "View on PyPI" : "Explore Live App"}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  {project.docsUrl && (
                    <a
                      href={project.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1.5 px-3 rounded-lg bg-[#081836]/70 hover:bg-[#101F38] border border-[#22D3EE]/40 text-[#22D3EE] hover:text-white text-[10.5px] font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-1.5"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>Official Docs</span>
                    </a>
                  )}

                  {project.datasetUrl && (
                    <a
                      href={project.datasetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1.5 px-3 rounded-lg bg-[#081836]/70 hover:bg-[#101F38] border border-[#22D3EE]/40 text-[#F59E0B] hover:text-white text-[10.5px] font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-1.5"
                    >
                      <Database className="w-3 h-3 text-[#F59E0B]" />
                      <span>HF Dataset</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* GitHub Telemetry Stats Grid */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
            {GITHUB_DATA.stats.map((stat, idx) => {
              const icons = [Code2, Package, GitBranch, Terminal];
              const IconComp = icons[idx % icons.length];
              return (
                <div
                  key={idx}
                  className="p-3 sm:p-3.5 rounded-xl bg-[#081836]/45 border border-[#22D3EE]/30 text-center flex flex-col justify-between"
                >
                  <div className="flex items-center justify-center gap-1.5 text-[#22D3EE] mb-1">
                    <IconComp className="w-3.5 h-3.5 opacity-80" />
                    <span className="text-lg sm:text-xl font-bold font-orbitron text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
                      {stat.value}
                    </span>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-semibold text-[#22D3EE] uppercase tracking-wider drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]">
                      {stat.label}
                    </div>
                    {stat.sublabel && (
                      <div className="text-[9px] font-mono text-[#94A3B8] mt-0.5">
                        {stat.sublabel}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Link to GitHub Profile */}
          <a
            href={GITHUB_DATA.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full py-2.5 sm:py-3 px-4 rounded-xl bg-[#168BFF] hover:bg-[#007BFF] text-white text-xs sm:text-sm font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2.5 group shadow-[0_0_20px_rgba(22,139,255,0.6)]"
          >
            <Github className="w-4 h-4 text-white" />
            <span>Explore Complete GitHub Ecosystem (@{GITHUB_DATA.username})</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </Html>
    </group>
  );
}
