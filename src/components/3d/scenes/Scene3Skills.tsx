"use client";

import { useMemo, useState, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import {
  Code2,
  Cpu,
  Layers,
  Server,
  Database,
  Cloud,
  ShieldCheck,
  Terminal,
  Zap,
  Network,
  Boxes,
  Palette,
  Radio,
  Flame,
  FileCode,
  Binary,
} from "lucide-react";

interface Scene3SkillsProps {
  currentZ: number;
  isModalOpen?: boolean;
}

interface TechCardItem {
  id: string;
  name: string;
  category: "Frontend" | "Backend" | "Database" | "Cloud" | "Architecture";
  iconName: string;
  iconColor: string;
  x: number;
  y: number;
  z: number;
  rotY: number;
  scale: number;
  isPrimary?: boolean;
}

export function Scene3Skills({ currentZ, isModalOpen }: Scene3SkillsProps) {
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Scattered 3D spatial technology field with distinct vivid colors for each technology icon
  const techCards: TechCardItem[] = useMemo(() => {
    return [
      // Frontend cluster (Z = -115 to -125)
      { id: "react", name: "React.js", category: "Frontend", iconName: "react", iconColor: "#00D2FF", x: -4.5, y: 3.2, z: -115, rotY: 0.22, scale: 1.15, isPrimary: true },
      { id: "nextjs", name: "Next.js", category: "Frontend", iconName: "nextjs", iconColor: "#FFFFFF", x: 4.6, y: 3.4, z: -117, rotY: -0.22, scale: 1.15, isPrimary: true },
      { id: "typescript", name: "TypeScript", category: "Frontend", iconName: "typescript", iconColor: "#38BDF8", x: -4.2, y: 1.6, z: -121, rotY: 0.2, scale: 1.05, isPrimary: true },
      { id: "javascript", name: "JavaScript", category: "Frontend", iconName: "javascript", iconColor: "#FACC15", x: 4.4, y: 1.8, z: -123, rotY: -0.2, scale: 1.0 },
      { id: "tailwind", name: "Tailwind CSS", category: "Frontend", iconName: "tailwind", iconColor: "#22D3EE", x: -3.8, y: 4.2, z: -125, rotY: 0.18, scale: 0.95 },
      { id: "htmlcss", name: "HTML5 / CSS3", category: "Frontend", iconName: "htmlcss", iconColor: "#FB923C", x: 4.0, y: 4.3, z: -126, rotY: -0.18, scale: 0.95 },

      // Backend cluster (Z = -128 to -138)
      { id: "nodejs", name: "Node.js", category: "Backend", iconName: "nodejs", iconColor: "#4ADE80", x: -4.8, y: 2.4, z: -129, rotY: 0.25, scale: 1.15, isPrimary: true },
      { id: "python", name: "Python", category: "Backend", iconName: "python", iconColor: "#FBBF24", x: 4.9, y: 2.6, z: -131, rotY: -0.25, scale: 1.1, isPrimary: true },
      { id: "fastapi", name: "FastAPI", category: "Backend", iconName: "fastapi", iconColor: "#2DD4BF", x: -4.0, y: 3.8, z: -133, rotY: 0.2, scale: 1.0 },
      { id: "express", name: "Express.js", category: "Backend", iconName: "express", iconColor: "#C084FC", x: 4.2, y: 1.4, z: -135, rotY: -0.2, scale: 1.0 },
      { id: "fastify", name: "Fastify", category: "Backend", iconName: "fastify", iconColor: "#FF2E93", x: -4.3, y: 1.3, z: -137, rotY: 0.2, scale: 0.95 },

      // Database cluster (Z = -138 to -144)
      { id: "mongodb", name: "MongoDB", category: "Database", iconName: "mongodb", iconColor: "#34D399", x: 4.7, y: 3.6, z: -139, rotY: -0.24, scale: 1.05, isPrimary: true },
      { id: "postgres", name: "PostgreSQL", category: "Database", iconName: "postgres", iconColor: "#60A5FA", x: -4.6, y: 2.8, z: -141, rotY: 0.24, scale: 1.05, isPrimary: true },

      // Cloud & Infrastructure cluster (Z = -144 to -152)
      { id: "aws", name: "AWS Cloud", category: "Cloud", iconName: "aws", iconColor: "#F59E0B", x: 4.6, y: 2.2, z: -145, rotY: -0.22, scale: 1.15, isPrimary: true },
      { id: "docker", name: "Docker", category: "Cloud", iconName: "docker", iconColor: "#0284C7", x: -4.4, y: 3.9, z: -147, rotY: 0.22, scale: 1.05 },
      { id: "microservices", name: "Microservices", category: "Architecture", iconName: "microservices", iconColor: "#A855F7", x: 4.5, y: 4.1, z: -149, rotY: -0.2, scale: 1.1, isPrimary: true },
      { id: "eventdriven", name: "Event-Driven", category: "Architecture", iconName: "eventdriven", iconColor: "#FF007F", x: -4.2, y: 1.5, z: -151, rotY: 0.2, scale: 1.05 },

      // AI & Advanced (Z = -153 to -160)
      { id: "ai", name: "AI Integrations", category: "Architecture", iconName: "ai", iconColor: "#FF2E93", x: 4.3, y: 2.8, z: -154, rotY: -0.22, scale: 1.15, isPrimary: true },
      { id: "systemarch", name: "System Architecture", category: "Architecture", iconName: "systemarch", iconColor: "#00D2FF", x: -4.5, y: 2.9, z: -156, rotY: 0.22, scale: 1.1, isPrimary: true },
      { id: "auth", name: "Auth & RBAC", category: "Architecture", iconName: "auth", iconColor: "#FBBF24", x: 4.1, y: 1.6, z: -158, rotY: -0.2, scale: 1.0 },
    ];
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.children.forEach((child, i) => {
        child.position.y += Math.sin(t * 1.6 + i) * 0.002;
      });
    }
  });

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "react":
        return (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6">
            <ellipse cx="12" cy="12" rx="10" ry="4.2" />
            <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
            <circle cx="12" cy="12" r="1.6" fill="currentColor" />
          </svg>
        );
      case "nextjs":
        return (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.4 14.8l-5.8-7.5v7.5H8V7.5h1.8l5.8 7.5V7.5h1.6v9.3h-1.8z" />
          </svg>
        );
      case "typescript":
        return (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M6 7.5h5.5M8.75 7.5v8.5M14 13.2c.4.6 1.1 1 1.9 1 1 0 1.6-.5 1.6-1.1 0-.6-.5-.9-1.4-1.1l-.6-.2c-1.3-.3-2-.9-2-2 0-1.3 1.1-2.1 2.5-2.1 1 0 1.8.4 2.3 1.1l-1 1c-.3-.5-.8-.7-1.3-.7-.6 0-1.1.4-1.1.9 0 .5.4.7 1.2.9l.6.2c1.4.4 2.2.9 2.2 2.1 0 1.4-1.2 2.2-2.8 2.2-1.3 0-2.2-.5-2.8-1.3l1.1-1z" />
          </svg>
        );
      case "javascript":
        return (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M8.5 8v5.5c0 1.2-.6 1.7-1.6 1.7-.8 0-1.3-.4-1.6-.8l.9-.8c.2.3.4.4.7.4.4 0 .6-.2.6-.7V8h1zm5 5.2c.4.6 1.1 1 1.9 1 1 0 1.6-.5 1.6-1.1 0-.6-.5-.9-1.4-1.1l-.6-.2c-1.3-.3-2-.9-2-2 0-1.3 1.1-2.1 2.5-2.1 1 0 1.8.4 2.3 1.1l-1 1c-.3-.5-.8-.7-1.3-.7-.6 0-1.1.4-1.1.9 0 .5.4.7 1.2.9l.6.2c1.4.4 2.2.9 2.2 2.1 0 1.4-1.2 2.2-2.8 2.2-1.3 0-2.2-.5-2.8-1.3l1.1-1z" />
          </svg>
        );
      case "tailwind":
        return (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M12 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6C13.7 10.6 15 12 18 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6C16.3 6.2 15 4.8 12 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6C7.7 17.8 9 19.2 12 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6C10.3 13.4 9 12 6 12z" />
          </svg>
        );
      case "htmlcss":
        return (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M4 3l1.5 16.5L12 22l6.5-2.5L20 3H4zm13.8 4.2l-.3 3.5h-5.5v2.2h5.1l-.5 5.1-4.6 1.3v-1.6l3.1-.9.3-2.6H8.6l-.3-3.5h7.6l.2-2.3H8.3l-.3-3.5h11.2l-.4 2.3z" />
          </svg>
        );
      case "nodejs":
        return (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M12 2l9 5.2v10.4L12 22.8 3 17.6V7.2L12 2zm0 2.5L5.5 8.2v7.6L12 19.5l6.5-3.7V8.2L12 4.5z" />
            <path d="M12 7.5a4.5 4.5 0 0 1 4.5 4.5c0 2.5-2 4.5-4.5 4.5S7.5 14.5 7.5 12a4.5 4.5 0 0 1 4.5-4.5zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />
          </svg>
        );
      case "python":
        return (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M11.9 2c-3.6 0-3.4 1.6-3.4 1.6l.03 1.6h3.4v.5H7.1S5 5.5 5 9.1s1.8 3.5 1.8 3.5h1.1v-1.6s-.1-1.8 1.8-1.8h3.4s1.7 0 1.7-1.7V4.2S15.2 2 11.9 2zm-1.8 1.1c.3 0 .6.3.6.6s-.3.6-.6.6-.6-.3-.6-.6.3-.6.6-.6zm1.9 18.9c3.6 0 3.4-1.6 3.4-1.6l-.03-1.6h-3.4v-.5h4.8s2.1.2 2.1-3.4-1.8-3.5-1.8-3.5h-1.1v1.6s.1 1.8-1.8 1.8h-3.4s-1.7 0-1.7 1.7v3.3s-.4 2.2 2.9 2.2zm1.8-1.1c-.3 0-.6-.3-.6-.6s.3-.6.6-.6.6.3.6.6-.3.6-.6.6z" />
          </svg>
        );
      case "fastapi":
        return (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 14.5v-3.5h2.5l-4.5 5.5v-3.5H8.5l4.5-5.5v3.5z" />
          </svg>
        );
      case "fastify":
        return (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M19.4 6.8c-.4-.5-1-.8-1.6-.8H14c.4-.7.6-1.5.6-2.3 0-2.1-1.7-3.7-3.7-3.7-1.8 0-3.3 1.3-3.6 3H5.2c-.7 0-1.3.3-1.7.8-.5.5-.7 1.2-.6 1.9l1.4 8.5c.2 1.4 1.4 2.5 2.8 2.5h1.9v3.3c0 .6.4 1 1 1h4c.6 0 1-.4 1-1v-3.3h1.9c1.4 0 2.6-1.1 2.8-2.5l1.4-8.5c.1-.7-.1-1.4-.7-1.9zM10.9 2.5c.7 0 1.2.5 1.2 1.2s-.5 1.2-1.2 1.2-1.2-.5-1.2-1.2.5-1.2 1.2-1.2zm4.5 13.5H8.6l-1.1-7h9l-1.1 7z" />
            <path d="M11 9.5l-2.5 5h3l-.5 2.5 3.5-5.5h-2.5l1-2h-2z" />
          </svg>
        );
      case "express":
        return (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M6 8h4.2v1.5H7.5v2h2.5v1.5H7.5v2.2h2.8V16H6V8zm6.5 0h1.7l1.5 2.6 1.5-2.6h1.7l-2.3 3.9 2.5 4.1H18l-1.6-2.9-1.6 2.9h-1.8l2.5-4.1-2-3.9z" />
          </svg>
        );
      case "mongodb":
        return (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M12 2C11.6 2.4 7 7.7 7 13.5c0 4.1 2.7 7.5 5 8.5 2.3-1 5-4.4 5-8.5C17 7.7 12.4 2.4 12 2zm-.2 2.3c.1 1.7.3 3.6.3 5.4 0 3-.4 6-1 8.8-.9-.6-1.8-1.7-2.3-3-.6-1.5-.7-3.1-.4-4.8.5-2.2 1.9-4.7 3.4-6.4zm.4 17.5V10.2c.7-2.4 1.4-5 1.7-7.6 1.4 1.7 2.6 4.1 3.1 6.2.4 1.7.3 3.3-.3 4.8-.5 1.3-1.4 2.4-2.3 3-.7-.7-1.5-1.5-2.2-2.4v5.6z" />
          </svg>
        );
      case "postgres":
        return (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M12 2a9 9 0 0 0-9 9c0 3.4 1.9 6.4 4.7 7.9L7 22l3.4-1.2A8.96 8.96 0 0 0 12 20a9 9 0 0 0 9-9 9 9 0 0 0-9-9zm0 2.5c3.6 0 6.5 2.9 6.5 6.5s-2.9 6.5-6.5 6.5a6.5 6.5 0 0 1-3.2-.8l-.5-.3-2 .7.7-1.9-.3-.5A6.47 6.47 0 0 1 5.5 11c0-3.6 2.9-6.5 6.5-6.5z" />
            <circle cx="10" cy="10" r="1.2" />
            <circle cx="14" cy="10" r="1.2" />
          </svg>
        );
      case "aws":
        return (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M6.5 12.8c-.5.3-1.2.5-1.9.5-1.5 0-2.4-.9-2.4-2.2 0-1.4.9-2.2 2.4-2.2.7 0 1.4.2 1.9.5v.9c-.5-.3-1.1-.5-1.8-.5-.8 0-1.4.5-1.4 1.3 0 .8.5 1.3 1.4 1.3.7 0 1.3-.2 1.8-.5v.9zm4.2-3.8h-1.1l-1.3 4.8h1.1l.3-1.2h1.6l.3 1.2h1.1l-1.3-4.8h-.7zm-.9 2.7l.6-2.4.6 2.4h-1.2zm6.6-2.7l-1 3.5-.9-3.5h-1l-.9 3.5-1-3.5h-1.1l1.5 4.8h1l.9-3.2.9 3.2h1l1.5-4.8h-.9zm4.4 3.7c-.4-.3-.8-.4-1.2-.5-.4-.1-.7-.2-.7-.5 0-.3.2-.5.6-.5.4 0 .8.1 1.2.3l.4-.8c-.5-.3-1-.4-1.6-.4-1 0-1.7.6-1.7 1.4 0 .7.4 1.1 1.2 1.3.4.1.8.2 1.1.3.3.1.5.3.5.6 0 .4-.3.6-.8.6-.5 0-1.1-.2-1.5-.5l-.4.8c.5.4 1.2.6 1.9.6 1.1 0 1.8-.6 1.8-1.5 0-.7-.4-1.2-1.2-1.4z" />
            <path d="M19.2 16.8c-3.5 2.1-8.2 2.1-11.8.3-.3-.2-.7.2-.4.5 3.7 2.2 8.7 2.1 12.5-.2.4-.3.2-.8-.3-.6zm1.1-.6c-.2-.4-1.5-.3-2.3-.2-.2 0-.2.2 0 .3.5.3 1.1.6 1.7.7.2 0 .4-.1.4-.3.1-.2.2-.4.2-.5z" />
          </svg>
        );
      case "docker":
        return (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M13 6.5h2.2v2.2H13V6.5zm-3 0h2.2v2.2H10V6.5zm-3 0h2.2v2.2H7V6.5zm6 3h2.2v2.2H13V9.5zm-3 0h2.2v2.2H10V9.5zm-3 0h2.2v2.2H7V9.5zm-3 0H6.2v2.2H4V9.5zm17.5 1.8c-.3-.2-1.4-.4-2.1.1-.3.2-.6.6-.8 1-.6-.1-1.3 0-1.8.3-.3-.4-.7-.8-1.2-1.1-.2-.1-.4-.2-.6-.3l-.4.8c.2.1.4.2.6.3.6.4.9 1 1 1.6-.5.4-1.2.6-1.8.6H3c-.6 0-1 .4-1 1 0 3.3 2.5 6 6.5 6 4.8 0 8.5-2.8 9.8-7.5.8.1 1.7-.1 2.2-.6.3-.3.6-.8.6-1.3-.2 0-.4-.1-.6-.2z" />
          </svg>
        );
      case "microservices":
        return <Network className="w-4 h-4" />;
      case "eventdriven":
        return <Radio className="w-4 h-4" />;
      case "ai":
        return <Cpu className="w-4 h-4" />;
      case "systemarch":
        return <Binary className="w-4 h-4" />;
      case "auth":
        return <ShieldCheck className="w-4 h-4" />;
      default:
        return <Code2 className="w-4 h-4" />;
    }
  };

  return (
    <group ref={groupRef}>
      {techCards.map((card) => {
        const dist = Math.abs(currentZ - card.z);
        const opacity = dist > 42 ? 0 : Math.max(0, 1 - dist / 35);
        if (opacity <= 0.01) return null;

        const isHovered = hoveredSkillId === card.id;

        return (
          <group
            key={card.id}
            position={[card.x, card.y, card.z]}
            rotation={[0, card.rotY, 0]}
          >
            {/* 3D Floating Base Node in Icon Color */}
            <mesh position={[0, -0.6, 0]}>
              <octahedronGeometry args={[0.15]} />
              <meshStandardMaterial
                color={card.iconColor}
                emissive={card.iconColor}
                emissiveIntensity={2.5}
                wireframe
              />
            </mesh>

            {/* Ultra-Transparent Holographic Tech Pill Card */}
            <Html
              transform
              distanceFactor={5.2}
              position={[0, 0, 0]}
              style={{
                opacity: isModalOpen ? 0 : opacity,
                transition: "opacity 0.25s ease-out, transform 0.25s ease-out",
                pointerEvents: isModalOpen || opacity <= 0.3 ? "none" : "auto",
                transform: isHovered
                  ? `scale(${card.scale * 1.12})`
                  : `scale(${card.scale})`,
              }}
            >
              <div
                onMouseEnter={() => setHoveredSkillId(card.id)}
                onMouseLeave={() => setHoveredSkillId(null)}
                className={`px-4 py-2.5 rounded-xl transition-all duration-300 backdrop-blur-2xl relative cursor-pointer select-none whitespace-nowrap flex items-center gap-3 ${
                  isHovered
                    ? "bg-[#081836]/60 border-2 shadow-[0_0_25px_rgba(34,211,238,0.7)]"
                    : card.isPrimary
                    ? "bg-[#060F22]/40 border border-[#22D3EE]/50 shadow-[0_8px_25px_rgba(0,0,0,0.6),0_0_12px_rgba(34,211,238,0.3)]"
                    : "bg-[#060F22]/35 border border-[#168BFF]/35 shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
                }`}
                style={{
                  borderColor: isHovered ? card.iconColor : undefined,
                  boxShadow: isHovered ? `0 0 25px ${card.iconColor}66` : undefined,
                }}
              >
                {/* Individualized Distinct Color Icon Container */}
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: `${card.iconColor}22`,
                    border: `1px solid ${card.iconColor}66`,
                    color: card.iconColor,
                    boxShadow: `0 0 12px ${card.iconColor}55`,
                  }}
                >
                  {renderIcon(card.iconName)}
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold font-orbitron text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.85)]">
                      {card.name}
                    </span>
                    {card.isPrimary && (
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{
                          backgroundColor: card.iconColor,
                          boxShadow: `0 0 6px ${card.iconColor}`,
                        }}
                      />
                    )}
                  </div>
                  <span
                    className="text-[10px] font-mono font-semibold uppercase tracking-wider block"
                    style={{
                      color: card.iconColor,
                      textShadow: `0 0 8px ${card.iconColor}88`,
                    }}
                  >
                    {card.category}
                  </span>
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
