export function getViewportProfile(width) {
  if (width < 640) return { name: "mobile", particleScale: 0.2, postprocessing: 0 };
  if (width < 1024) return { name: "tablet", particleScale: 0.34, postprocessing: 0 };
  return { name: "desktop", particleScale: 0.44, postprocessing: 0 };
}

export function getDprRange(profileName) {
  if (profileName === "mobile") return [1, 1];
  if (profileName === "tablet") return [1, 1.1];
  return [1, 1];
}

export function getParticleBudget(profileName, reducedMotion) {
  const base = profileName === "mobile" ? 1200 : profileName === "tablet" ? 2800 : 4800;
  return reducedMotion ? Math.round(base * 0.24) : base;
}
