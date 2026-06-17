import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ParticleField({ count = 1200, progress = 0, finale = false }) {
  const ref = useRef(null);
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      // sakura petal spread: wider, denser, and softly drifting through the path.
      values[index * 3] = (Math.random() - 0.5) * 26;
      values[index * 3 + 1] = (Math.random() - 0.5) * 14;
      values[index * 3 + 2] = -Math.random() * 92 + 8;
    }
    return values;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.018 + progress * 0.08;
    ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.08) * 0.025;
    ref.current.material.opacity = finale ? 0.92 : 0.82;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.076} color={new THREE.Color("#f47bae")} transparent opacity={0.82} depthWrite={false} />
    </points>
  );
}
