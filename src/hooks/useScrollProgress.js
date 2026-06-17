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
