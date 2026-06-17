import { useRef } from "react";
import CanvasStage from "./components/CanvasStage";
import GlassOverlay from "./components/GlassOverlay";
import ProgressHud from "./components/ProgressHud";
import { story } from "./data/story";
import { useLenisScroll } from "./hooks/useLenisScroll";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { useScrollProgress } from "./hooks/useScrollProgress";

function WebGLFallback() {
  return (
    <section className="fallback-card" aria-label="Приглашение в ресторан">
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
  if (typeof window !== "undefined") window.__ANNIVERSARY_PROGRESS__ = progress;
  useLenisScroll(scrollRef, reducedMotion);

  return (
    <main className="experience-shell">
      <CanvasStage progress={progress} reducedMotion={reducedMotion} fallback={<WebGLFallback />} />
      <GlassOverlay progress={progress} story={story} />
      <ProgressHud progress={progress} />
      <div ref={scrollRef} className="scroll-timeline" aria-hidden="true" />
    </main>
  );
}
