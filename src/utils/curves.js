export const cameraKeyframes = [
  { progress: 0, position: [0, 0.05, 5.2], target: [2.05, -0.28, -1.25], fov: 38 },
  { progress: 0.12, position: [0.6, 0.35, 10.5], target: [0.8, -0.05, -2.8], fov: 44 },
  { progress: 0.3, position: [-1.4, 0.8, 0], target: [0.4, 0.1, -8], fov: 48 },
  { progress: 0.62, position: [1.8, 1.2, -22], target: [0, 0.2, -34], fov: 44 },
  { progress: 0.76, position: [0, 1.8, -40], target: [0, 0.1, -52], fov: 40 },
  { progress: 0.88, position: [0, 2.6, -49], target: [0, 0.2, -56], fov: 52 },
  { progress: 1, position: [0, 1.28, -70], target: [0, 0.1, -86], fov: 45 },
];

export function getHeartPosition(index, total, scale = 0.34) {
  const t = (index / Math.max(1, total - 1)) * Math.PI * 2;
  const x = 16 * Math.sin(t) ** 3;
  const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
  return [x * scale, y * scale, -55 + (index % 5) * 0.08];
}

export function getScatterPosition(index, total) {
  const angle = (index / Math.max(1, total)) * Math.PI * 2.7;
  const radius = 8.2 + (index % 4) * 0.95;
  return [Math.cos(angle) * radius, Math.sin(angle * 0.86) * 3.9, -55 + (index % 6) * 0.75 - 2.4];
}

export function mixPosition(from, to, progress) {
  return from.map((value, index) => value + (to[index] - value) * progress);
}
