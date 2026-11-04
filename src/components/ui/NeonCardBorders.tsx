"use client";

interface NeonCardBordersProps {
  rounded?: "xl" | "2xl" | "3xl" | "full";
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Cyber Edge Brackets:
 * Shiny electric blue neon borders placed on all 4 corner edges (not in the middle).
 * Each corner edge wraps both the horizontal and vertical border portions.
 */
export function NeonCardBorders({
  rounded = "2xl",
  className = "",
  size = "md",
}: NeonCardBordersProps) {
  // Dimension scale for horizontal & vertical coverage
  const sizeClasses = {
    sm: "w-6 h-6 sm:w-8 sm:h-8",
    md: "w-8 h-8 sm:w-11 sm:h-11",
    lg: "w-10 h-10 sm:w-14 sm:h-14",
  }[size];

  // Matching radius curves to fit seamlessly against the card's outer border
  const tlRadius = {
    xl: "rounded-tl-xl",
    "2xl": "rounded-tl-2xl",
    "3xl": "rounded-tl-3xl",
    full: "rounded-tl-full",
  }[rounded];

  const trRadius = {
    xl: "rounded-tr-xl",
    "2xl": "rounded-tr-2xl",
    "3xl": "rounded-tr-3xl",
    full: "rounded-tr-full",
  }[rounded];

  const blRadius = {
    xl: "rounded-bl-xl",
    "2xl": "rounded-bl-2xl",
    "3xl": "rounded-bl-3xl",
    full: "rounded-bl-full",
  }[rounded];

  const brRadius = {
    xl: "rounded-br-xl",
    "2xl": "rounded-br-2xl",
    "3xl": "rounded-br-3xl",
    full: "rounded-br-full",
  }[rounded];

  // Radiant shiny electric blue neon border styling
  const neonGlow =
    "border-[#00D2FF] shadow-[0_0_12px_#00D2FF,0_0_24px_rgba(0,210,255,0.75),inset_0_0_8px_rgba(0,210,255,0.4)]";

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      {/* 1. TOP-LEFT EDGE: covers horizontal top & vertical left */}
      <div
        className={`absolute -top-[1.5px] -left-[1.5px] ${sizeClasses} ${tlRadius} border-t-2 border-l-2 ${neonGlow}`}
      >
        <span className="absolute -top-[2px] -left-[2px] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff,0_0_14px_#00D2FF]" />
      </div>

      {/* 2. TOP-RIGHT EDGE: covers horizontal top & vertical right */}
      <div
        className={`absolute -top-[1.5px] -right-[1.5px] ${sizeClasses} ${trRadius} border-t-2 border-r-2 ${neonGlow}`}
      >
        <span className="absolute -top-[2px] -right-[2px] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff,0_0_14px_#00D2FF]" />
      </div>

      {/* 3. BOTTOM-LEFT EDGE: covers horizontal bottom & vertical left */}
      <div
        className={`absolute -bottom-[1.5px] -left-[1.5px] ${sizeClasses} ${blRadius} border-b-2 border-l-2 ${neonGlow}`}
      >
        <span className="absolute -bottom-[2px] -left-[2px] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff,0_0_14px_#00D2FF]" />
      </div>

      {/* 4. BOTTOM-RIGHT EDGE: covers horizontal bottom & vertical right */}
      <div
        className={`absolute -bottom-[1.5px] -right-[1.5px] ${sizeClasses} ${brRadius} border-b-2 border-r-2 ${neonGlow}`}
      >
        <span className="absolute -bottom-[2px] -right-[2px] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff,0_0_14px_#00D2FF]" />
      </div>
    </div>
  );
}
