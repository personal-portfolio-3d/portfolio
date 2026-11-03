"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1400; // Atmospheric dust particles

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const cBlue = new THREE.Color("#168BFF");
    const cCyan = new THREE.Color("#22D3EE");
    const cViolet = new THREE.Color("#6D45E8");

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 65; // X
      pos[i * 3 + 1] = 0.5 + Math.random() * 26; // Y
      pos[i * 3 + 2] = 25 - Math.random() * 500; // Z

      // 70% Electric Blue, 20% Cyan, 10% Violet
      const r = Math.random();
      const chosenColor = r < 0.7 ? cBlue : r < 0.9 ? cCyan : cViolet;
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const geom = pointsRef.current.geometry;
    const posAttr = geom.attributes.position;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      array[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.004;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.22}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
