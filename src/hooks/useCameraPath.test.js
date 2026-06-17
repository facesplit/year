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
