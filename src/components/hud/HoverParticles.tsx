"use client";

import { useState, useEffect } from "react";

interface HoverParticlesProps {
  isHovered: boolean;
  color?: "blue" | "cyan" | "violet";
  count?: number;
}

export function HoverParticles({
  isHovered,
  color = "cyan",
  count = 14,
}: HoverParticlesProps) {
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number; dx: number; dy: number; opacity: number }[]
  >([]);

  useEffect(() => {
    if (!isHovered) {
      setParticles([]);
      return;
    }

    // Spawn burst of particles around the edges
    const newParticles = Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
      const speed = 15 + Math.random() * 25;
      return {
        id: i,
        x: (Math.random() - 0.5) * 80,
        y: (Math.random() - 0.5) * 80,
        size: 2.5 + Math.random() * 2.5,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        opacity: 0.85,
      };
    });

    setParticles(newParticles);

    // Fade out timer
    const timer = setTimeout(() => {
      setParticles((prev) =>
        prev.map((p) => ({ ...p, opacity: 0, x: p.x + p.dx * 0.4, y: p.y + p.dy * 0.4 }))
      );
    }, 450);

    return () => clearTimeout(timer);
  }, [isHovered, count]);

  if (!isHovered && particles.length === 0) return null;

  const particleColor =
    color === "blue"
      ? "bg-[#168BFF] shadow-[0_0_8px_#168BFF]"
      : color === "violet"
      ? "bg-[#925CFF] shadow-[0_0_8px_#925CFF]"
      : "bg-[#22D3EE] shadow-[0_0_8px_#22D3EE]";

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible z-20">
      {particles.map((p) => (
        <span
          key={p.id}
          className={`absolute rounded-full transition-all duration-500 ease-out ${particleColor}`}
          style={{
            left: `calc(50% + ${p.x}px)`,
            top: `calc(50% + ${p.y}px)`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            transform: `translate(${p.dx * 0.5}px, ${p.dy * 0.5}px)`,
          }}
        />
      ))}
    </div>
  );
}

