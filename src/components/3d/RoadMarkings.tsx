"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface RoadMarkingsProps {
  velocity?: number;
}

export function RoadMarkings({ velocity = 0 }: RoadMarkingsProps) {
  const pinkMeshRef = useRef<THREE.InstancedMesh>(null);
  const blueMeshRef = useRef<THREE.InstancedMesh>(null);

  const totalDashes = 128;
  const setSize = 16; // At least 15+ dashes of the exact same color in a row
  const halfCount = totalDashes / 2; // 64 pink, 64 blue
  const spacing = 5.5; // Distance between dashes

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    let pinkIdx = 0;
    let blueIdx = 0;

    for (let i = 0; i < totalDashes; i++) {
      const zPos = 20 - i * spacing;
      dummy.position.set(0, 0.03, zPos);
      dummy.scale.set(0.10, 0.01, 2.4); // Slim, sleek profile
      dummy.updateMatrix();

      // Long sets: 16 consecutive Blue dashes, then 16 consecutive Pink dashes
      const isBlue = Math.floor(i / setSize) % 2 === 0;

      if (isBlue) {
        if (blueMeshRef.current && blueIdx < halfCount) {
          blueMeshRef.current.setMatrixAt(blueIdx, dummy.matrix);
          blueIdx++;
        }
      } else {
        if (pinkMeshRef.current && pinkIdx < halfCount) {
          pinkMeshRef.current.setMatrixAt(pinkIdx, dummy.matrix);
          pinkIdx++;
        }
      }
    }

    if (blueMeshRef.current) blueMeshRef.current.instanceMatrix.needsUpdate = true;
    if (pinkMeshRef.current) pinkMeshRef.current.instanceMatrix.needsUpdate = true;
  });

  const dynamicEmissive = 3.6 + Math.min(velocity * 0.05, 3.2);

  return (
    <group>
      {/* 1. Sets of 16+ Slim Electric Neon Blue Divider Dashes */}
      <instancedMesh
        ref={blueMeshRef}
        args={[undefined, undefined, halfCount]}
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

      {/* 2. Sets of 16+ Slim Hot Neon Pink Divider Dashes */}
      <instancedMesh
        ref={pinkMeshRef}
        args={[undefined, undefined, halfCount]}
        frustumCulled={false}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#FF007F"
          emissive="#FF007F"
          emissiveIntensity={dynamicEmissive}
          roughness={0.15}
          toneMapped={false}
        />
      </instancedMesh>
    </group>
  );
}
