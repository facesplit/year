import { useMemo } from "react";
import { clamp01, rangeProgress } from "../utils/animation";
import { cameraKeyframes } from "../utils/curves";

function mixArray(from, to, progress) {
  return from.map((value, index) => value + (to[index] - value) * progress);
}

function toVectorObject(values) {
  return { x: values[0], y: values[1], z: values[2] };
}

export function getCameraStateAtProgress(progress) {
  const value = clamp01(progress);
  const nextIndex = cameraKeyframes.findIndex((frame) => frame.progress >= value);
  const resolvedIndex = nextIndex === -1 ? cameraKeyframes.length - 1 : nextIndex;
  const end = cameraKeyframes[resolvedIndex];
  const start = cameraKeyframes[Math.max(0, resolvedIndex - 1)];
  const t = start === end ? 0 : rangeProgress(value, start.progress, end.progress);
  const position = mixArray(start.position, end.position, t);
  const target = mixArray(start.target, end.target, t);

  return {
    position: toVectorObject(position),
    target: toVectorObject(target),
    fov: start.fov + (end.fov - start.fov) * t,
  };
}

export function useCameraPath(progress) {
  return useMemo(() => getCameraStateAtProgress(progress), [progress]);
}
