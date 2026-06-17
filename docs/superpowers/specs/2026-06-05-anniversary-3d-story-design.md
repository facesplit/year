# Anniversary 3D Story Design

Status: design approved; pending written spec review  
Date: 2026-06-05  
Project folder: `C:\Users\user\Desktop\My_project\8 march\anniversary-3d-story`

## Goal

Create a production-ready anniversary website that feels like an interactive cinematic 3D film controlled by scroll. The user should not feel like they are scrolling a normal page; scroll should move a camera through a spatial memory timeline.

The experience is for Nurdana, signed by Asylkhan, with the central anniversary date `03.05.2025`.

## Required Stack

- React + Vite.
- Three.js.
- React Three Fiber via `@react-three/fiber`.
- Drei via `@react-three/drei`.
- GSAP + ScrollTrigger for scroll-linked timelines.
- Lenis for smooth inertial scroll.
- Framer Motion for glass overlay transitions, story text, and letter reveal.
- Add `@react-three/postprocessing` for bloom/depth-of-field because the chosen art direction depends on cinematic postprocessing.

## Visual Direction

Chosen direction: `Warm Nocturne`.

The site uses a dark velvet spatial environment with warm amber/pink highlights, soft bloom, dreamy depth, light particles, glassmorphism overlays, subtle parallax, and cinematic camera motion. The priority is Awwwards-level visual impact over maximum low-end mobile performance, while still keeping adaptive mobile safeguards.

Core visual tokens:

- Background: near-black warm navy, around `#0F0F23`.
- Primary accent: warm amber/orange, around `#F97316`.
- Secondary accent: nostalgic pink/rose glow.
- Surfaces: translucent glass panels with blur, soft borders, and low-opacity gradients.
- Typography: clean cinematic sans-serif, preferably Inter or a similar variable font.

## Experience Model

Use a `Single Cinematic Path` architecture.

One fixed WebGL canvas renders the full 3D world. The DOM page only provides invisible scroll height and glass overlay text. Scroll progress from `0` to `1` drives camera position, camera rotation, scene transitions, photo flips, calendar reveal, heart assembly, and finale effects.

The user should not see standard page sections, buttons, menus, or card grids. A small glass progress/timeline HUD is allowed as an atmospheric indicator, not as navigation.

## Story Timeline

Progress ranges:

- `0-12%`: Chapter 1, Everything Begins.
- `12-30%`: Chapter 2, Memories Appear.
- `30-55%`: Chapter 3, Flight Through Memories.
- `55-66%`: Interactive Calendar Scene.
- `66-78%`: Climax, Heart Assembly.
- `78-100%`: Finale, Stars + Letter.

## Scenes

### Chapter 1: Everything Begins

The scene starts almost black. One photo floats in the center of space. The camera begins close and static. As the user scrolls, the camera slowly pulls back and reveals that the photo is part of a larger memory space.

Overlay sequence:

- `Помнишь этот день?`
- `03.05.2025`
- A short poetic story line loaded from `data/story.js`.

### Chapter 2: Memories Appear

The first photo wakes up. Additional photos emerge from it with staggered delay, like memories being released. Photos float in 3D space with small rotational drift, warm rim light, and particle trails. Camera movement starts to become forward motion through space.

### Chapter 3: Flight Through Memories

At least 10 memories are placed along a 3D chain. The current temporary assets come from `C:\Users\user\Desktop\My_project\8 march\assets` and can repeat `girl1.jpeg` through `girl4.jpeg` until final photos are provided.

Each memory photo behavior:

- The camera approaches the photo until it fills most of the screen.
- The photo holds briefly in space.
- The next scroll segment flips the photo in 3D.
- The backside shows a glass/card story panel.
- The camera then continues to the next memory.

### Interactive Calendar Scene

A large 3D calendar appears in the middle of the journey. It fills the environment and acts like a spatial object, not a flat UI widget. Important dates are highlighted, with the camera flying toward `03.05.2025`.

At close range, the date opens/reveals, and a memory photo or mini-scene flies out of the calendar cell.

### Climax: Heart Assembly

At about 70% progress, all memory photos begin moving into a purposeful formation. The user initially sees visual chaos. Then the camera pulls back and the photos form a heart shape in 3D space. The assembly should feel magical and smooth, driven by GSAP/R3F interpolation.

### Finale

The heart dissolves into star particles. The camera flies farther into the dark warm space. The final copy appears:

`Спасибо за этот год`

Then a glass letter reveal appears:

- Recipient: `Для Нурданы`.
- Signature: `Асылхана`.
- Final effect: soft heartbeat pulse in a heart-shaped glow.

## Project Structure

```text
src/
  assets/
    photos/
    textures/
  components/
    CanvasStage.jsx
    CinematicCamera.jsx
    MemoryPhoto.jsx
    PhotoBackStory.jsx
    ParticleField.jsx
    GlassOverlay.jsx
    ProgressHud.jsx
    LetterReveal.jsx
  scenes/
    ChapterIntro.jsx
    ChapterMemories.jsx
    ChapterFlight.jsx
    CalendarScene.jsx
    HeartAssembly.jsx
    Finale.jsx
  hooks/
    useScrollProgress.js
    useCameraPath.js
    useLenisScroll.js
    useReducedMotion.js
  data/
    story.js
  utils/
    animation.js
    curves.js
    responsive.js
```

## Data Model

`data/story.js` stores:

- Anniversary date: `03.05.2025`.
- Recipient: `Нурданы`.
- Signature: `Асылхана`.
- Intro text and finale letter text.
- A `memories` array with 10+ entries.
- Each memory includes `id`, `image`, `title`, `dateLabel`, `story`, `positionHint`, and optional `accent`.

Photo references should point to copied files under `src/assets/photos`, not the external source folder.

## Scroll And Camera System

`useLenisScroll` initializes Lenis and synchronizes it with GSAP ScrollTrigger updates.

`useScrollProgress` exposes normalized progress from ScrollTrigger. The scroll container height should be large enough to support a slow cinematic journey.

`useCameraPath` maps progress to a camera rig path. The path should use named keyframes or a curve utility so scene ranges remain readable. Camera movement must drive the experience, not DOM section snapping.

`CinematicCamera` applies per-frame camera position, rotation, and lookAt interpolation inside the R3F render loop.

## 3D Photo System

`MemoryPhoto` is a reusable R3F component using plane geometry, texture materials, and a backside story panel. It receives progress ranges for reveal, focus, flip, and exit.

Photo design:

- Slight physical thickness or framed border.
- Warm edge/rim lighting.
- Subtle hover-like drift even without pointer interaction.
- Flip controlled by scroll, not click.
- Back face readable as glass story card.

## Effects

`ParticleField` provides star dust, warm floaters, and finale dissolve particles. Density scales by viewport and device capability.

Postprocessing:

- Bloom for warm highlights.
- Depth of field for cinematic focus shifts.
- Vignette or subtle noise if lightweight enough.

Parallax:

- Near/far particle layers respond slightly differently to scroll progress.
- Glass overlays can have small Framer Motion y/parallax shifts.

## Responsive Design

Desktop uses the full experience: more photos visible in depth, stronger bloom, higher particle count, and full depth of field.

Tablet reduces particle density and far-background object count.

Mobile keeps the same story and camera path but applies:

- Lower DPR cap.
- Lower particle count.
- Reduced postprocessing intensity.
- Larger overlay typography.
- Fewer simultaneous glass panels.
- Safer spacing for notches and browser chrome.

`prefers-reduced-motion` must be supported:

- Disable or reduce Lenis inertia.
- Reduce camera travel intensity.
- Reduce particles and postprocessing.
- Preserve the same story order and readable text.

## Error Handling And Fallbacks

- If a texture fails to load, render a warm gradient placeholder plane with the memory title.
- If WebGL is unavailable, show a static fallback with the final message and selected photos.
- Do not let overlay elements block scroll.
- Avoid uncaught errors from missing story fields by providing defaults.

## Verification Plan

Commands:

- `npm install`
- `npm run build`
- `npm run dev -- --host 127.0.0.1`

Manual smoke checks:

- Desktop viewport: camera path, memory flips, calendar reveal, heart assembly, finale letter.
- Mobile viewport around 375px: no horizontal overflow, readable text, acceptable scroll performance.
- Tablet viewport around 768px: camera path and overlays remain balanced.
- Reduced motion: story remains usable and readable.

## Implementation Notes

- Keep code modular but avoid unnecessary abstractions.
- Use small comments only where timeline/camera ranges are non-obvious.
- Add `.superpowers/`, `node_modules/`, and build output to `.gitignore` when scaffolding the project.
- Do not use normal vertical content sections as the primary UX.
- The final implementation should feel like a scroll-controlled 3D film, not a decorated landing page.
