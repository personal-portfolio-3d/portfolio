"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

interface CameraControllerProps {
  currentZ: number;
  velocity: number;
}

export function CameraController({ currentZ, velocity }: CameraControllerProps) {
  const { camera, pointer, viewport, size } = useThree();
  const targetLookAt = useRef(new THREE.Vector3(0, 1.8, currentZ - 20));

  useFrame((_, delta) => {
    // Parallax mouse sway (reduced slightly on mobile for stability)
    const isPortrait = viewport.aspect < 1.0 || size.width < 768;
    const mouseX = pointer.x * (isPortrait ? 0.35 : 0.75);
    const mouseY = pointer.y * (isPortrait ? 0.2 : 0.4);

    // Subtle dynamic acceleration tilt & dip
    const speedDip = Math.min(velocity * 0.003, 0.2);
    const targetY = 2.1 - speedDip + mouseY * 0.3;
    const targetX = mouseX;

    // Smooth camera position lerp
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.08);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.08);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, currentZ + 4, 0.15);

    // Dynamic FOV: Mobile portrait gets 64-65 base FOV so highway side barriers and cards fit naturally
    if ("fov" in camera) {
      const baseFov = isPortrait ? 65 : 55;
      const targetFov = baseFov + Math.min(velocity * 0.15, 12);
      (camera as THREE.PerspectiveCamera).fov = THREE.MathUtils.lerp(
        (camera as THREE.PerspectiveCamera).fov,
        targetFov,
        0.05
      );
      (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
    }

    // Camera look-at target smoothly following along the road ahead
    const aheadZ = currentZ - 22;
    targetLookAt.current.x = THREE.MathUtils.lerp(targetLookAt.current.x, mouseX * 0.4, 0.05);
    targetLookAt.current.y = THREE.MathUtils.lerp(targetLookAt.current.y, 1.8 + mouseY * 0.2, 0.05);
    targetLookAt.current.z = THREE.MathUtils.lerp(targetLookAt.current.z, aheadZ, 0.15);

    camera.lookAt(targetLookAt.current);
  });

  return null;
}

