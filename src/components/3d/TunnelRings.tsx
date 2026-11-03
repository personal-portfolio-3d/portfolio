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
      -195, -205,
      // Experience timeline arch
      -275, -285,
      // GitHub network portal
      -345, -355,
      // Final destination hyper-portal (Scene 7)
      -425, -432, -438, -444,
    ],
    []
  );

  return (
    <group>
      {portalZPositions.map((z, index) => {
        const isExit = z <= -420;
        const radius = isExit ? 7.6 + (index % 4) * 0.4 : 7.0;

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
                emissiveIntensity={isExit ? 3.8 : 2.2}
                roughness={0.15}
              />
            </mesh>

            {/* Subtle Inner Accent Glow */}
            {isExit && (
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
