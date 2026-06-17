import { describe, expect, it } from "vitest";
import { animalSprites } from "./animalSprites";

describe("animalSprites", () => {
  it("uses the seven GIF animal assets from the shared assets folder", () => {
    expect(animalSprites).toHaveLength(7);
    expect(animalSprites.every((sprite) => sprite.src.endsWith(".gif"))).toBe(true);
  });
});
