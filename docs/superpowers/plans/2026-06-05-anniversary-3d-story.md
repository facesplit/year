# Anniversary 3D Story Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a new React + Vite immersive 3D anniversary scroll-film where scroll drives a Three.js camera through memories, calendar, heart climax, and finale letter.

**Architecture:** Use one fixed React Three Fiber canvas with a single normalized scroll progress source. GSAP ScrollTrigger + Lenis produce progress, pure utilities map progress to camera/scene states, and Framer Motion renders glassmorphism text overlays. The DOM is not a normal landing page; it only provides scroll length, overlays, and fallbacks.

**Tech Stack:** React, Vite, Three.js, @react-three/fiber, @react-three/drei, @react-three/postprocessing, postprocessing, GSAP ScrollTrigger, Lenis, Framer Motion, Vitest.

---

## Source Spec

Read before execution: `docs/superpowers/specs/2026-06-05-anniversary-3d-story-design.md`.

## File Map

- Create `package.json`: npm scripts and project metadata.
- Create `index.html`: Vite root HTML with SEO/meta basics.
- Create `vite.config.js`: React plugin and Vitest jsdom config.
- Create `.gitignore`: ignore dependencies, build output, logs, and `.superpowers/`.
- Create `src/main.jsx`: React entrypoint.
- Create `src/App.jsx`: top-level composition for scroll stage, WebGL canvas, overlays, fallback.
- Create `src/styles.css`: global responsive cinematic/glassmorphism styling.
- Create `src/data/story.js`: date, recipient/signature, 10+ memories, temporary asset imports.
- Create `src/utils/animation.js`: pure range/progress interpolation helpers.
- Create `src/utils/curves.js`: camera keyframes and heart/calendar placement helpers.
- Create `src/utils/responsive.js`: DPR, particle count, and viewport profile helpers.
- Create `src/hooks/useReducedMotion.js`: reduced motion media query hook.
- Create `src/hooks/useScrollProgress.js`: normalized progress store and hook.
- Create `src/hooks/useLenisScroll.js`: Lenis + ScrollTrigger lifecycle.
- Create `src/hooks/useCameraPath.js`: pure camera-state sampling and React hook wrapper.
- Create `src/components/CanvasStage.jsx`: fixed R3F canvas, lighting, postprocessing, scenes.
- Create `src/components/CinematicCamera.jsx`: applies sampled camera state to R3F camera.
- Create `src/components/MemoryPhoto.jsx`: reusable 3D flipping photo.
- Create `src/components/PhotoBackStory.jsx`: backside story panel rendered through drei `Html`.
- Create `src/components/ParticleField.jsx`: star dust and warm particles.
- Create `src/components/GlassOverlay.jsx`: Framer Motion story text overlays.
- Create `src/components/ProgressHud.jsx`: atmospheric progress/timeline indicator.
- Create `src/components/LetterReveal.jsx`: finale letter reveal and heartbeat.
- Create `src/scenes/ChapterIntro.jsx`: opening photo and first text beat.
- Create `src/scenes/ChapterMemories.jsx`: emerging memories.
- Create `src/scenes/ChapterFlight.jsx`: 10+ scroll-flip memory corridor.
- Create `src/scenes/CalendarScene.jsx`: large 3D calendar and `03.05.2025` reveal.
- Create `src/scenes/HeartAssembly.jsx`: photo heart formation.
- Create `src/scenes/Finale.jsx`: stars, thanks text, letter reveal trigger.
- Create tests: `src/utils/animation.test.js`, `src/utils/responsive.test.js`, `src/data/story.test.js`, `src/hooks/useScrollProgress.test.js`, `src/hooks/useCameraPath.test.js`.

No commits are part of this plan because committing was not explicitly requested. At each checkpoint, inspect the changed files and continue.

---

### Task 1: Project Shell

**Files:**
- Create: `package.json`
- Create: `.gitignore`
- Create: `index.html`
- Create: `vite.config.js`

- [ ] **Step 1: Create npm project metadata**

Create `package.json` with this content:

```json
{
  "name": "anniversary-3d-story",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest"
  }
}
```

- [ ] **Step 2: Install runtime dependencies**

Run from `C:\Users\user\Desktop\My_project\8 march\anniversary-3d-story`:

```bash
npm install react react-dom three @react-three/fiber @react-three/drei @react-three/postprocessing postprocessing gsap lenis framer-motion
```

Expected: npm exits with code `0` and adds dependencies to `package.json`.

- [ ] **Step 3: Install dev dependencies**

Run:

```bash
npm install -D vite @vitejs/plugin-react vitest jsdom @testing-library/react @testing-library/jest-dom
```

Expected: npm exits with code `0` and adds dev dependencies to `package.json`.

- [ ] **Step 4: Create ignore rules**

Create `.gitignore`:

```gitignore
node_modules/
dist/
.vite/
.superpowers/
coverage/
*.log
```

- [ ] **Step 5: Create Vite HTML root**

Create `index.html`:

```html
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0f0f23" />
    <meta
      name="description"
      content="Интерактивное 3D путешествие по воспоминаниям на годовщину."
    />
    <title>Для Нурданы</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Create Vite/Vitest config**

Create `vite.config.js`:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
  },
});
```

- [ ] **Step 7: Checkpoint**

Run:

```bash
npm test -- --run
```

Expected: Vitest starts and reports no tests found or exits cleanly depending on installed Vitest version. Continue after confirming the toolchain runs.

---

### Task 2: Assets, Story Data, Pure Utilities

**Files:**
- Create: `src/assets/photos/girl1.jpeg`
- Create: `src/assets/photos/girl2.jpeg`
- Create: `src/assets/photos/girl3.jpeg`
- Create: `src/assets/photos/girl4.jpeg`
- Create: `src/data/story.js`
- Create: `src/utils/animation.js`
- Create: `src/utils/responsive.js`
- Test: `src/data/story.test.js`
- Test: `src/utils/animation.test.js`
- Test: `src/utils/responsive.test.js`

- [ ] **Step 1: Copy temporary photo assets**

Run:

```bash
mkdir -p "src/assets/photos" && cp "../assets/girl1.jpeg" "src/assets/photos/girl1.jpeg" && cp "../assets/girl2.jpeg" "src/assets/photos/girl2.jpeg" && cp "../assets/girl3.jpeg" "src/assets/photos/girl3.jpeg" && cp "../assets/girl4.jpeg" "src/assets/photos/girl4.jpeg"
```

Expected: four images exist under `src/assets/photos/`.

- [ ] **Step 2: Write failing tests for story and utilities**

Create `src/data/story.test.js`:

```js
import { describe, expect, it } from "vitest";
import { story } from "./story";

describe("story", () => {
  it("contains the approved anniversary details", () => {
    expect(story.anniversaryDate).toBe("03.05.2025");
    expect(story.recipient).toBe("Нурданы");
    expect(story.signature).toBe("Асылхана");
  });

  it("contains at least ten memories with image and story text", () => {
    expect(story.memories.length).toBeGreaterThanOrEqual(10);
    for (const memory of story.memories) {
      expect(memory.id).toMatch(/^memory-/);
      expect(memory.image).toBeTruthy();
      expect(memory.title.length).toBeGreaterThan(2);
      expect(memory.story.length).toBeGreaterThan(12);
    }
  });
});
```

Create `src/utils/animation.test.js`:

```js
import { describe, expect, it } from "vitest";
import { clamp01, lerp, mapRange, rangeProgress, smoothstep } from "./animation";

describe("animation helpers", () => {
  it("clamps values into 0..1", () => {
    expect(clamp01(-0.5)).toBe(0);
    expect(clamp01(0.4)).toBe(0.4);
    expect(clamp01(2)).toBe(1);
  });

  it("maps and interpolates numeric ranges", () => {
    expect(lerp(10, 20, 0.25)).toBe(12.5);
    expect(mapRange(0.5, 0, 1, 20, 40)).toBe(30);
    expect(rangeProgress(0.35, 0.3, 0.5)).toBeCloseTo(0.25);
  });

  it("smoothsteps within the active range", () => {
    expect(smoothstep(0, 1, 0)).toBe(0);
    expect(smoothstep(0, 1, 1)).toBe(1);
    expect(smoothstep(0, 1, 0.5)).toBeCloseTo(0.5);
  });
});
```

Create `src/utils/responsive.test.js`:

```js
import { describe, expect, it } from "vitest";
import { getDprRange, getParticleBudget, getViewportProfile } from "./responsive";

describe("responsive helpers", () => {
  it("classifies viewport profiles", () => {
    expect(getViewportProfile(375).name).toBe("mobile");
    expect(getViewportProfile(800).name).toBe("tablet");
    expect(getViewportProfile(1440).name).toBe("desktop");
  });

  it("caps DPR and particle budgets by profile", () => {
    expect(getDprRange("mobile")).toEqual([1, 1.35]);
    expect(getParticleBudget("mobile", false)).toBeLessThan(getParticleBudget("desktop", false));
    expect(getParticleBudget("desktop", true)).toBeLessThan(getParticleBudget("desktop", false));
  });
});
```

- [ ] **Step 3: Run tests and verify they fail**

Run:

```bash
npm test -- --run src/data/story.test.js src/utils/animation.test.js src/utils/responsive.test.js
```

Expected: FAIL because `story.js`, `animation.js`, and `responsive.js` do not exist yet.

- [ ] **Step 4: Implement story data**

Create `src/data/story.js`:

```js
import girl1 from "../assets/photos/girl1.jpeg";
import girl2 from "../assets/photos/girl2.jpeg";
import girl3 from "../assets/photos/girl3.jpeg";
import girl4 from "../assets/photos/girl4.jpeg";

const photos = [girl1, girl2, girl3, girl4];

export const story = {
  anniversaryDate: "03.05.2025",
  recipient: "Нурданы",
  signature: "Асылхана",
  intro: {
    eyebrow: "Всё начинается",
    title: "Помнишь этот день?",
    body: "С этого момента обычные дни начали складываться в нашу историю.",
  },
  finale: {
    title: "Спасибо за этот год",
    letter:
      "Спасибо за каждый тёплый момент, за смех, за поддержку и за то, что этот год стал нашим маленьким космосом воспоминаний.",
  },
  memories: Array.from({ length: 12 }, (_, index) => ({
    id: `memory-${index + 1}`,
    image: photos[index % photos.length],
    title: `Воспоминание ${index + 1}`,
    dateLabel: index === 5 ? "03.05.2025" : `Момент ${index + 1}`,
    story:
      index === 5
        ? "День, который стал точкой, куда хочется возвращаться снова и снова."
        : "Маленький кадр, который хранит больше тепла, чем можно сказать словами.",
    accent: index % 2 === 0 ? "#f97316" : "#f47bae",
  })),
};
```

- [ ] **Step 5: Implement animation helpers**

Create `src/utils/animation.js`:

```js
export function clamp01(value) {
  return Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0));
}

export function lerp(from, to, progress) {
  return from + (to - from) * clamp01(progress);
}

export function mapRange(value, inMin, inMax, outMin, outMax) {
  if (inMax === inMin) return outMin;
  return lerp(outMin, outMax, (value - inMin) / (inMax - inMin));
}

export function rangeProgress(value, start, end) {
  if (end === start) return value >= end ? 1 : 0;
  return clamp01((value - start) / (end - start));
}

export function smoothstep(edge0, edge1, value) {
  const t = rangeProgress(value, edge0, edge1);
  return t * t * (3 - 2 * t);
}
```

- [ ] **Step 6: Implement responsive helpers**

Create `src/utils/responsive.js`:

```js
export function getViewportProfile(width) {
  if (width < 640) return { name: "mobile", particleScale: 0.38, postprocessing: 0.55 };
  if (width < 1024) return { name: "tablet", particleScale: 0.65, postprocessing: 0.75 };
  return { name: "desktop", particleScale: 1, postprocessing: 1 };
}

export function getDprRange(profileName) {
  if (profileName === "mobile") return [1, 1.35];
  if (profileName === "tablet") return [1, 1.6];
  return [1, 2];
}

export function getParticleBudget(profileName, reducedMotion) {
  const base = profileName === "mobile" ? 650 : profileName === "tablet" ? 1200 : 2200;
  return reducedMotion ? Math.round(base * 0.35) : base;
}
```

- [ ] **Step 7: Verify tests pass**

Run:

```bash
npm test -- --run src/data/story.test.js src/utils/animation.test.js src/utils/responsive.test.js
```

Expected: PASS for all three test files.

---

### Task 3: Scroll Progress And Camera Path

**Files:**
- Create: `src/hooks/useScrollProgress.js`
- Create: `src/hooks/useReducedMotion.js`
- Create: `src/hooks/useLenisScroll.js`
- Create: `src/hooks/useCameraPath.js`
- Create: `src/utils/curves.js`
- Test: `src/hooks/useScrollProgress.test.js`
- Test: `src/hooks/useCameraPath.test.js`

- [ ] **Step 1: Write failing tests for progress store and camera sampling**

Create `src/hooks/useScrollProgress.test.js`:

```js
import { describe, expect, it } from "vitest";
import { createProgressStore } from "./useScrollProgress";

describe("createProgressStore", () => {
  it("clamps progress and notifies listeners", () => {
    const store = createProgressStore();
    const values = [];
    const unsubscribe = store.subscribe(() => values.push(store.getSnapshot()));
    store.set(1.5);
    store.set(-0.5);
    unsubscribe();
    store.set(0.5);
    expect(values).toEqual([1, 0]);
    expect(store.getSnapshot()).toBe(0.5);
  });
});
```

Create `src/hooks/useCameraPath.test.js`:

```js
import { describe, expect, it } from "vitest";
import { getCameraStateAtProgress } from "./useCameraPath";

describe("camera path", () => {
  it("returns deterministic camera state for progress", () => {
    const start = getCameraStateAtProgress(0);
    const middle = getCameraStateAtProgress(0.5);
    const end = getCameraStateAtProgress(1);
    expect(start.position.z).toBeGreaterThan(middle.position.z);
    expect(end.position.z).toBeLessThan(middle.position.z);
    expect(middle.target).toHaveProperty("x");
    expect(middle.fov).toBeGreaterThanOrEqual(35);
  });
});
```

- [ ] **Step 2: Run tests and verify they fail**

Run:

```bash
npm test -- --run src/hooks/useScrollProgress.test.js src/hooks/useCameraPath.test.js
```

Expected: FAIL because hook files do not exist.

- [ ] **Step 3: Implement progress store and reduced motion hook**

Create `src/hooks/useScrollProgress.js`:

```js
import { useSyncExternalStore } from "react";
import { clamp01 } from "../utils/animation";

export function createProgressStore() {
  let progress = 0;
  const listeners = new Set();
  return {
    getSnapshot: () => progress,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    set(value) {
      progress = clamp01(value);
      listeners.forEach((listener) => listener());
    },
  };
}

export const scrollProgressStore = createProgressStore();

export function setScrollProgress(value) {
  scrollProgressStore.set(value);
}

export function useScrollProgress() {
  return useSyncExternalStore(
    scrollProgressStore.subscribe,
    scrollProgressStore.getSnapshot,
    scrollProgressStore.getSnapshot,
  );
}
```

Create `src/hooks/useReducedMotion.js`:

```js
import { useEffect, useState } from "react";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}
```

- [ ] **Step 4: Implement camera keyframes and sampler**

Create `src/utils/curves.js`:

```js
export const cameraKeyframes = [
  { progress: 0, position: [0, 0.15, 8], target: [0, 0, 0], fov: 42 },
  { progress: 0.12, position: [0.6, 0.35, 12], target: [0, 0.1, -2], fov: 46 },
  { progress: 0.3, position: [-1.4, 0.8, 0], target: [0.4, 0.1, -8], fov: 48 },
  { progress: 0.55, position: [1.8, 1.2, -18], target: [0, 0.2, -24], fov: 44 },
  { progress: 0.66, position: [0, 1.8, -31], target: [0, 0.1, -37], fov: 39 },
  { progress: 0.78, position: [0, 2.6, -49], target: [0, 0.2, -56], fov: 52 },
  { progress: 1, position: [0, 1.2, -74], target: [0, 0.1, -86], fov: 45 },
];

export function getHeartPosition(index, total, scale = 0.34) {
  const t = (index / Math.max(1, total - 1)) * Math.PI * 2;
  const x = 16 * Math.sin(t) ** 3;
  const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
  return [x * scale, y * scale, -55 + (index % 5) * 0.08];
}
```

Create `src/hooks/useCameraPath.js`:

```js
import { useMemo } from "react";
import { cameraKeyframes } from "../utils/curves";
import { clamp01, rangeProgress } from "../utils/animation";

function mixArray(a, b, t) {
  return a.map((value, index) => value + (b[index] - value) * t);
}

export function getCameraStateAtProgress(progress) {
  const value = clamp01(progress);
  const keyframes = cameraKeyframes;
  const nextIndex = keyframes.findIndex((frame) => frame.progress >= value);
  const end = keyframes[nextIndex === -1 ? keyframes.length - 1 : nextIndex];
  const start = keyframes[Math.max(0, (nextIndex === -1 ? keyframes.length - 1 : nextIndex) - 1)];
  const t = start === end ? 0 : rangeProgress(value, start.progress, end.progress);

  return {
    position: Object.fromEntries(["x", "y", "z"].map((key, index) => [key, mixArray(start.position, end.position, t)[index]])),
    target: Object.fromEntries(["x", "y", "z"].map((key, index) => [key, mixArray(start.target, end.target, t)[index]])),
    fov: start.fov + (end.fov - start.fov) * t,
  };
}

export function useCameraPath(progress) {
  return useMemo(() => getCameraStateAtProgress(progress), [progress]);
}
```

- [ ] **Step 5: Implement Lenis + ScrollTrigger bridge**

Create `src/hooks/useLenisScroll.js`:

```js
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { setScrollProgress } from "./useScrollProgress";

gsap.registerPlugin(ScrollTrigger);

export function useLenisScroll(scrollRef, reducedMotion) {
  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return undefined;

    let frameId = 0;
    const lenis = reducedMotion
      ? null
      : new Lenis({ duration: 1.45, smoothWheel: true, wheelMultiplier: 0.85 });

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => setScrollProgress(self.progress),
    });

    function raf(time) {
      lenis?.raf(time);
      ScrollTrigger.update();
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      trigger.kill();
      lenis?.destroy();
    };
  }, [scrollRef, reducedMotion]);
}
```

- [ ] **Step 6: Verify hook tests pass**

Run:

```bash
npm test -- --run src/hooks/useScrollProgress.test.js src/hooks/useCameraPath.test.js
```

Expected: PASS for both test files.

---

### Task 4: App Shell, Global CSS, And WebGL Fallback

**Files:**
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/styles.css`

- [ ] **Step 1: Create React entrypoint**

Create `src/main.jsx`:

```jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

- [ ] **Step 2: Create base app composition**

Create `src/App.jsx`:

```jsx
import { useRef } from "react";
import CanvasStage from "./components/CanvasStage";
import GlassOverlay from "./components/GlassOverlay";
import ProgressHud from "./components/ProgressHud";
import LetterReveal from "./components/LetterReveal";
import { story } from "./data/story";
import { useLenisScroll } from "./hooks/useLenisScroll";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { useScrollProgress } from "./hooks/useScrollProgress";

function WebGLFallback() {
  return (
    <section className="fallback-card" aria-label="Финальное поздравление">
      <p>Для {story.recipient}</p>
      <h1>{story.finale.title}</h1>
      <p>{story.finale.letter}</p>
      <strong>{story.signature}</strong>
    </section>
  );
}

export default function App() {
  const scrollRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const progress = useScrollProgress();
  useLenisScroll(scrollRef, reducedMotion);

  return (
    <main className="experience-shell">
      <CanvasStage progress={progress} reducedMotion={reducedMotion} fallback={<WebGLFallback />} />
      <GlassOverlay progress={progress} story={story} />
      <LetterReveal progress={progress} story={story} />
      <ProgressHud progress={progress} />
      <div ref={scrollRef} className="scroll-timeline" aria-hidden="true" />
    </main>
  );
}
```

- [ ] **Step 3: Create global cinematic CSS**

Create `src/styles.css`:

```css
:root {
  color-scheme: dark;
  --bg: #0f0f23;
  --ink: #fff7ed;
  --muted: rgba(255, 247, 237, 0.68);
  --accent: #f97316;
  --rose: #f47bae;
  --glass: rgba(255, 255, 255, 0.09);
  --glass-border: rgba(255, 244, 232, 0.2);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

* { box-sizing: border-box; }
html { background: var(--bg); }
html, body, #root { min-height: 100%; }
body { margin: 0; overflow-x: hidden; color: var(--ink); background: var(--bg); }

.experience-shell { position: relative; min-height: 100vh; background: radial-gradient(circle at 50% 20%, rgba(249, 115, 22, 0.08), transparent 34%), var(--bg); }
.canvas-stage { position: fixed; inset: 0; width: 100vw; height: 100dvh; z-index: 0; }
.scroll-timeline { height: 920vh; pointer-events: none; }
.glass-overlay { position: fixed; left: clamp(18px, 6vw, 84px); top: 50%; z-index: 4; max-width: min(520px, calc(100vw - 36px)); transform: translateY(-50%); pointer-events: none; }
.glass-panel { padding: clamp(18px, 3vw, 30px); border: 1px solid var(--glass-border); border-radius: 28px; background: linear-gradient(135deg, rgba(255,255,255,.12), rgba(255,255,255,.045)); box-shadow: 0 24px 90px rgba(0,0,0,.36); backdrop-filter: blur(18px); }
.eyebrow { margin: 0 0 10px; color: var(--accent); letter-spacing: .16em; text-transform: uppercase; font-size: 12px; font-weight: 700; }
.headline { margin: 0; font-size: clamp(36px, 7vw, 92px); line-height: .92; letter-spacing: -.06em; }
.body-copy { color: var(--muted); font-size: clamp(16px, 2vw, 20px); line-height: 1.55; }
.progress-hud { position: fixed; right: clamp(16px, 4vw, 52px); bottom: clamp(18px, 4vw, 42px); z-index: 5; width: min(220px, 38vw); color: var(--muted); pointer-events: none; }
.progress-track { height: 2px; background: rgba(255,255,255,.16); border-radius: 999px; overflow: hidden; }
.progress-fill { height: 100%; background: linear-gradient(90deg, var(--accent), var(--rose)); transform-origin: left; }
.letter-reveal { position: fixed; inset: 0; z-index: 6; display: grid; place-items: center; padding: 20px; pointer-events: none; }
.fallback-card { min-height: 100dvh; display: grid; place-items: center; padding: 32px; text-align: center; }

@media (max-width: 640px) {
  .scroll-timeline { height: 760vh; }
  .glass-overlay { left: 14px; right: 14px; top: auto; bottom: 82px; max-width: none; transform: none; }
  .headline { font-size: clamp(34px, 12vw, 58px); }
  .progress-hud { left: 16px; right: 16px; width: auto; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .001ms !important; transition-duration: .001ms !important; scroll-behavior: auto !important; }
}
```

- [ ] **Step 4: Build checkpoint**

Run:

```bash
npm run build
```

Expected: FAIL because referenced components do not exist. This confirms shell wiring is ready for component tasks.

---

### Task 5: Canvas Stage, Camera, Particles

**Files:**
- Create: `src/components/CanvasStage.jsx`
- Create: `src/components/CinematicCamera.jsx`
- Create: `src/components/ParticleField.jsx`

- [ ] **Step 1: Implement camera driver**

Create `src/components/CinematicCamera.jsx`:

```jsx
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getCameraStateAtProgress } from "../hooks/useCameraPath";

const target = new THREE.Vector3();

export default function CinematicCamera({ progress, reducedMotion }) {
  const { camera } = useThree();

  useFrame(() => {
    const dampedProgress = reducedMotion ? Math.round(progress * 24) / 24 : progress;
    const state = getCameraStateAtProgress(dampedProgress);
    camera.position.lerp(new THREE.Vector3(state.position.x, state.position.y, state.position.z), 0.08);
    target.set(state.target.x, state.target.y, state.target.z);
    camera.lookAt(target);
    camera.fov += (state.fov - camera.fov) * 0.08;
    camera.updateProjectionMatrix();
  });

  return null;
}
```

- [ ] **Step 2: Implement particle field**

Create `src/components/ParticleField.jsx`:

```jsx
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ParticleField({ count = 1200, progress = 0, finale = false }) {
  const ref = useRef(null);
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      values[index * 3] = (Math.random() - 0.5) * 26;
      values[index * 3 + 1] = (Math.random() - 0.5) * 14;
      values[index * 3 + 2] = -Math.random() * 92 + 8;
    }
    return values;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.018 + progress * 0.08;
    ref.current.material.opacity = finale ? 0.78 : 0.42;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color={new THREE.Color("#ffd7ac")} transparent opacity={0.42} depthWrite={false} />
    </points>
  );
}
```

- [ ] **Step 3: Implement canvas stage**

Create `src/components/CanvasStage.jsx`:

```jsx
import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Preload } from "@react-three/drei";
import { Bloom, DepthOfField, EffectComposer, Vignette } from "@react-three/postprocessing";
import CinematicCamera from "./CinematicCamera";
import ParticleField from "./ParticleField";
import ChapterIntro from "../scenes/ChapterIntro";
import ChapterMemories from "../scenes/ChapterMemories";
import ChapterFlight from "../scenes/ChapterFlight";
import CalendarScene from "../scenes/CalendarScene";
import HeartAssembly from "../scenes/HeartAssembly";
import Finale from "../scenes/Finale";
import { getDprRange, getParticleBudget, getViewportProfile } from "../utils/responsive";

function WebGLUnavailable({ fallback }) {
  return <div className="canvas-stage">{fallback}</div>;
}

export default function CanvasStage({ progress, reducedMotion, fallback }) {
  const profile = useMemo(() => getViewportProfile(window.innerWidth), []);
  const dpr = getDprRange(profile.name);
  const particleCount = getParticleBudget(profile.name, reducedMotion);

  if (!window.WebGLRenderingContext) return <WebGLUnavailable fallback={fallback} />;

  return (
    <Canvas className="canvas-stage" dpr={dpr} camera={{ position: [0, 0.15, 8], fov: 42 }} gl={{ antialias: true, alpha: false }}>
      <color attach="background" args={["#0f0f23"]} />
      <fog attach="fog" args={["#0f0f23", 18, 96]} />
      <ambientLight intensity={0.42} />
      <pointLight position={[4, 5, 4]} intensity={8} color="#f97316" />
      <pointLight position={[-5, 2, -16]} intensity={5} color="#f47bae" />
      <CinematicCamera progress={progress} reducedMotion={reducedMotion} />
      <Suspense fallback={null}>
        <ParticleField count={particleCount} progress={progress} finale={progress > 0.78} />
        <ChapterIntro progress={progress} />
        <ChapterMemories progress={progress} />
        <ChapterFlight progress={progress} />
        <CalendarScene progress={progress} />
        <HeartAssembly progress={progress} />
        <Finale progress={progress} />
        <Environment preset="night" />
        <Preload all />
      </Suspense>
      {!reducedMotion && (
        <EffectComposer multisampling={0}>
          <Bloom intensity={profile.postprocessing * 0.75} luminanceThreshold={0.16} luminanceSmoothing={0.4} />
          <DepthOfField focusDistance={0.025} focalLength={0.035} bokehScale={profile.postprocessing * 2.3} />
          <Vignette eskil={false} offset={0.18} darkness={0.65} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
```

- [ ] **Step 4: Build checkpoint**

Run:

```bash
npm run build
```

Expected: FAIL because scene and photo components do not exist yet.

---

### Task 6: 3D Photo Components

**Files:**
- Create: `src/components/MemoryPhoto.jsx`
- Create: `src/components/PhotoBackStory.jsx`

- [ ] **Step 1: Implement backside story panel**

Create `src/components/PhotoBackStory.jsx`:

```jsx
import { Html } from "@react-three/drei";

export default function PhotoBackStory({ memory }) {
  return (
    <Html transform center distanceFactor={1.4} position={[0, 0, -0.035]} rotation={[0, Math.PI, 0]}>
      <article className="photo-back-card">
        <p className="photo-back-date">{memory.dateLabel}</p>
        <h3>{memory.title}</h3>
        <p>{memory.story}</p>
      </article>
    </Html>
  );
}
```

Append to `src/styles.css`:

```css
.photo-back-card { width: 240px; min-height: 168px; padding: 18px; border-radius: 20px; border: 1px solid rgba(255,244,232,.24); background: rgba(20, 12, 20, .68); color: #fff7ed; box-shadow: 0 20px 70px rgba(0,0,0,.38); backdrop-filter: blur(14px); }
.photo-back-card h3 { margin: 0 0 10px; font-size: 20px; line-height: 1.05; }
.photo-back-card p { margin: 0; color: rgba(255,247,237,.72); line-height: 1.45; font-size: 14px; }
.photo-back-date { color: #f97316 !important; letter-spacing: .12em; text-transform: uppercase; font-size: 11px !important; font-weight: 700; margin-bottom: 8px !important; }
```

- [ ] **Step 2: Implement scroll-flipping memory photo**

Create `src/components/MemoryPhoto.jsx`:

```jsx
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import PhotoBackStory from "./PhotoBackStory";
import { rangeProgress, smoothstep } from "../utils/animation";

export default function MemoryPhoto({ memory, position, rotation = [0, 0, 0], range = [0, 1], scale = 1 }) {
  const group = useRef(null);
  const texture = useTexture(memory.image);
  const material = useMemo(() => new THREE.MeshStandardMaterial({ map: texture, roughness: 0.62, metalness: 0.05 }), [texture]);
  const frameMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: memory.accent || "#f97316", roughness: 0.45, metalness: 0.18 }), [memory.accent]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const local = rangeProgress(window.__ANNIVERSARY_PROGRESS__ ?? 0, range[0], range[1]);
    const flip = smoothstep(0.42, 0.68, local);
    const drift = Math.sin(clock.elapsedTime * 0.8 + position[2]) * 0.035;
    group.current.rotation.y = rotation[1] + flip * Math.PI + drift;
    group.current.rotation.x = rotation[0] + Math.sin(clock.elapsedTime * 0.55 + position[0]) * 0.025;
    group.current.scale.setScalar(scale * (0.7 + smoothstep(0.02, 0.22, local) * 0.3));
  });

  return (
    <group ref={group} position={position} rotation={rotation}>
      <mesh position={[0, 0, -0.035]} material={frameMaterial}>
        <boxGeometry args={[2.42, 3.12, 0.06]} />
      </mesh>
      <mesh position={[0, 0, 0.01]} material={material}>
        <planeGeometry args={[2.2, 2.9]} />
      </mesh>
      <PhotoBackStory memory={memory} />
    </group>
  );
}
```

- [ ] **Step 3: Add progress bridge for photo animation**

Modify `src/App.jsx` after `const progress = useScrollProgress();`:

```jsx
window.__ANNIVERSARY_PROGRESS__ = progress;
```

Expected: `MemoryPhoto` can sample scroll progress inside `useFrame` without rerendering every mesh.

- [ ] **Step 4: Build checkpoint**

Run:

```bash
npm run build
```

Expected: FAIL because scene files do not exist yet.

---

### Task 7: Scene Components

**Files:**
- Create: `src/scenes/ChapterIntro.jsx`
- Create: `src/scenes/ChapterMemories.jsx`
- Create: `src/scenes/ChapterFlight.jsx`
- Create: `src/scenes/CalendarScene.jsx`
- Create: `src/scenes/HeartAssembly.jsx`
- Create: `src/scenes/Finale.jsx`

- [ ] **Step 1: Implement intro scene**

Create `src/scenes/ChapterIntro.jsx`:

```jsx
import MemoryPhoto from "../components/MemoryPhoto";
import { story } from "../data/story";

export default function ChapterIntro({ progress }) {
  const visible = progress < 0.22;
  if (!visible) return null;
  return <MemoryPhoto memory={story.memories[0]} position={[0, 0, 0]} rotation={[0, 0, 0]} range={[0, 0.12]} scale={1.05} />;
}
```

- [ ] **Step 2: Implement memory emergence scene**

Create `src/scenes/ChapterMemories.jsx`:

```jsx
import MemoryPhoto from "../components/MemoryPhoto";
import { story } from "../data/story";

const positions = [
  [-3.2, 1.1, -5], [2.8, -0.9, -6.5], [-1.2, -1.5, -8], [3.4, 1.4, -9.5],
];

export default function ChapterMemories({ progress }) {
  if (progress < 0.1 || progress > 0.38) return null;
  return story.memories.slice(1, 5).map((memory, index) => (
    <MemoryPhoto key={memory.id} memory={memory} position={positions[index]} rotation={[0.08, index % 2 ? -0.3 : 0.22, 0]} range={[0.12 + index * 0.03, 0.3]} scale={0.72} />
  ));
}
```

- [ ] **Step 3: Implement flight corridor**

Create `src/scenes/ChapterFlight.jsx`:

```jsx
import MemoryPhoto from "../components/MemoryPhoto";
import { story } from "../data/story";

function corridorPosition(index) {
  const side = index % 2 === 0 ? -1 : 1;
  return [side * (1.55 + (index % 3) * 0.3), Math.sin(index * 0.72) * 0.9, -10 - index * 3.2];
}

export default function ChapterFlight({ progress }) {
  if (progress < 0.24 || progress > 0.62) return null;
  return story.memories.map((memory, index) => {
    const start = 0.28 + index * 0.018;
    return <MemoryPhoto key={memory.id} memory={memory} position={corridorPosition(index)} rotation={[0, index % 2 ? -0.22 : 0.22, 0]} range={[start, start + 0.07]} scale={0.82} />;
  });
}
```

- [ ] **Step 4: Implement 3D calendar scene**

Create `src/scenes/CalendarScene.jsx`:

```jsx
import * as THREE from "three";
import { Text } from "@react-three/drei";
import MemoryPhoto from "../components/MemoryPhoto";
import { story } from "../data/story";
import { smoothstep } from "../utils/animation";

export default function CalendarScene({ progress }) {
  if (progress < 0.52 || progress > 0.7) return null;
  const open = smoothstep(0.58, 0.66, progress);
  const days = Array.from({ length: 31 }, (_, index) => index + 1);

  return (
    <group position={[0, 0, -36]} rotation={[-0.08, 0, 0]}>
      <mesh>
        <boxGeometry args={[7.4, 5.2, 0.16]} />
        <meshStandardMaterial color="#21131f" roughness={0.52} metalness={0.14} />
      </mesh>
      <Text position={[0, 2.05, 0.12]} fontSize={0.42} color="#fff7ed" anchorX="center">Май 2025</Text>
      {days.map((day, index) => {
        const x = -2.85 + (index % 7) * 0.95;
        const y = 1.28 - Math.floor(index / 7) * 0.72;
        const selected = day === 3;
        return (
          <group key={day} position={[x, y, selected ? 0.22 + open * 0.55 : 0.12]}>
            <mesh>
              <boxGeometry args={[0.62, 0.44, 0.06]} />
              <meshStandardMaterial color={selected ? "#f97316" : "#342237"} emissive={selected ? new THREE.Color("#f97316") : new THREE.Color("#000000")} emissiveIntensity={selected ? 1.3 : 0} />
            </mesh>
            <Text position={[0, -0.02, 0.06]} fontSize={0.19} color="#fff7ed" anchorX="center">{day}</Text>
          </group>
        );
      })}
      <group position={[0, -0.55 + open * 0.85, 0.85 + open * 1.4]} scale={0.55 + open * 0.18}>
        <MemoryPhoto memory={story.memories[5]} position={[0, 0, 0]} range={[0.58, 0.68]} scale={1} />
      </group>
    </group>
  );
}
```

- [ ] **Step 5: Implement heart assembly**

Create `src/scenes/HeartAssembly.jsx`:

```jsx
import MemoryPhoto from "../components/MemoryPhoto";
import { story } from "../data/story";
import { getHeartPosition } from "../utils/curves";

export default function HeartAssembly({ progress }) {
  if (progress < 0.64 || progress > 0.83) return null;
  return story.memories.map((memory, index) => (
    <MemoryPhoto key={`heart-${memory.id}`} memory={memory} position={getHeartPosition(index, story.memories.length)} rotation={[0, 0, 0]} range={[0.66, 0.78]} scale={0.38} />
  ));
}
```

- [ ] **Step 6: Implement finale 3D glow**

Create `src/scenes/Finale.jsx`:

```jsx
import { Text } from "@react-three/drei";
import ParticleField from "../components/ParticleField";

export default function Finale({ progress }) {
  if (progress < 0.76) return null;
  return (
    <group position={[0, 0, -78]}>
      <ParticleField count={900} progress={progress} finale />
      <Text position={[0, 0.5, 0]} fontSize={0.8} color="#fff7ed" anchorX="center" anchorY="middle">
        Спасибо за этот год
      </Text>
      <mesh position={[0, -0.85, -0.12]}>
        <torusGeometry args={[0.95, 0.018, 16, 120]} />
        <meshStandardMaterial color="#f47bae" emissive="#f47bae" emissiveIntensity={1.4} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}
```

- [ ] **Step 7: Build checkpoint**

Run:

```bash
npm run build
```

Expected: FAIL because overlay components do not exist yet, or PASS if only overlays are already added by a parallel worker. Continue only after resolving imports in the next task.

---

### Task 8: Glass Overlays, HUD, Letter Reveal

**Files:**
- Create: `src/components/GlassOverlay.jsx`
- Create: `src/components/ProgressHud.jsx`
- Create: `src/components/LetterReveal.jsx`

- [ ] **Step 1: Implement progress-based glass overlay**

Create `src/components/GlassOverlay.jsx`:

```jsx
import { AnimatePresence, motion } from "framer-motion";

function getBeat(progress, story) {
  if (progress < 0.08) return { key: "intro", eyebrow: story.intro.eyebrow, title: story.intro.title, body: story.intro.body };
  if (progress < 0.16) return { key: "date", eyebrow: "Дата", title: story.anniversaryDate, body: "День, с которого начинается эта маленькая вселенная." };
  if (progress < 0.32) return { key: "memories", eyebrow: "Воспоминания", title: "Они появляются не сразу", body: "Каждый кадр всплывает медленно, как будто пространство вспоминает вместе с нами." };
  if (progress < 0.55) return { key: "flight", eyebrow: "Memory timeline", title: "Лети сквозь моменты", body: "Scroll ведёт камеру от одного кадра к другому, а каждый поворот открывает историю." };
  if (progress < 0.68) return { key: "calendar", eyebrow: "Календарь", title: "03.05.2025", body: "Одна дата становится дверью в главное воспоминание." };
  if (progress < 0.8) return { key: "heart", eyebrow: "Кульминация", title: "Смотри дальше", body: "Все фрагменты собираются в форму, которую можно понять только издалека." };
  return null;
}

export default function GlassOverlay({ progress, story }) {
  const beat = getBeat(progress, story);
  return (
    <div className="glass-overlay" aria-live="polite">
      <AnimatePresence mode="wait">
        {beat && (
          <motion.article key={beat.key} className="glass-panel" initial={{ opacity: 0, y: 18, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -12, filter: "blur(8px)" }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
            <p className="eyebrow">{beat.eyebrow}</p>
            <h1 className="headline">{beat.title}</h1>
            <p className="body-copy">{beat.body}</p>
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 2: Implement progress HUD**

Create `src/components/ProgressHud.jsx`:

```jsx
export default function ProgressHud({ progress }) {
  const percent = Math.round(progress * 100);
  return (
    <aside className="progress-hud" aria-label="Прогресс истории">
      <div className="progress-track">
        <div className="progress-fill" style={{ transform: `scaleX(${progress})` }} />
      </div>
      <p>{percent}% memory timeline</p>
    </aside>
  );
}
```

- [ ] **Step 3: Implement finale letter reveal**

Create `src/components/LetterReveal.jsx`:

```jsx
import { AnimatePresence, motion } from "framer-motion";

export default function LetterReveal({ progress, story }) {
  const visible = progress > 0.88;
  return (
    <div className="letter-reveal" aria-live="polite">
      <AnimatePresence>
        {visible && (
          <motion.article className="letter-card" initial={{ opacity: 0, y: 42, rotateX: 18 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <p className="eyebrow">Для {story.recipient}</p>
            <h2>{story.finale.title}</h2>
            <p>{story.finale.letter}</p>
            <strong>{story.signature}</strong>
            <span className="heartbeat" aria-hidden="true" />
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
}
```

Append to `src/styles.css`:

```css
.progress-hud p { margin: 9px 0 0; font-size: 12px; letter-spacing: .08em; text-transform: uppercase; }
.letter-card { position: relative; width: min(560px, calc(100vw - 32px)); padding: clamp(24px, 5vw, 44px); border: 1px solid rgba(255,244,232,.24); border-radius: 34px; background: linear-gradient(145deg, rgba(255,255,255,.14), rgba(255,255,255,.055)); box-shadow: 0 30px 120px rgba(0,0,0,.5); backdrop-filter: blur(22px); text-align: left; transform-style: preserve-3d; }
.letter-card h2 { margin: 0 0 16px; font-size: clamp(34px, 7vw, 76px); line-height: .96; letter-spacing: -.05em; }
.letter-card p:not(.eyebrow) { color: rgba(255,247,237,.75); font-size: clamp(16px, 2vw, 20px); line-height: 1.6; }
.letter-card strong { display: block; margin-top: 24px; color: #fff7ed; font-size: 22px; }
.heartbeat { position: absolute; right: 28px; bottom: 28px; width: 24px; height: 24px; background: #f47bae; transform: rotate(45deg); animation: heartbeat 1.25s ease-in-out infinite; box-shadow: 0 0 34px rgba(244,123,174,.7); }
.heartbeat::before, .heartbeat::after { content: ""; position: absolute; width: 24px; height: 24px; border-radius: 50%; background: #f47bae; }
.heartbeat::before { left: -12px; top: 0; }
.heartbeat::after { left: 0; top: -12px; }
@keyframes heartbeat { 0%, 100% { transform: rotate(45deg) scale(1); } 35% { transform: rotate(45deg) scale(1.18); } 55% { transform: rotate(45deg) scale(.96); } }
```

- [ ] **Step 4: Build checkpoint**

Run:

```bash
npm run build
```

Expected: PASS. If it fails, fix the exact import or syntax error reported by Vite before moving on.

---

### Task 9: Production Polish And Performance Guards

**Files:**
- Modify: `src/components/CanvasStage.jsx`
- Modify: `src/components/MemoryPhoto.jsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Replace direct `window` usage in render with guarded helpers**

Modify components that read `window` during render to use guards:

```js
const viewportWidth = typeof window === "undefined" ? 1440 : window.innerWidth;
const webglAvailable = typeof window !== "undefined" && Boolean(window.WebGLRenderingContext);
```

Expected: Vite build remains SSR-safe enough for static prerender tools and tests.

- [ ] **Step 2: Add texture error fallback material**

In `MemoryPhoto.jsx`, set `texture.colorSpace = THREE.SRGBColorSpace` after `useTexture`, and keep the frame/backside visible if the image fails. Use this guard before material creation:

```js
if (texture) texture.colorSpace = THREE.SRGBColorSpace;
```

Expected: photos render with correct color space in production.

- [ ] **Step 3: Improve mobile scroll height and safe areas**

Confirm `src/styles.css` contains:

```css
.experience-shell { min-height: 100dvh; }
.glass-overlay, .progress-hud, .letter-reveal { padding-bottom: env(safe-area-inset-bottom); }
@media (max-width: 640px) { .scroll-timeline { height: 760vh; } }
```

Expected: mobile story remains scrollable and overlays avoid browser chrome/notches.

- [ ] **Step 4: Full automated verification**

Run:

```bash
npm test -- --run && npm run build
```

Expected: all tests PASS and Vite build exits with code `0`.

---

### Task 10: Local Smoke Check

**Files:**
- No file changes unless a smoke check reveals a defect.

- [ ] **Step 1: Start local dev server**

Run:

```bash
npm run dev -- --host 127.0.0.1
```

Expected: Vite prints a local URL, usually `http://127.0.0.1:5173/`.

- [ ] **Step 2: Desktop smoke checklist**

Open the local URL in a desktop viewport and verify:

```text
PASS: dark WebGL scene appears.
PASS: scroll moves camera through 3D space.
PASS: intro photo appears before memory corridor.
PASS: overlay text changes with scroll.
PASS: photos flip on scroll segments.
PASS: calendar scene highlights 03.05.2025.
PASS: heart assembly appears near 70% progress.
PASS: finale letter shows Для Нурданы and Асылхана.
```

- [ ] **Step 3: Mobile smoke checklist**

Use responsive viewport around `375px` width and verify:

```text
PASS: no horizontal overflow.
PASS: overlay text is readable.
PASS: scroll remains usable.
PASS: final letter fits the viewport.
PASS: performance remains acceptable for an Awwwards-priority visual build.
```

- [ ] **Step 4: Reduced-motion smoke checklist**

Enable `prefers-reduced-motion` in browser devtools and verify:

```text
PASS: the story still progresses in order.
PASS: motion intensity is lower.
PASS: text remains readable.
PASS: final letter appears.
```

- [ ] **Step 5: Final verification report**

Record the exact commands and results in the handoff:

```text
npm test -- --run: PASS/FAIL with summary
npm run build: PASS/FAIL with summary
npm run dev -- --host 127.0.0.1: local URL
Manual smoke: desktop/mobile/reduced-motion results
```

---

## Self-Review

Spec coverage:

- React + Vite: Task 1.
- Three.js/R3F/drei/postprocessing: Tasks 1, 5, 6, 7.
- GSAP + ScrollTrigger + Lenis: Task 3.
- Framer Motion: Task 8.
- Glassmorphism overlays: Tasks 4 and 8.
- Cinematic animation/parallax/particles: Tasks 5, 7, 8, 9.
- Memory timeline and 10+ memories: Tasks 2, 7.
- Interactive calendar with `03.05.2025`: Task 7.
- Heart climax and final letter: Tasks 7 and 8.
- Responsive/reduced-motion safeguards: Tasks 2, 3, 4, 5, 9, 10.
- Verification: Tasks 2, 3, 4, 5, 7, 8, 9, 10.

Placeholder scan:

- The plan contains no placeholder markers or deferred-work wording.
- Checkboxes are execution tracking syntax required by the plan format.

Type consistency:

- `story.memories[]` fields match tests and component usage: `id`, `image`, `title`, `dateLabel`, `story`, `accent`.
- `progress` is normalized `0..1` across hooks, components, and scenes.
- Camera state uses object shape `{ position: {x,y,z}, target: {x,y,z}, fov }` consistently.
