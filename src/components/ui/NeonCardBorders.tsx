"use client";

interface NeonCardBordersProps {
  rounded?: "2xl" | "3xl";
  className?: string;
}

/**
 * Pure SVG Stroke Neon Blue Corner Edges:
 * Renders ONLY the 2.5px glowing electric blue neon border stroke along the card corners.
 * Absolutely fill="none" (NO background boxes, NO dark squares).
 * Each corner covers both the vertical and horizontal portions along the border edge.
 */
export function NeonCardBorders({
  rounded = "2xl",
  className = "",
}: NeonCardBordersProps) {
  const is3xl = rounded === "3xl";
  const size = is3xl ? 54 : 46;
  const radius = is3xl ? 22 : 15;

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      {/* 1. TOP-LEFT CORNER: stroke along horizontal top & vertical left */}
      <svg
        className="absolute -top-[1.5px] -left-[1.5px] w-12 h-12 sm:w-14 sm:h-14 overflow-visible pointer-events-none"
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={`M 1.5 ${size} L 1.5 ${radius + 1.5} A ${radius} ${radius} 0 0 1 ${radius + 1.5} 1.5 L ${size} 1.5`}
          stroke="#00D2FF"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="drop-shadow-[0_0_6px_#00D2FF] drop-shadow-[0_0_14px_rgba(0,210,255,0.9)]"
        />
      </svg>

      {/* 2. TOP-RIGHT CORNER: stroke along horizontal top & vertical right */}
      <svg
        className="absolute -top-[1.5px] -right-[1.5px] w-12 h-12 sm:w-14 sm:h-14 overflow-visible pointer-events-none"
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={`M ${size - 1.5} ${size} L ${size - 1.5} ${radius + 1.5} A ${radius} ${radius} 0 0 0 ${size - radius - 1.5} 1.5 L 0 1.5`}
          stroke="#00D2FF"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="drop-shadow-[0_0_6px_#00D2FF] drop-shadow-[0_0_14px_rgba(0,210,255,0.9)]"
        />
      </svg>

      {/* 3. BOTTOM-LEFT CORNER: stroke along horizontal bottom & vertical left */}
      <svg
        className="absolute -bottom-[1.5px] -left-[1.5px] w-12 h-12 sm:w-14 sm:h-14 overflow-visible pointer-events-none"
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={`M 1.5 0 L 1.5 ${size - radius - 1.5} A ${radius} ${radius} 0 0 0 ${radius + 1.5} ${size - 1.5} L ${size} ${size - 1.5}`}
          stroke="#00D2FF"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="drop-shadow-[0_0_6px_#00D2FF] drop-shadow-[0_0_14px_rgba(0,210,255,0.9)]"
        />
      </svg>

      {/* 4. BOTTOM-RIGHT CORNER: stroke along horizontal bottom & vertical right */}
      <svg
        className="absolute -bottom-[1.5px] -right-[1.5px] w-12 h-12 sm:w-14 sm:h-14 overflow-visible pointer-events-none"
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={`M ${size - 1.5} 0 L ${size - 1.5} ${size - radius - 1.5} A ${radius} ${radius} 0 0 1 ${size - radius - 1.5} ${size - 1.5} L 0 ${size - 1.5}`}
          stroke="#00D2FF"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="drop-shadow-[0_0_6px_#00D2FF] drop-shadow-[0_0_14px_rgba(0,210,255,0.9)]"
        />
      </svg>
    </div>
  );
}
