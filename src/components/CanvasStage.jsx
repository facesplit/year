import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import CalendarScene from "../scenes/CalendarScene";
import ChapterFlight from "../scenes/ChapterFlight";
import ChapterIntro from "../scenes/ChapterIntro";
import ChapterMemories from "../scenes/ChapterMemories";
import Finale from "../scenes/Finale";
import HeartAssembly from "../scenes/HeartAssembly";
import { getDprRange, getParticleBudget, getViewportProfile } from "../utils/responsive";
import CinematicCamera from "./CinematicCamera";
import NaturePath from "./NaturePath";
import ParticleField from "./ParticleField";

function WebGLUnavailable({ fallback }) {
  return <div className="canvas-stage">{fallback}</div>;
}

export default function CanvasStage({ progress, reducedMotion, fallback }) {
  const viewportWidth = typeof window === "undefined" ? 1440 : window.innerWidth;
  const webglAvailable = typeof window !== "undefined" && Boolean(window.WebGLRenderingContext);
  const profile = useMemo(() => getViewportProfile(viewportWidth), [viewportWidth]);
  const dpr = getDprRange(profile.name);
  const particleCount = getParticleBudget(profile.name, reducedMotion);

  if (!webglAvailable) return <WebGLUnavailable fallback={fallback} />;

  return (
    <div className="canvas-stage">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0.15, 8], fov: 42 }}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        performance={{ min: 0.45 }}
        style={{ width: "100%", height: "100%" }}
      >
        <color attach="background" args={["#f6d6c9"]} />
        <fog attach="fog" args={["#f6d6c9", 20, 108]} />
        <ambientLight intensity={0.92} />
        <pointLight position={[4, 5, 4]} intensity={5.8} color="#f3a6bd" />
        <pointLight position={[-5, 2, -16]} intensity={4.2} color="#ffd1bf" />
        <CinematicCamera progress={progress} reducedMotion={reducedMotion} />
        <Suspense fallback={null}>
          <ParticleField count={particleCount} progress={progress} finale={progress > 0.78} />
          <NaturePath progress={progress} />
          <ChapterIntro progress={progress} />
          <ChapterMemories progress={progress} />
          <ChapterFlight progress={progress} />
          <CalendarScene progress={progress} />
          <HeartAssembly progress={progress} />
          <Finale progress={progress} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
