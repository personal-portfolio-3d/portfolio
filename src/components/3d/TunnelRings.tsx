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
      // Distant highway arches extending deep into the horizon past Contact
      -675, -695, -720, -750, -785, -825, -870, -920, -975, -1035, -1100, -1170, -1250, -1340,
    ],
    []
  );

  return (
    <group>
      {portalZPositions.map((z, index) => {
        const isExitPortal = z >= -665 && z <= -635;
        const radius = isExitPortal ? 7.6 + (index % 4) * 0.4 : 7.2;

        // 70% Electric Blue, 20% Cyan, 10% Violet
        const color =
          index % 8 === 7
            ? "#6D45E8"
            : index % 4 === 1
            ? "#22D3EE"
            : "#168BFF";

        return (
          <group key={z} position={[0, 4.4, z]}>
            {/* Clean Arch (NO vertical ground poles) */}
            <mesh>
              <torusGeometry args={[radius, 0.09, 16, 48, Math.PI]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={isExitPortal ? 3.8 : 2.5}
                roughness={0.15}
              />
            </mesh>

            {/* Subtle Inner Accent Glow */}
            {(isExitPortal || (z < -665 && index % 3 === 0)) && (
              <mesh position={[0, 0, 0.15]}>
                <torusGeometry args={[radius - 0.55, 0.05, 16, 48, Math.PI]} />
                <meshStandardMaterial
                  color="#22D3EE"
                  emissive="#22D3EE"
                  emissiveIntensity={3}
                  roughness={0.2}
                />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}
