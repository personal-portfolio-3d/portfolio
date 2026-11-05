"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface RoadMarkingsProps {
  velocity?: number;
}

export function RoadMarkings({ velocity = 0 }: RoadMarkingsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const totalDashes = 300;
  const spacing = 5.5; // Distance between dashes

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    if (!meshRef.current) return;

    for (let i = 0; i < totalDashes; i++) {
      const zPos = 20 - i * spacing;
      dummy.position.set(0, 0.056, zPos);
      dummy.scale.set(0.11, 0.012, 2.4); // Slim, sleek profile
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  const dynamicEmissive = 3.6 + Math.min(velocity * 0.05, 3.2);

  return (
    <group>
      {/* Slim Electric Neon Blue Divider Dashes */}
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, totalDashes]}
        frustumCulled={false}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#00D2FF"
          emissive="#00D2FF"
          emissiveIntensity={dynamicEmissive}
          roughness={0.15}
          toneMapped={false}
        />
      </instancedMesh>
    </group>
  );
}
