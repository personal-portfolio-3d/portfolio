"use client";

import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";

interface HighwayTilesProps {
  roadLength?: number;
  roadCenterZ?: number;
}

export function HighwayTiles({
  roadLength = 1500,
  roadCenterZ = -600,
}: HighwayTilesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Smaller paver dimensions for a tangible, authentic street pavement feel
  const tileWidth = 0.98; // ~1 meter wide paver
  const tileLength = 1.55; // 1.55 meters long
  const seamGap = 0.08; // 8cm recessed groove between tiles
  const stepZ = tileLength + seamGap; // 1.63m step per row
  const tileHeight = 0.028; // 2.8cm paver thickness

  const startZ = roadCenterZ + roadLength / 2 - 2; // ~Z = +63
  const endZ = roadCenterZ - roadLength / 2 + 2; // ~Z = -613
  const numRows = Math.floor((startZ - endZ) / stepZ);

  // 10 columns of tiles across the 11m highway width
  const columnsX = useMemo(
    () => [-4.72, -3.67, -2.62, -1.57, -0.52, 0.52, 1.57, 2.62, 3.67, 4.72],
    []
  );

  const totalTiles = numRows * columnsX.length;

  // Procedural micro-grain bump & roughness texture for genuine stone/asphalt tactile grit
  const bumpTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Midtone neutral base
    ctx.fillStyle = "#808080";
    ctx.fillRect(0, 0, 512, 512);

    const imgData = ctx.getImageData(0, 0, 512, 512);
    const data = imgData.data;

    let seed = 98765;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    // Synthesize fine asphalt grit + micro-stone speckle
    for (let i = 0; i < data.length; i += 4) {
      const fineGrit = (rand() - 0.5) * 55;
      const stoneSpeckle = (rand() - 0.5) * 35;
      const noise = fineGrit + stoneSpeckle;
      const val = Math.min(255, Math.max(0, 128 + noise));
      data[i] = val;
      data[i + 1] = val;
      data[i + 2] = val;
      data[i + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1.5, 2.5);
    return texture;
  }, []);

  useEffect(() => {
    if (!meshRef.current) return;

    const dummy = new THREE.Object3D();
    const colorObj = new THREE.Color();

    // Natural obsidian / dark wet basalt paver shades
    const tileShades = [
      "#080e1c", // Polished Graphite
      "#0b1426", // Midnight Basalt
      "#0e1930", // Slate Cyber Paver
      "#070c18", // Dark Charcoal
      "#0a1222", // Deep River Stone
      "#060a14", // Shadowed Basalt
    ];

    let idx = 0;
    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < columnsX.length; c++) {
        const x = columnsX[c];
        // Stagger alternate columns by half a tile for realistic masonry running bond
        const isStaggered = c % 2 === 1;
        const z = startZ - r * stepZ - (isStaggered ? stepZ * 0.5 : 0);

        // Subtle micro-height variation (±1.5mm) so tiles feel individually laid
        const microY = tileHeight / 2 + 0.005 + ((r * 3 + c * 7) % 5) * 0.001;

        dummy.position.set(x, microY, z);
        dummy.scale.set(tileWidth, tileHeight, tileLength);

        // Microscopic tilt variation across pavers to catch reflections organically
        const tiltX = (((r * 5 + c * 3) % 7) - 3) * 0.0008;
        const tiltZ = (((r * 3 + c * 5) % 7) - 3) * 0.0008;
        dummy.rotation.set(tiltX, 0, tiltZ);

        dummy.updateMatrix();
        meshRef.current.setMatrixAt(idx, dummy.matrix);

        // Individual tile shade variation
        const shadeIndex = (r * 3 + c * 5) % tileShades.length;
        colorObj.set(tileShades[shadeIndex]);
        meshRef.current.setColorAt(idx, colorObj);

        idx++;
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [numRows, startZ, stepZ, columnsX, tileHeight, tileLength, tileWidth]);

  return (
    <group>
      {/* 4,000+ Smaller Rough & Glossy Obsidian Paver Tiles */}
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, totalTiles]}
        receiveShadow
        frustumCulled={false}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#080e1c"
          roughness={0.44} // Diffused tactile texture, no harsh glare
          metalness={0.62} // Subtle specular response to ambient cyber lights
          bumpMap={bumpTexture || undefined}
          bumpScale={0.045} // Tactile micro-grain surface relief
          roughnessMap={bumpTexture || undefined}
          envMapIntensity={1.3}
        />
      </instancedMesh>

      {/* Recessed Cyber Foundation Seams (Glowing softly in deep blue/cyan in the grooves) */}
      <mesh position={[-3.15, 0.006, roadCenterZ]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.04, roadLength]} />
        <meshStandardMaterial
          color="#0A182E"
          emissive="#168BFF"
          emissiveIntensity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[3.15, 0.006, roadCenterZ]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.04, roadLength]} />
        <meshStandardMaterial
          color="#0A182E"
          emissive="#168BFF"
          emissiveIntensity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
