"use client";

interface NeonCardBordersProps {
  rounded?: "2xl" | "3xl";
  className?: string;
}

/**
 * Pure SVG Stroke Neon Blue Corner Edges:
 * Compact, subtle neon laser accents that hug just the corners of the card.
 * Tight coverage along horizontal and vertical edges without sprawling into the middle.
 */
export function NeonCardBorders({
  rounded = "2xl",
  className = "",
}: NeonCardBordersProps) {
  const is3xl = rounded === "3xl";
  const size = is3xl ? 36 : 28;
  const radius = is3xl ? 18 : 13;
  const svgClass = is3xl
    ? "w-7 h-7 sm:w-8 sm:h-8"
    : "w-6 h-6 sm:w-7 sm:h-7";

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-visible ${className}`}>
      {/* 1. TOP-LEFT CORNER */}
      <svg
        className={`absolute -top-[1px] -left-[1px] ${svgClass} overflow-visible pointer-events-none`}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={`M 1.5 ${size} L 1.5 ${radius + 1.5} A ${radius} ${radius} 0 0 1 ${radius + 1.5} 1.5 L ${size} 1.5`}
          stroke="#00D2FF"
          strokeWidth="2"
          strokeLinecap="round"
          className="drop-shadow-[0_0_4px_#00D2FF] drop-shadow-[0_0_8px_rgba(0,210,255,0.8)]"
        />
      </svg>

      {/* 2. TOP-RIGHT CORNER */}
      <svg
        className={`absolute -top-[1px] -right-[1px] ${svgClass} overflow-visible pointer-events-none`}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={`M ${size - 1.5} ${size} L ${size - 1.5} ${radius + 1.5} A ${radius} ${radius} 0 0 0 ${size - radius - 1.5} 1.5 L 0 1.5`}
          stroke="#00D2FF"
          strokeWidth="2"
          strokeLinecap="round"
          className="drop-shadow-[0_0_4px_#00D2FF] drop-shadow-[0_0_8px_rgba(0,210,255,0.8)]"
        />
      </svg>

      {/* 3. BOTTOM-LEFT CORNER */}
      <svg
        className={`absolute -bottom-[1px] -left-[1px] ${svgClass} overflow-visible pointer-events-none`}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={`M 1.5 0 L 1.5 ${size - radius - 1.5} A ${radius} ${radius} 0 0 0 ${radius + 1.5} ${size - 1.5} L ${size} ${size - 1.5}`}
          stroke="#00D2FF"
          strokeWidth="2"
          strokeLinecap="round"
          className="drop-shadow-[0_0_4px_#00D2FF] drop-shadow-[0_0_8px_rgba(0,210,255,0.8)]"
        />
      </svg>

      {/* 4. BOTTOM-RIGHT CORNER */}
      <svg
        className={`absolute -bottom-[1px] -right-[1px] ${svgClass} overflow-visible pointer-events-none`}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={`M ${size - 1.5} 0 L ${size - 1.5} ${size - radius - 1.5} A ${radius} ${radius} 0 0 1 ${size - radius - 1.5} ${size - 1.5} L 0 ${size - 1.5}`}
          stroke="#00D2FF"
          strokeWidth="2"
          strokeLinecap="round"
          className="drop-shadow-[0_0_4px_#00D2FF] drop-shadow-[0_0_8px_rgba(0,210,255,0.8)]"
        />
      </svg>
    </div>
  );
}
