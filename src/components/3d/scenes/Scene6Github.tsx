"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { GITHUB_DATA } from "@/data/portfolioData";
import { GitBranch, GitFork, Star, Github, ExternalLink, Network, Sparkles, Terminal, Code2, Cloud } from "lucide-react";
import { NeonCardBorders } from "@/components/ui/NeonCardBorders";

interface Scene6GithubProps {
  currentZ: number;
}

export function Scene6Github({ currentZ }: Scene6GithubProps) {
  const zPos = -455;
  const dist = Math.abs(currentZ - zPos);
  const constellationRef = useRef<THREE.Group>(null);

  const opacity = useMemo(() => {
    if (dist > 45) return 0;
    return Math.max(0, 1 - dist / 40);
  }, [dist]);

  const { nodePositions, linePositions } = useMemo(() => {
    const nodes: [number, number, number][] = [];
    const lines: number[] = [];
    const numNodes = 22;

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

      {/* Main Holographic Open-Source Console */}
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
        <div className="w-[92vw] max-w-[400px] md:max-w-[760px] p-5 sm:p-7 rounded-3xl bg-[#060F22]/50 border border-[#22D3EE]/45 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.65),0_0_24px_rgba(34,211,238,0.25)] relative overflow-visible select-none">
          {/* Shiny Neon Blue Corner Edges covering vertical and horizontal portions */}
          <NeonCardBorders rounded="3xl" />

          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 sm:pb-4 border-b border-[#22D3EE]/30">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#081836]/90 border border-[#22D3EE]/60 text-[#22D3EE] shadow-[0_0_12px_rgba(34,211,238,0.4)]">
                <Network className="w-5 h-5 sm:w-6 sm:h-6 text-[#22D3EE] animate-pulse" />
              </div>
              <div>
                <h3 className="text-base sm:text-xl font-bold font-orbitron text-white tracking-wider drop-shadow-[0_0_12px_rgba(255,255,255,0.85)]">
                  OPEN SOURCE &amp; NETWORK
                </h3>
                <span className="text-[10.5px] sm:text-xs font-mono text-[#22D3EE] font-bold tracking-widest uppercase drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]">
                  Community Impact • Developer Tooling • Telemetry
                </span>
              </div>
            </div>

            <span className="text-[10px] sm:text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#081836]/80 border border-[#22D3EE] text-[#22D3EE] shadow-[0_0_10px_rgba(34,211,238,0.4)]">
              07 • GITHUB
            </span>
          </div>

          {/* Featured Contribution: Floci */}
          <div className="mt-4 sm:mt-5 p-4 sm:p-5 rounded-2xl bg-[#081836]/50 border border-[#22D3EE]/40 relative group">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-2.5">
                <GitBranch className="w-5 h-5 text-[#22D3EE] drop-shadow-[0_0_6px_#22D3EE]" />
                <span className="text-lg sm:text-xl font-bold font-orbitron text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
                  {GITHUB_DATA.highlightedProject.name}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#101F38] border border-[#22D3EE] text-[10px] font-mono font-bold text-[#22D3EE] uppercase shadow-[0_0_8px_rgba(34,211,238,0.3)]">
                  {GITHUB_DATA.highlightedProject.role}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-white font-semibold">
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#03060D]/70 border border-[#22D3EE]/30 text-[#22D3EE]">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {GITHUB_DATA.highlightedProject.stars}
                </span>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#03060D]/70 border border-[#22D3EE]/30 text-white">
                  <GitFork className="w-3.5 h-3.5 text-[#22D3EE]" />
                  {GITHUB_DATA.highlightedProject.forks}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-[13px] text-[#F1F5F9] font-inter font-normal mb-3 leading-relaxed drop-shadow-[0_0_3px_rgba(255,255,255,0.2)]">
              {GITHUB_DATA.highlightedProject.description}
            </p>

            {/* Architecture Highlights & Tags */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
              {["Cloud Emulation", "Event-Driven Tooling", "Local AWS Runtime", "High Throughput"].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-[#04091A]/80 border border-[#22D3EE]/40 text-[#22D3EE]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-2 border-t border-[#22D3EE]/20 flex items-center gap-2 text-[11px] font-mono font-bold text-[#22D3EE] drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]">
              <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Active open-source contributions across cloud emulation and high-performance serverless runtimes.</span>
            </div>
          </div>

          {/* GitHub Stats Grid */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5">
            {GITHUB_DATA.stats.map((stat, idx) => {
              const icons = [Code2, GitBranch, Cloud, Terminal];
              const IconComp = icons[idx % icons.length];
              const sublabels = ["Full-stack & AI", "Accepted upstream", "10+ Enterprise orgs", "Across repositories"];
              return (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 rounded-xl bg-[#081836]/45 border border-[#22D3EE]/30 text-center flex flex-col justify-between"
                >
                  <div className="flex items-center justify-center gap-1.5 text-[#22D3EE] mb-1">
                    <IconComp className="w-3.5 h-3.5 opacity-80" />
                    <span className="text-xl sm:text-2xl font-bold font-orbitron text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
                      {stat.value}
                    </span>
                  </div>
                  <div>
                    <div className="text-[10.5px] font-mono font-semibold text-[#22D3EE] uppercase tracking-wider drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]">
                      {stat.label}
                    </div>
                    <div className="text-[9.5px] font-mono text-[#94A3B8] mt-0.5">
                      {sublabels[idx]}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Link to GitHub */}
          <a
            href={GITHUB_DATA.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 sm:mt-5 w-full py-3 px-4 rounded-xl bg-[#168BFF] hover:bg-[#007BFF] text-white text-xs sm:text-sm font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2.5 group shadow-[0_0_20px_rgba(22,139,255,0.6)]"
          >
            <Github className="w-4 h-4 text-white" />
            <span>Explore GitHub Profile ({GITHUB_DATA.username})</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </Html>
    </group>
  );
}
