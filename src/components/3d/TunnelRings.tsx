"use client";

import { useMemo } from "react";
import * as THREE from "three";

interface TunnelRingsProps {
  velocity?: number;
}

export function TunnelRings({ velocity = 0 }: TunnelRingsProps) {
  // Portal gateway positions along the highway (NO multiple rings or poles at the start!)
  const portalZPositions = useMemo(
    () => [
      // Transition arches at section thresholds
      -45, -55,
      // Skills entrance
      -115, -125,
      // Projects portal
      -185, -195,
      // Experience timeline arch
      -342, -352,
      // Medium Articles entrance
      -442, -452,
      // Achievements & Open Source portal
      -542, -552,
      // Final destination hyper-portal (Scene 8 Contact)
      -640, -648, -654, -660,
      // Continuous highway arches extending deep past Contact
      -668, -678, -690, -705, -725, -750, -780, -815, -855, -900, -950, -1010, -1080, -1160, -1250, -1350,
    ],
    []
  );

  return (
    <group>
      {portalZPositions.map((z, index) => {
        const isExitPortal = z >= -665 && z <= -635;
        const radius = isExitPortal ? 7.6 + (index % 4) * 0.4 : 7.2;

        // 70% Electric Neon Blue, 20% Cyan, 10% Violet
        const color =
          index % 8 === 7
            ? "#6D45E8"
            : index % 4 === 1
            ? "#22D3EE"
            : "#00D2FF";

        return (
          <group key={z} position={[0, 4.4, z]}>
            {/* Clean Arch (NO vertical ground poles) */}
            <mesh>
              <torusGeometry args={[radius, 0.12, 16, 48, Math.PI]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={isExitPortal ? 4.2 : 3.2}
                roughness={0.15}
                toneMapped={false}
              />
            </mesh>

            {/* Subtle Inner Accent Glow */}
            {(isExitPortal || (z < -665 && index % 2 === 0)) && (
              <mesh position={[0, 0, 0.15]}>
                <torusGeometry args={[radius - 0.55, 0.065, 16, 48, Math.PI]} />
                <meshStandardMaterial
                  color="#22D3EE"
                  emissive="#22D3EE"
                  emissiveIntensity={3.6}
                  roughness={0.2}
                  toneMapped={false}
                />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}
