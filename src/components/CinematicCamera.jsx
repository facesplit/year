import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getCameraStateAtProgress } from "../hooks/useCameraPath";

const cameraTarget = new THREE.Vector3();
const desiredPosition = new THREE.Vector3();

export default function CinematicCamera({ progress, reducedMotion }) {
  const { camera } = useThree();

  useFrame(() => {
    const dampedProgress = reducedMotion ? Math.round(progress * 24) / 24 : progress;
    const state = getCameraStateAtProgress(dampedProgress);
    desiredPosition.set(state.position.x, state.position.y, state.position.z);
    camera.position.lerp(desiredPosition, 0.08);
    cameraTarget.set(state.target.x, state.target.y, state.target.z);
    camera.lookAt(cameraTarget);
    camera.fov += (state.fov - camera.fov) * 0.08;
    camera.updateProjectionMatrix();
  });

  return null;
}
