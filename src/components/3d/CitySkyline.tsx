"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface CitySkylineProps {
  currentZ: number;
}

export function CitySkyline({ currentZ }: CitySkylineProps) {
  const leftBuildingsRef = useRef<THREE.InstancedMesh>(null);
  const rightBuildingsRef = useRef<THREE.InstancedMesh>(null);
  const distantBuildingsRef = useRef<THREE.InstancedMesh>(null);
  const edgesLeftRef = useRef<THREE.InstancedMesh>(null);
  const edgesRightRef = useRef<THREE.InstancedMesh>(null);
  const flyingVehiclesRef = useRef<THREE.Group>(null);

  const buildingCount = 230; // 230 on each side for deep urban density extending past Z = -1500
  const distantCount = 160; // 160 massive distant horizon towers

  // Generate deterministic architectural city data
  const { leftBuildings, rightBuildings, distantBuildings, windowsData } = useMemo(() => {
    let seed = 12345;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    const left = [];
    const right = [];
    const distant = [];

    // Foreground & Midground Towers flanking both sides of the highway
    for (let i = 0; i < buildingCount; i++) {
      const z = 30 - i * 6.8 + (random() - 0.5) * 4;
      const height = 24 + random() * 85; // Tall skyscrapers
      const width = 8 + random() * 14;
      const depth = 8 + random() * 16;
      const xLeft = -(12 + random() * 45); // Flanking highway
      const rotY = (random() - 0.5) * 0.25;

      left.push({
        x: xLeft,
        y: height / 2,
        z,
        sx: width,
        sy: height,
        sz: depth,
        rotY,
        hasAntenna: random() > 0.45,
        antennaHeight: 8 + random() * 16,
        isVioletAccent: random() > 0.82,
      });

      const rightHeight = 22 + random() * 90;
      const rightWidth = 8 + random() * 14;
      const rightDepth = 8 + random() * 16;
      const xRight = 12 + random() * 45;
      const rightRotY = (random() - 0.5) * 0.25;

      right.push({
        x: xRight,
        y: rightHeight / 2,
        z: z + (random() - 0.5) * 3,
        sx: rightWidth,
        sy: rightHeight,
        sz: rightDepth,
        rotY: rightRotY,
        hasAntenna: random() > 0.45,
        antennaHeight: 8 + random() * 16,
        isVioletAccent: random() > 0.82,
      });
    }

    // Distant Mega-Structures for deep background parallax
    for (let i = 0; i < distantCount; i++) {
      const isLeft = i % 2 === 0;
      const z = 40 - i * 9.5;
      const height = 80 + random() * 120;
      const width = 24 + random() * 32;
      const depth = 24 + random() * 32;
      const xDist = (isLeft ? -1 : 1) * (70 + random() * 60);

      distant.push({
        x: xDist,
        y: height / 2,
        z,
        sx: width,
        sy: height,
        sz: depth,
      });
    }

    // Procedural Window Matrices on facades across the entire highway length
    const winCount = 4200;
    const winPos = new Float32Array(winCount * 3);
    const winCol = new Float32Array(winCount * 3);
    const cBlue = new THREE.Color("#168BFF");
    const cCyan = new THREE.Color("#22D3EE");
    const cViolet = new THREE.Color("#6D45E8");

    for (let i = 0; i < winCount; i++) {
      const isLeft = i % 2 === 0;
      const sideSign = isLeft ? -1 : 1;
      winPos[i * 3] = sideSign * (10 + random() * 45); // X
      winPos[i * 3 + 1] = 2 + random() * 70; // Y
      winPos[i * 3 + 2] = 30 - random() * 1450; // Z spanning +30 to -1420

      const r = random();
      const col = r < 0.65 ? cBlue : r < 0.88 ? cCyan : cViolet;
      winCol[i * 3] = col.r;
      winCol[i * 3 + 1] = col.g;
      winCol[i * 3 + 2] = col.b;
    }

    return {
      leftBuildings: left,
      rightBuildings: right,
      distantBuildings: distant,
      windowsData: { positions: winPos, colors: winCol, count: winCount },
    };
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Update instance matrices in useFrame
  useFrame((state) => {
    // Left Skyscrapers
    if (leftBuildingsRef.current) {
      leftBuildings.forEach((b, i) => {
        dummy.position.set(b.x, b.y, b.z);
        dummy.scale.set(b.sx, b.sy, b.sz);
        dummy.rotation.set(0, b.rotY, 0);
        dummy.updateMatrix();
        leftBuildingsRef.current?.setMatrixAt(i, dummy.matrix);
      });
      leftBuildingsRef.current.instanceMatrix.needsUpdate = true;
    }

    // Right Skyscrapers
    if (rightBuildingsRef.current) {
      rightBuildings.forEach((b, i) => {
        dummy.position.set(b.x, b.y, b.z);
        dummy.scale.set(b.sx, b.sy, b.sz);
        dummy.rotation.set(0, b.rotY, 0);
        dummy.updateMatrix();
        rightBuildingsRef.current?.setMatrixAt(i, dummy.matrix);
      });
      rightBuildingsRef.current.instanceMatrix.needsUpdate = true;
    }

    // Distant Mega-Structures with subtle parallax
    if (distantBuildingsRef.current) {
      distantBuildings.forEach((b, i) => {
        // Slow parallax offset along Z relative to current camera travel
        const parallaxZ = b.z + currentZ * 0.12;
        dummy.position.set(b.x, b.y, parallaxZ);
        dummy.scale.set(b.sx, b.sy, b.sz);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        distantBuildingsRef.current?.setMatrixAt(i, dummy.matrix);
      });
      distantBuildingsRef.current.instanceMatrix.needsUpdate = true;
    }

    // Subtle hover traffic stream animation
    if (flyingVehiclesRef.current) {
      const time = state.clock.getElapsedTime();
      flyingVehiclesRef.current.children.forEach((child, idx) => {
        const speed = (idx % 2 === 0 ? 1 : -1) * (18 + (idx % 3) * 6);
        child.position.z = ((time * speed + idx * 120) % 1200) - 1000;
      });
    }
  });

  return (
    <group>
      {/* 1. Left City Skyscrapers */}
      <instancedMesh
        ref={leftBuildingsRef}
        args={[undefined, undefined, buildingCount]}
        frustumCulled={false}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#050B18"
          roughness={0.35}
          metalness={0.8}
          emissive="#03060D"
        />
      </instancedMesh>

      {/* 2. Right City Skyscrapers */}
      <instancedMesh
        ref={rightBuildingsRef}
        args={[undefined, undefined, buildingCount]}
        frustumCulled={false}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#050B18"
          roughness={0.35}
          metalness={0.8}
          emissive="#03060D"
        />
      </instancedMesh>

      {/* 3. Distant Background Horizon Skyscrapers (Parallax Layer) */}
      <instancedMesh
        ref={distantBuildingsRef}
        args={[undefined, undefined, distantCount]}
        frustumCulled={false}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#02040A"
          roughness={0.6}
          metalness={0.5}
          emissive="#02040A"
        />
      </instancedMesh>

      {/* 4. Windows Matrix across Skyscraper Facades */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={windowsData.count}
            array={windowsData.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={windowsData.count}
            array={windowsData.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.45}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 5. Glowing Rooftop Antennas & Communications Beacons */}
      {leftBuildings.filter((b) => b.hasAntenna).slice(0, 45).map((b, i) => (
        <group key={`ant-l-${i}`} position={[b.x, b.sy, b.z]}>
          <mesh position={[0, b.antennaHeight / 2, 0]}>
            <cylinderGeometry args={[0.06, 0.12, b.antennaHeight]} />
            <meshStandardMaterial
              color="#168BFF"
              emissive="#168BFF"
              emissiveIntensity={2.5}
            />
          </mesh>
          <mesh position={[0, b.antennaHeight, 0]}>
            <sphereGeometry args={[0.3, 8, 8]} />
            <meshStandardMaterial
              color={b.isVioletAccent ? "#925CFF" : "#22D3EE"}
              emissive={b.isVioletAccent ? "#925CFF" : "#22D3EE"}
              emissiveIntensity={4}
            />
          </mesh>
        </group>
      ))}

      {rightBuildings.filter((b) => b.hasAntenna).slice(0, 45).map((b, i) => (
        <group key={`ant-r-${i}`} position={[b.x, b.sy, b.z]}>
          <mesh position={[0, b.antennaHeight / 2, 0]}>
            <cylinderGeometry args={[0.06, 0.12, b.antennaHeight]} />
            <meshStandardMaterial
              color="#168BFF"
              emissive="#168BFF"
              emissiveIntensity={2.5}
            />
          </mesh>
          <mesh position={[0, b.antennaHeight, 0]}>
            <sphereGeometry args={[0.3, 8, 8]} />
            <meshStandardMaterial
              color={b.isVioletAccent ? "#925CFF" : "#22D3EE"}
              emissive={b.isVioletAccent ? "#925CFF" : "#22D3EE"}
              emissiveIntensity={4}
            />
          </mesh>
        </group>
      ))}

      {/* 6. Aerial Traffic Streams (Flying Cyber Vehicles) */}
      <group ref={flyingVehiclesRef}>
        {[
          { x: -16, y: 18, color: "#168BFF" },
          { x: -28, y: 32, color: "#22D3EE" },
          { x: -38, y: 14, color: "#168BFF" },
          { x: 16, y: 22, color: "#22D3EE" },
          { x: 26, y: 38, color: "#168BFF" },
          { x: 38, y: 16, color: "#925CFF" },
        ].map((veh, i) => (
          <group key={`veh-${i}`} position={[veh.x, veh.y, -100]}>
            {/* Vehicle body */}
            <mesh>
              <boxGeometry args={[0.6, 0.2, 2.2]} />
              <meshStandardMaterial
                color={veh.color}
                emissive={veh.color}
                emissiveIntensity={4}
              />
            </mesh>
            {/* Light trail */}
            <mesh position={[0, 0, 1.8]}>
              <boxGeometry args={[0.2, 0.05, 2.8]} />
              <meshBasicMaterial
                color={veh.color}
                transparent
                opacity={0.6}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
