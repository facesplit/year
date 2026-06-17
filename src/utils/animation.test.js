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
