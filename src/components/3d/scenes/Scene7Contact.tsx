"use client";

import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Mail, Linkedin, Github, Send, RotateCcw, CheckCircle, Sparkles } from "lucide-react";
import { NeonCardBorders } from "@/components/ui/NeonCardBorders";

interface Scene7ContactProps {
  currentZ: number;
  onRestartExperience: () => void;
}

export function Scene7Contact({ currentZ, onRestartExperience }: Scene7ContactProps) {
  const zPos = -660;
  const dist = Math.abs(currentZ - zPos);

  const portalRingsRef = useRef<THREE.Group>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const opacity = useMemo(() => {
    if (dist > 45) return 0;
    return Math.max(0, 1 - dist / 40);
  }, [dist]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (portalRingsRef.current) {
      portalRingsRef.current.children.forEach((child, i) => {
        child.rotation.z = t * (0.15 + i * 0.08) * (i % 2 === 0 ? 1 : -1);
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Ashish,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
    );
    window.open(`mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`, "_blank");
  };

  if (opacity <= 0.01) return null;

  return (
    <group position={[0, 2.5, zPos]}>
      {/* Radiant Destination Hyper-Portal in the Background */}
      <group ref={portalRingsRef} position={[0, 2.5, -12]}>
        <mesh>
          <ringGeometry args={[8, 8.4, 64]} />
          <meshStandardMaterial
            color="#22D3EE"
            emissive="#22D3EE"
            emissiveIntensity={4.2}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[0, 0, -1]}>
          <ringGeometry args={[6.8, 7.1, 48]} />
          <meshStandardMaterial
            color="#00D2FF"
            emissive="#00D2FF"
            emissiveIntensity={3.8}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[0, 0, -2]}>
          <circleGeometry args={[5.5, 32]} />
          <meshBasicMaterial
            color="#081426"
            transparent
            opacity={0.35}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Main Glassmorphic Contact Terminal */}
      <Html
        transform
        distanceFactor={6}
        position={[0, 0, 0]}
        style={{
          opacity,
          transition: "opacity 0.2s ease-out",
          pointerEvents: opacity > 0.4 ? "auto" : "none",
        }}
      >
        <div className="w-[92vw] max-w-[400px] md:max-w-[780px] p-5 sm:p-7 rounded-3xl bg-[#040816]/95 sm:bg-[#060F22]/55 border-2 border-[#22D3EE] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.75),0_0_28px_rgba(34,211,238,0.35)] relative overflow-visible select-none">
          {/* Shiny Neon Blue Corner Edges covering vertical and horizontal portions */}
          <NeonCardBorders rounded="3xl" />
          {/* Top Energy Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#168BFF] via-[#22D3EE] to-[#168BFF]" />

          {/* Header */}
          <div className="text-center pb-3.5 sm:pb-4 border-b border-[#22D3EE]/30">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#081836]/80 border border-[#22D3EE] text-[10px] sm:text-[11px] font-mono text-[#22D3EE] font-bold tracking-widest uppercase mb-2 shadow-[0_0_10px_rgba(34,211,238,0.5)]">
              <Sparkles className="w-3.5 h-3.5 text-[#22D3EE] animate-spin flex-shrink-0" style={{ animationDuration: "10s" }} />
              08 • FINAL DESTINATION • TERMINUS
            </div>

            <h3 className="text-xl sm:text-3xl font-black font-orbitron text-white tracking-wide drop-shadow-[0_0_16px_rgba(255,255,255,0.9)]">
              LET&apos;S BUILD SOMETHING GREAT.
            </h3>
            <p className="text-xs sm:text-[13px] text-[#E2E8F0] font-inter mt-1.5 max-w-xl mx-auto drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]">
              Open for senior engineering roles, high-scale system architecture, and AI-driven platforms.
            </p>
          </div>

          <div className="mt-4 sm:mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Direct Connect Column */}
            <div className="space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] sm:text-xs font-mono text-[#22D3EE] font-bold tracking-wider uppercase drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]">
                    DIRECT CHANNELS
                  </span>
                  {/* Availability Badge */}
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/50 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Available for hire
                  </span>
                </div>

                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#081836]/50 border border-[#22D3EE]/40 hover:border-[#22D3EE] text-xs font-mono text-white hover:text-[#22D3EE] transition-all group shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                >
                  <Mail className="w-4 h-4 text-[#22D3EE] group-hover:scale-110 transition-transform drop-shadow-[0_0_6px_#22D3EE] flex-shrink-0" />
                  <span className="truncate font-semibold">{PERSONAL_INFO.email}</span>
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#081836]/50 border border-[#22D3EE]/40 hover:border-[#22D3EE] text-xs font-mono text-white hover:text-[#22D3EE] transition-all group shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                >
                  <Linkedin className="w-4 h-4 text-[#22D3EE] group-hover:scale-110 transition-transform drop-shadow-[0_0_6px_#22D3EE] flex-shrink-0" />
                  <span className="truncate font-semibold">ashish-dogra-48750a245</span>
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#081836]/50 border border-[#22D3EE]/40 hover:border-[#22D3EE] text-xs font-mono text-white hover:text-[#22D3EE] transition-all group shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                >
                  <Github className="w-4 h-4 text-[#22D3EE] group-hover:scale-110 transition-transform drop-shadow-[0_0_6px_#22D3EE] flex-shrink-0" />
                  <span className="truncate font-semibold">Ashish50514561</span>
                </a>

                {/* Focus Areas Panel */}
                <div className="p-2.5 rounded-xl bg-[#030A17]/70 border border-[#22D3EE]/25 text-[10.5px] font-mono text-[#94A3B8]">
                  <span className="text-[#22D3EE] font-bold block mb-1">PREFERRED ROLES &amp; SCOPE:</span>
                  <div className="flex flex-wrap gap-1 text-[#CBD5E1]">
                    <span>• Sr. Full Stack</span>
                    <span>• System Architect</span>
                    <span>• AI Microservices</span>
                  </div>
                </div>
              </div>

              {/* Warp Restart Button */}
              <button
                onClick={onRestartExperience}
                className="mt-2 sm:mt-3 w-full py-3 px-4 rounded-xl bg-[#081836]/70 hover:bg-[#168BFF]/40 border border-[#22D3EE]/50 hover:border-[#22D3EE] text-white hover:text-[#22D3EE] text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_0_15px_rgba(34,211,238,0.25)]"
              >
                <RotateCcw className="w-4 h-4 group-hover:-rotate-90 transition-transform duration-300 text-[#22D3EE] flex-shrink-0" />
                <span>Restart Journey (Warp to Start)</span>
              </button>
            </div>

            {/* Quick Interactive Message Form */}
            <div>
              {formSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center p-6 rounded-2xl bg-[#081836]/60 border border-[#22D3EE] text-center">
                  <CheckCircle className="w-10 h-10 text-[#22D3EE] mb-2 animate-bounce drop-shadow-[0_0_10px_#22D3EE]" />
                  <h4 className="text-base font-bold font-orbitron text-white">
                    TRANSMISSION READY
                  </h4>
                  <p className="text-xs text-[#E2E8F0] font-inter mt-1.5 font-medium leading-relaxed">
                    Your email client has been prepared. Looking forward to speaking soon!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#081836]/65 border border-[#22D3EE]/40 focus:border-[#22D3EE] text-xs sm:text-sm text-white placeholder-[#94A3B8] font-inter outline-none transition-colors shadow-inner"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#081836]/65 border border-[#22D3EE]/40 focus:border-[#22D3EE] text-xs sm:text-sm text-white placeholder-[#94A3B8] font-inter outline-none transition-colors shadow-inner"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Your Message / Scope / Inquiries"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#081836]/65 border border-[#22D3EE]/40 focus:border-[#22D3EE] text-xs sm:text-sm text-white placeholder-[#94A3B8] font-inter outline-none transition-colors resize-none shadow-inner"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-[#168BFF] hover:bg-[#007BFF] text-white text-xs sm:text-sm font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(22,139,255,0.7)]"
                  >
                    <Send className="w-4 h-4 flex-shrink-0" />
                    <span>Send Transmission</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}
