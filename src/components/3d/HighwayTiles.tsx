"use client";

import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";

interface HighwayTilesProps {
  roadLength?: number;
  roadCenterZ?: number;
}

export function HighwayTiles({
  roadLength = 680,
  roadCenterZ = -275,
}: HighwayTilesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const outerMeshRef = useRef<THREE.InstancedMesh>(null);

  // Tile dimensions
  const tileLength = 4.75; // Slabs of length 4.75m
  const seamZ = 0.25; // 0.25m groove between rows
  const stepZ = tileLength + seamZ; // 5.0m step per row
  const tileHeight = 0.035; // 3.5cm slab thickness

  const startZ = roadCenterZ + roadLength / 2 - 2; // ~Z = +63
  const endZ = roadCenterZ - roadLength / 2 + 2; // ~Z = -613
  const numRows = Math.floor((startZ - endZ) / stepZ);

  // 4 Highway Lanes (2 inner lanes + 2 outer shoulder lanes)
  const innerLanesX = useMemo(() => [-1.48, 1.48], []);
  const outerLanesX = useMemo(() => [-4.15, 4.15], []);

  const innerTileWidth = 2.55;
  const outerTileWidth = 2.35;

  const innerTotalCount = numRows * innerLanesX.length;
  const outerTotalCount = numRows * outerLanesX.length;

  useEffect(() => {
    const dummy = new THREE.Object3D();
    const colorObj = new THREE.Color();

    // Palette of subtle glossy obsidian black shades
    const shades = [
      "#020408", // Deep Obsidian Black
      "#040710", // Midnight Carbon
      "#03050C", // Jet Black
      "#050914", // Polished Basalt
    ];

    // 1. Populate Inner Lanes
    if (meshRef.current) {
      let idx = 0;
      for (let r = 0; r < numRows; r++) {
        const z = startZ - r * stepZ;
        for (let l = 0; l < innerLanesX.length; l++) {
          const x = innerLanesX[l];
          dummy.position.set(x, tileHeight / 2 + 0.005, z);
          dummy.scale.set(innerTileWidth, tileHeight, tileLength);
          dummy.updateMatrix();
          meshRef.current.setMatrixAt(idx, dummy.matrix);

          // Subtle natural variation in black tile polish
          const shadeHex = shades[(r * 2 + l) % shades.length];
          colorObj.set(shadeHex);
          meshRef.current.setColorAt(idx, colorObj);
          idx++;
        }
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
      if (meshRef.current.instanceColor) {
        meshRef.current.instanceColor.needsUpdate = true;
      }
    }

    // 2. Populate Outer Shoulder Lanes
    if (outerMeshRef.current) {
      let idx = 0;
      for (let r = 0; r < numRows; r++) {
        const z = startZ - r * stepZ;
        for (let l = 0; l < outerLanesX.length; l++) {
          const x = outerLanesX[l];
          dummy.position.set(x, tileHeight / 2 + 0.005, z);
          dummy.scale.set(outerTileWidth, tileHeight, tileLength);
          dummy.updateMatrix();
          outerMeshRef.current.setMatrixAt(idx, dummy.matrix);

          const shadeHex = shades[(r * 3 + l) % shades.length];
          colorObj.set(shadeHex);
          outerMeshRef.current.setColorAt(idx, colorObj);
          idx++;
        }
      }
      outerMeshRef.current.instanceMatrix.needsUpdate = true;
      if (outerMeshRef.current.instanceColor) {
        outerMeshRef.current.instanceColor.needsUpdate = true;
      }
    }
  }, [numRows, startZ, stepZ, innerLanesX, outerLanesX, tileHeight, tileLength, innerTileWidth, outerTileWidth]);

  return (
    <group>
      {/* 1. Inner Center Tiles (High-Gloss Obsidian Mirror Finish) */}
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, innerTotalCount]}
        receiveShadow
        frustumCulled={false}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#020408"
          roughness={0.14} // High-gloss wet shine
          metalness={0.92} // Reflects city skyline and neon bloom
          envMapIntensity={1.8}
        />
      </instancedMesh>

      {/* 2. Outer Shoulder Tiles */}
      <instancedMesh
        ref={outerMeshRef}
        args={[undefined, undefined, outerTotalCount]}
        receiveShadow
        frustumCulled={false}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#020408"
          roughness={0.18}
          metalness={0.88}
          envMapIntensity={1.5}
        />
      </instancedMesh>

      {/* 3. Subtle Cyber Seam Accent Grooves (Glowing faintly in deep navy/cyan in the seams) */}
      {/* Longitudinal Seam - Left Shoulder */}
      <mesh position={[-2.82, 0.008, roadCenterZ]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.04, roadLength]} />
        <meshStandardMaterial
          color="#0B1A30"
          emissive="#168BFF"
          emissiveIntensity={0.65}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Longitudinal Seam - Right Shoulder */}
      <mesh position={[2.82, 0.008, roadCenterZ]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.04, roadLength]} />
        <meshStandardMaterial
          color="#0B1A30"
          emissive="#168BFF"
          emissiveIntensity={0.65}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

