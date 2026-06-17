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
