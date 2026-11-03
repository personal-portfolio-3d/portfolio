"use client";

import * as THREE from "three";
import { RoadMarkings } from "./RoadMarkings";
import { HighwayTiles } from "./HighwayTiles";

interface HighwayProps {
  velocity?: number;
}

export function Highway({ velocity = 0 }: HighwayProps) {
  const roadLength = 680;
  const roadCenterZ = -275; // Extends from Z = 65 to Z = -615

  return (
    <group>
      {/* Foundation Road Bed Surface (Underneath the tiles) */}
      <mesh
        position={[0, 0, roadCenterZ]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[11, roadLength]} />
        <meshStandardMaterial
          color="#02040A"
          roughness={0.65}
          metalness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Realistic Black Shiny Highway Tiles */}
      <HighwayTiles roadLength={roadLength} roadCenterZ={roadCenterZ} />

      {/* Shoulder Lane Guide Stripes (Left & Right) */}
      <mesh
        position={[-3.2, 0.042, roadCenterZ]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[0.07, roadLength]} />
        <meshStandardMaterial
          color="#168BFF"
          emissive="#168BFF"
          emissiveIntensity={1.8}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh
        position={[3.2, 0.042, roadCenterZ]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[0.07, roadLength]} />
        <meshStandardMaterial
          color="#168BFF"
          emissive="#168BFF"
          emissiveIntensity={1.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Glowing Neon Side Rails (Left Edge) */}
      <mesh position={[-5.5, 0.15, roadCenterZ]}>
        <boxGeometry args={[0.22, 0.28, roadLength]} />
        <meshStandardMaterial
          color="#168BFF"
          emissive="#168BFF"
          emissiveIntensity={3}
          roughness={0.1}
        />
      </mesh>
      {/* Outer Cyan Accent Glow Strip (Left) */}
      <mesh position={[-5.68, 0.08, roadCenterZ]}>
        <boxGeometry args={[0.12, 0.12, roadLength]} />
        <meshStandardMaterial
          color="#22D3EE"
          emissive="#22D3EE"
          emissiveIntensity={2.5}
          roughness={0.2}
        />
      </mesh>

      {/* Glowing Neon Side Rails (Right Edge) */}
      <mesh position={[5.5, 0.15, roadCenterZ]}>
        <boxGeometry args={[0.22, 0.28, roadLength]} />
        <meshStandardMaterial
          color="#168BFF"
          emissive="#168BFF"
          emissiveIntensity={3}
          roughness={0.1}
        />
      </mesh>
      {/* Outer Cyan Accent Glow Strip (Right) */}
      <mesh position={[5.68, 0.08, roadCenterZ]}>
        <boxGeometry args={[0.12, 0.12, roadLength]} />
        <meshStandardMaterial
          color="#22D3EE"
          emissive="#22D3EE"
          emissiveIntensity={2.5}
          roughness={0.2}
        />
      </mesh>

      {/* Dashed Center Road Markings */}
      <RoadMarkings velocity={velocity} />

      {/* Expansive Deep Navy Cyber Ground Grid */}
      <mesh
        position={[0, -0.05, roadCenterZ]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[220, roadLength, 44, 70]} />
        <meshStandardMaterial
          color="#03060D"
          wireframe
          wireframeLinewidth={1}
          emissive="#081426"
          emissiveIntensity={0.65}
        />
      </mesh>
    </group>
  );
}
