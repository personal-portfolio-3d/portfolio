"use client";

interface NeonCardBordersProps {
  color?: "cyan" | "pink" | "blue";
  className?: string;
}

export function NeonCardBorders({ color = "cyan", className = "" }: NeonCardBordersProps) {
  const colorMap = {
    cyan: {
      horiz: "via-[#22D3EE] shadow-[0_0_12px_#22D3EE,0_0_4px_#ffffff]",
      vert: "via-[#00D2FF] shadow-[0_0_12px_#00D2FF,0_0_4px_#ffffff]",
      dot: "bg-white shadow-[0_0_8px_#ffffff,0_0_14px_#22D3EE]",
    },
    pink: {
      horiz: "via-[#FF007F] shadow-[0_0_12px_#FF007F,0_0_4px_#ffffff]",
      vert: "via-[#FF007F] shadow-[0_0_12px_#FF007F,0_0_4px_#ffffff]",
      dot: "bg-white shadow-[0_0_8px_#ffffff,0_0_14px_#FF007F]",
    },
    blue: {
      horiz: "via-[#168BFF] shadow-[0_0_12px_#168BFF,0_0_4px_#ffffff]",
      vert: "via-[#168BFF] shadow-[0_0_12px_#168BFF,0_0_4px_#ffffff]",
      dot: "bg-white shadow-[0_0_8px_#ffffff,0_0_14px_#168BFF]",
    },
  };

  const scheme = colorMap[color] || colorMap.cyan;

  return (
    <div className={`pointer-events-none ${className}`}>
      {/* Top Edge Neon Segment */}
      <div className="absolute -top-[1px] left-8 sm:left-12 flex items-center justify-center">
        <span
          className={`w-16 sm:w-24 h-[2px] bg-gradient-to-r from-transparent ${scheme.horiz} to-transparent rounded-full`}
        />
        <span className={`absolute w-1 h-1 rounded-full ${scheme.dot}`} />
      </div>

      {/* Bottom Edge Neon Segment */}
      <div className="absolute -bottom-[1px] right-8 sm:right-12 flex items-center justify-center">
        <span
          className={`w-16 sm:w-24 h-[2px] bg-gradient-to-r from-transparent ${scheme.horiz} to-transparent rounded-full`}
        />
        <span className={`absolute w-1 h-1 rounded-full ${scheme.dot}`} />
      </div>

      {/* Left Edge Neon Segment */}
      <div className="absolute -left-[1px] top-8 sm:top-10 flex items-center justify-center">
        <span
          className={`h-10 sm:h-14 w-[2px] bg-gradient-to-b from-transparent ${scheme.vert} to-transparent rounded-full`}
        />
        <span className={`absolute w-1 h-1 rounded-full ${scheme.dot}`} />
      </div>

      {/* Right Edge Neon Segment */}
      <div className="absolute -right-[1px] bottom-8 sm:bottom-10 flex items-center justify-center">
        <span
          className={`h-10 sm:h-14 w-[2px] bg-gradient-to-b from-transparent ${scheme.vert} to-transparent rounded-full`}
        />
        <span className={`absolute w-1 h-1 rounded-full ${scheme.dot}`} />
      </div>
    </div>
  );
}
