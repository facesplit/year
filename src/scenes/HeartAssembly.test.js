import { describe, expect, it } from "vitest";
import { HEART_ASSEMBLY_END, HEART_PHOTO_RANGE } from "./HeartAssembly";

describe("HeartAssembly", () => {
  it("clears photo cards before the restaurant finale becomes the focus", () => {
    expect(HEART_ASSEMBLY_END).toBeLessThanOrEqual(0.88);
    expect(HEART_PHOTO_RANGE[1]).toBeLessThanOrEqual(0.88);
  });
});
