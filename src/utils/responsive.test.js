import { describe, expect, it } from "vitest";
import { getDprRange, getParticleBudget, getViewportProfile } from "./responsive";

describe("responsive helpers", () => {
  it("classifies viewport profiles", () => {
    expect(getViewportProfile(375).name).toBe("mobile");
    expect(getViewportProfile(800).name).toBe("tablet");
    expect(getViewportProfile(1440).name).toBe("desktop");
  });

  it("caps DPR and particle budgets by profile", () => {
    expect(getDprRange("mobile")).toEqual([1, 1]);
    expect(getDprRange("desktop")[1]).toBeLessThanOrEqual(1.25);
    expect(getParticleBudget("mobile", false)).toBeLessThan(getParticleBudget("desktop", false));
    expect(getParticleBudget("desktop", false)).toBeLessThanOrEqual(5200);
    expect(getParticleBudget("desktop", true)).toBeLessThan(getParticleBudget("desktop", false));
  });

  it("uses a denser pink petal budget while keeping DPR pinned", () => {
    expect(getDprRange("desktop")).toEqual([1, 1]);
    expect(getParticleBudget("mobile", false)).toBeGreaterThanOrEqual(1100);
    expect(getParticleBudget("tablet", false)).toBeGreaterThanOrEqual(2600);
    expect(getParticleBudget("desktop", false)).toBeGreaterThanOrEqual(4400);
  });

  it("disables postprocessing by default for smoother scroll", () => {
    expect(getViewportProfile(1440).postprocessing).toBe(0);
  });
});
