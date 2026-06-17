import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { rangeProgress, smoothstep } from "../utils/animation";
import PhotoBackStory from "./PhotoBackStory";

export function getPhotoFlipRotation(localProgress, enableFlip = false) {
  return enableFlip ? smoothstep(0.42, 0.68, localProgress) * Math.PI : 0;
}

export function getPhotoOpacity(localProgress) {
  const fadeIn = smoothstep(0.06, 0.24, localProgress);
  const fadeOut = 1 - smoothstep(0.76, 0.98, localProgress);
  return Math.max(0, Math.min(1, fadeIn * fadeOut));
}

export function getPhotoPlaneSize(width, height, maxLongEdge = 2.9) {
  if (!width || !height || width <= 0 || height <= 0) return [2.2, 2.9];
  const aspect = width / height;
  const size = aspect >= 1 ? [maxLongEdge, maxLongEdge / aspect] : [maxLongEdge * aspect, maxLongEdge];
  return size.map((value) => Number(value.toFixed(5)));
}

export function getPhotoFrameSize(photoSize, padding = 0.22) {
  return photoSize.map((value) => Number((value + padding).toFixed(5)));
}

export default function MemoryPhoto({ memory, position, progress = 0, rotation = [0, 0, 0], range = [0, 1], scale = 1, showStory = false, enableFlip = false }) {
  const group = useRef(null);
  const texture = useTexture(memory.image);
  if (texture) texture.colorSpace = THREE.SRGBColorSpace;
  const imageWidth = texture?.image?.naturalWidth || texture?.image?.width;
  const imageHeight = texture?.image?.naturalHeight || texture?.image?.height;
  const photoSize = getPhotoPlaneSize(imageWidth, imageHeight);
  const frameSize = getPhotoFrameSize(photoSize);
  const material = useMemo(() => new THREE.MeshBasicMaterial({ map: texture, color: "#fff5f7", transparent: true }), [texture]);
  const frameMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: memory.accent || "#f4b8c7",
        roughness: 0.52,
        metalness: 0.02,
        emissive: "#ffdce5",
        emissiveIntensity: 0.16,
        transparent: true,
      }),
    [memory.accent],
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    const frameProgress = typeof window === "undefined" ? progress : (window.__ANNIVERSARY_PROGRESS__ ?? progress);
    const local = rangeProgress(frameProgress, range[0], range[1]);
    const flip = getPhotoFlipRotation(local, enableFlip);
    const opacity = getPhotoOpacity(local);
    const drift = Math.sin(clock.elapsedTime * 0.8 + position[2]) * 0.035;
    group.current.rotation.y = rotation[1] + flip + drift;
    group.current.rotation.x = rotation[0] + Math.sin(clock.elapsedTime * 0.55 + position[0]) * 0.025;
    group.current.scale.setScalar(scale * (0.7 + smoothstep(0.02, 0.22, local) * 0.3));
    material.opacity = opacity;
    frameMaterial.opacity = opacity;
    group.current.visible = opacity > 0.015;
  });

  return (
    <group ref={group} position={position} rotation={rotation}>
      <mesh position={[0, 0, -0.035]} material={frameMaterial}>
        <boxGeometry args={[frameSize[0], frameSize[1], 0.06]} />
      </mesh>
      <mesh position={[0, 0, 0.01]} material={material}>
        <planeGeometry args={photoSize} />
      </mesh>
      {showStory && <PhotoBackStory memory={memory} offsetX={frameSize[0] / 2 + 0.56} />}
    </group>
  );
}
