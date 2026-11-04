"use client";

import { useMemo, useState, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import {
  Calendar,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Feather,
  ArrowRight,
} from "lucide-react";
import { mediumConfig } from "@/data/mediumConfig";
import mediumPostsData from "@/data/medium-posts.json";
import { MediumArticle } from "@/types/portfolio";
import { NeonCardBorders } from "@/components/ui/NeonCardBorders";

interface Scene6ArticlesProps {
  currentZ: number;
  isModalOpen?: boolean;
}

const CATEGORIES = [
  "All Posts",
  "Engineering",
  "Open Source",
  "Career",
  "Tech Insights",
  "AI / ML",
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
function resolveAsset(url: string) {
  if (url.startsWith("/")) {
    return `${basePath}${url}`;
  }
  return url;
}

export function Scene6Articles({ currentZ, isModalOpen }: Scene6ArticlesProps) {
  const { size, viewport } = useThree();
  const isMobile = size.width < 768 || viewport.aspect < 1.0;

  const zPos = -375;
  const dist = Math.abs(currentZ - zPos);

  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [startIndex, setStartIndex] = useState(0);
  const roadEmblemRef = useRef<THREE.Group>(null);

  const opacity = useMemo(() => {
    if (dist > 52) return 0;
    return Math.max(0, 1 - dist / 44);
  }, [dist]);

  // Subtle rotation of road holographic emblem
  useFrame((state) => {
    if (roadEmblemRef.current) {
      roadEmblemRef.current.rotation.z = state.clock.getElapsedTime() * 0.25;
    }
  });

  const articles = useMemo(() => {
    return mediumPostsData as MediumArticle[];
  }, []);

  const filteredArticles = useMemo(() => {
    if (activeCategory === "All Posts") return articles;
    return articles.filter((art) =>
      art.categories?.some(
        (cat) => cat.toLowerCase() === activeCategory.toLowerCase()
      )
    );
  }, [articles, activeCategory]);

  // Responsive items per page: show 1 on mobile, 4 on desktop
  const itemsPerPage = isMobile ? 1 : 4;
  const maxStartIndex = Math.max(0, filteredArticles.length - itemsPerPage);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStartIndex((prev) => Math.min(maxStartIndex, prev + 1));
  };

  const displayedArticles = useMemo(() => {
    return filteredArticles.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredArticles, startIndex, itemsPerPage]);

  if (opacity <= 0.01) return null;

  return (
    <group position={[0, 2.3, zPos]}>
      {/* 3D Holographic Medium Emblem on the Highway Road Surface */}
      <group position={[0, -2.25, 2.2]} rotation={[-Math.PI / 2, 0, 0]}>
        {/* Outer Pulsing Ring */}
        <mesh>
          <ringGeometry args={[2.8, 2.88, 64]} />
          <meshStandardMaterial
            color="#22D3EE"
            emissive="#22D3EE"
            emissiveIntensity={opacity * 3.2}
            side={THREE.DoubleSide}
            transparent
            opacity={opacity * 0.9}
          />
        </mesh>

        {/* Middle Violet Ring */}
        <mesh>
          <ringGeometry args={[2.2, 2.26, 64]} />
          <meshStandardMaterial
            color="#925CFF"
            emissive="#925CFF"
            emissiveIntensity={opacity * 2.8}
            side={THREE.DoubleSide}
            transparent
            opacity={opacity * 0.85}
          />
        </mesh>

        {/* Inner Electric Blue Ring */}
        <mesh>
          <ringGeometry args={[1.5, 1.55, 64]} />
          <meshStandardMaterial
            color="#168BFF"
            emissive="#168BFF"
            emissiveIntensity={opacity * 3.5}
            side={THREE.DoubleSide}
            transparent
            opacity={opacity * 0.9}
          />
        </mesh>

        {/* Dark Reflective Hologram Base Pedestal */}
        <mesh position={[0, 0, -0.01]}>
          <circleGeometry args={[1.4, 48]} />
          <meshStandardMaterial
            color="#071122"
            emissive="#081426"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Slowly rotating futuristic crosshair ring */}
        <group ref={roadEmblemRef}>
          <mesh>
            <ringGeometry args={[1.0, 1.04, 32]} />
            <meshStandardMaterial
              color="#FF36B7"
              emissive="#FF36B7"
              emissiveIntensity={opacity * 2.5}
              side={THREE.DoubleSide}
              transparent
              opacity={opacity * 0.8}
            />
          </mesh>
          {/* 4 tick notches */}
          {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, idx) => (
            <mesh
              key={idx}
              position={[Math.cos(angle) * 1.25, Math.sin(angle) * 1.25, 0]}
              rotation={[0, 0, angle]}
            >
              <planeGeometry args={[0.08, 0.28]} />
              <meshStandardMaterial
                color="#22D3EE"
                emissive="#22D3EE"
                emissiveIntensity={3}
                side={THREE.DoubleSide}
              />
            </mesh>
          ))}
        </group>
      </group>

      {/* Main Glassmorphic Showcase Canvas */}
      <Html
        transform
        distanceFactor={isMobile ? 5.6 : 6.2}
        position={[0, 0.1, 0]}
        style={{
          opacity,
          transition: "opacity 0.25s ease-out",
          pointerEvents: isModalOpen ? "none" : "auto",
        }}
      >
        <div className={`relative px-4 sm:px-6 select-none flex flex-col items-center ${isMobile ? "w-[95vw] max-w-[420px]" : "w-[1220px] max-w-[95vw]"}`}>
          {/* Far Left Side Vertical Badge: "MEDIUM POSTS" (Desktop only) */}
          {!isMobile && (
            <div className="hidden xl:flex absolute -left-12 top-1/2 -translate-y-1/2 flex-col items-center gap-3 select-none">
              <div className="w-9 h-9 rounded-xl bg-[#071122]/80 border border-[#22D3EE]/40 flex items-center justify-center backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.25)]">
                <BookOpen className="w-4 h-4 text-[#22D3EE]" />
              </div>
              <span
                className="font-orbitron font-bold text-[11px] text-[#22D3EE] tracking-[0.3em] uppercase opacity-75"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                MEDIUM POSTS
              </span>
            </div>
          )}

          {/* Top Section Header */}
          <div className="w-full flex flex-col items-center mb-3 sm:mb-4">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#925CFF]/15 border border-[#925CFF]/35 backdrop-blur-md mb-2 shadow-[0_0_14px_rgba(146,92,255,0.25)]">
              <Sparkles className="w-3.5 h-3.5 text-[#B58AFF]" />
              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#B58AFF] font-bold">
                MEDIUM WRITINGS
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-orbitron tracking-wider text-white drop-shadow-[0_0_24px_rgba(34,211,238,0.45)] text-center">
              ARTICLES &amp; INSIGHTS
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-base text-[#C4D2E8] max-w-xl mx-auto mt-1 font-light leading-relaxed text-center px-2">
              Thoughts, tutorials and deep dives on technology, development and software architecture.
            </p>

            {/* Neon Divider */}
            <div className="flex items-center justify-center gap-3 my-2.5">
              <div className="w-16 sm:w-24 h-[1.5px] bg-gradient-to-r from-transparent to-[#22D3EE]/80" />
              <div className="w-2 h-2 rounded-full bg-[#22D3EE] shadow-[0_0_8px_#22D3EE]" />
              <div className="w-16 sm:w-24 h-[1.5px] bg-gradient-to-l from-transparent to-[#22D3EE]/80" />
            </div>

            {/* View all on Medium button: inline on mobile, absolute on desktop */}
            <div className={isMobile ? "mt-1 mb-2" : "absolute right-6 top-2"}>
              <a
                href={mediumConfig.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#071122]/60 hover:bg-[#071122]/90 border border-[#925CFF]/40 hover:border-[#FF36B7]/80 backdrop-blur-xl transition-all duration-300 shadow-[0_0_15px_rgba(146,92,255,0.2)] hover:shadow-[0_0_22px_rgba(255,54,183,0.35)] cursor-pointer text-xs"
              >
                <span className="text-[11px] sm:text-xs font-mono font-medium text-white/90 group-hover:text-white transition-colors">
                  View all on Medium
                </span>
                <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-white/10 group-hover:bg-[#FF36B7]/20 flex items-center justify-center text-[10px] sm:text-[11px] font-black font-serif text-white transition-colors">
                  M
                </span>
                <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#B58AFF] group-hover:text-[#FF36B7] transition-colors" />
              </a>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap mb-4 sm:mb-6 max-w-[92vw]">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCategory(cat);
                    setStartIndex(0);
                  }}
                  className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-[#FF36B7]/25 via-[#925CFF]/25 to-[#168BFF]/25 border-2 border-[#FF36B7] text-white shadow-[0_0_18px_rgba(255,54,183,0.45)] font-bold scale-105"
                      : "bg-[#071122]/50 hover:bg-[#071122]/80 border border-[#168BFF]/30 hover:border-[#22D3EE]/70 text-[#C4D2E8] hover:text-white backdrop-blur-md"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Horizontal Articles Showcase with Carousel Navigation */}
          <div className="relative w-full flex justify-center">
            {/* Left Carousel Arrow */}
            {startIndex > 0 && (
              <button
                onClick={handlePrev}
                aria-label="Previous articles"
                className={`absolute top-1/2 -translate-y-1/2 z-20 rounded-full bg-[#071122]/90 border border-[#22D3EE]/60 hover:border-[#22D3EE] text-[#22D3EE] hover:text-white flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)] backdrop-blur-xl transition-all duration-300 hover:scale-110 cursor-pointer ${
                  isMobile ? "-left-3 w-9 h-9" : "-left-5 w-11 h-11"
                }`}
              >
                <ChevronLeft className={isMobile ? "w-5 h-5" : "w-6 h-6"} />
              </button>
            )}

            {/* Right Carousel Arrow */}
            {startIndex < maxStartIndex && (
              <button
                onClick={handleNext}
                aria-label="Next articles"
                className={`absolute top-1/2 -translate-y-1/2 z-20 rounded-full bg-[#071122]/90 border border-[#925CFF]/60 hover:border-[#FF36B7] text-[#B58AFF] hover:text-white flex items-center justify-center shadow-[0_0_20px_rgba(146,92,255,0.4)] backdrop-blur-xl transition-all duration-300 hover:scale-110 cursor-pointer ${
                  isMobile ? "-right-3 w-9 h-9" : "-right-5 w-11 h-11"
                }`}
              >
                <ChevronRight className={isMobile ? "w-5 h-5" : "w-6 h-6"} />
              </button>
            )}

            {/* Cards Grid: 4 in a row on desktop */}
            {displayedArticles.length === 0 ? (
              <div className="w-full py-16 text-center rounded-2xl bg-[#071122]/40 border border-[#168BFF]/20 backdrop-blur-xl">
                <p className="text-sm font-mono text-[#C4D2E8]">
                  No articles found in this category yet.
                </p>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center">
                <div className={isMobile ? "flex justify-center w-full" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 w-full"}>
                  {displayedArticles.map((article, idx) => {
                    // Accent themes: pink, blue, violet, cyan
                    const accent = article.accentColor || ["pink", "blue", "violet", "cyan"][idx % 4];

                    const borderClasses = {
                      pink: "border-[#FF36B7]/50 hover:border-[#FF36B7] shadow-[0_0_18px_rgba(255,54,183,0.18)] hover:shadow-[0_0_28px_rgba(255,54,183,0.42)]",
                      blue: "border-[#168BFF]/50 hover:border-[#168BFF] shadow-[0_0_18px_rgba(22,139,255,0.18)] hover:shadow-[0_0_28px_rgba(22,139,255,0.42)]",
                      violet: "border-[#925CFF]/50 hover:border-[#925CFF] shadow-[0_0_18px_rgba(146,92,255,0.18)] hover:shadow-[0_0_28px_rgba(146,92,255,0.42)]",
                      cyan: "border-[#22D3EE]/50 hover:border-[#22D3EE] shadow-[0_0_18px_rgba(34,211,238,0.18)] hover:shadow-[0_0_28px_rgba(34,211,238,0.42)]",
                    }[accent];

                    const linkColorClasses = {
                      pink: "text-[#FF36B7] group-hover:text-white",
                      blue: "text-[#168BFF] group-hover:text-white",
                      violet: "text-[#B58AFF] group-hover:text-white",
                      cyan: "text-[#22D3EE] group-hover:text-white",
                    }[accent];

                    return (
                      <a
                        key={article.id || idx}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group relative flex flex-col justify-between rounded-2xl p-4 bg-[#071122]/65 hover:bg-[#071122]/85 border backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer select-none overflow-visible ${
                          isMobile ? "w-[85vw] max-w-[325px]" : "w-full"
                        } ${borderClasses}`}
                      >
                        {/* Shiny Neon Blue Corner Edges covering vertical and horizontal portions */}
                        <NeonCardBorders rounded="2xl" />
                        {/* Top Metadata: Date & Read Time */}
                        <div className="flex items-center justify-between text-[11px] font-mono text-[#C4D2E8]/80 mb-3">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#168BFF]" />
                            <span>{article.publishedAt}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#22D3EE]" />
                            <span>{article.readTime}</span>
                          </div>
                        </div>

                        {/* Thumbnail Image / Tech Illustration */}
                        <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3.5 bg-[#03060D] border border-white/10">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={resolveAsset(article.image)}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#071122] via-transparent to-transparent opacity-60" />
                        </div>

                      {/* Title */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-orbitron font-bold text-sm text-white group-hover:text-[#22D3EE] transition-colors line-clamp-2 leading-snug mb-2">
                            {article.title}
                          </h3>

                          {/* Short Description */}
                          <p className="text-xs text-[#C4D2E8] line-clamp-3 leading-relaxed mb-3 font-light">
                            {article.description}
                          </p>
                        </div>

                        <div>
                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 mb-3.5">
                            {article.tags?.slice(0, 3).map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#168BFF]/10 border border-[#168BFF]/25 text-[#C4D2E8]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Read More Link */}
                          <div
                            className={`flex items-center gap-1.5 text-xs font-mono font-bold transition-colors ${linkColorClasses}`}
                          >
                            <span>Read more</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
              {isMobile && filteredArticles.length > 1 && (
                <div className="flex items-center justify-center gap-1.5 mt-3 text-xs font-mono text-[#00D2FF]">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#00D2FF]/15 border border-[#00D2FF]/40 font-bold">
                    {startIndex + 1} / {filteredArticles.length}
                  </span>
                </div>
              )}
            </div>
            )}
          </div>

          {/* Bottom Glass Call-to-Action Panel */}
          <div className="w-full mt-7 rounded-2xl p-4 md:px-7 md:py-4 bg-[#071122]/65 hover:bg-[#071122]/80 border border-gradient-to-r border-[#925CFF]/45 hover:border-[#FF36B7]/70 backdrop-blur-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_24px_rgba(146,92,255,0.2)] transition-all">
            {/* Left side: glowing feather / quill badge + statement */}
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-[#168BFF]/15 border border-[#22D3EE]/50 flex items-center justify-center shadow-[0_0_12px_rgba(34,211,238,0.35)] shrink-0">
                <Feather className="w-4 h-4 text-[#22D3EE]" />
              </div>
              <p className="text-xs md:text-sm text-[#F4F8FF] font-light">
                I write about technology, development, and building things that make an impact.
              </p>
            </div>

            {/* Right side: Button to explore all articles */}
            <a
              href={mediumConfig.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#168BFF]/20 via-[#925CFF]/20 to-[#FF36B7]/20 hover:from-[#168BFF]/35 hover:via-[#925CFF]/35 hover:to-[#FF36B7]/35 border border-[#FF36B7]/50 hover:border-[#FF36B7] text-white text-xs font-mono font-bold tracking-wider backdrop-blur-xl transition-all duration-300 shadow-[0_0_16px_rgba(255,54,183,0.25)] hover:shadow-[0_0_24px_rgba(255,54,183,0.45)] shrink-0 cursor-pointer"
            >
              <span>Explore all my articles on Medium</span>
              <ArrowRight className="w-4 h-4 text-[#FF36B7] group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </Html>
    </group>
  );
}

