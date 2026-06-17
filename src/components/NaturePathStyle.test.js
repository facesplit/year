import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("NaturePath scene", () => {
  it("renders road, ground details, and sky details without floating side trees", () => {
    const source = readFileSync(join(process.cwd(), "src", "components", "NaturePath.jsx"), "utf8");
    expect(source).toContain("nature-road");
    expect(source).toContain("nature-grass");
    expect(source).toContain("nature-flower");
    expect(source).toContain("nature-lawn-tree");
    expect(source).not.toContain("nature-tree");
    expect(source).not.toContain("nature-side-sakura");
    expect(source).not.toContain("nature-mountain");
    expect(source).toContain("nature-shrub");
    expect(source).toContain("nature-firefly");
    expect(source).toContain("nature-lantern");
    expect(source).toContain("nature-garland-light");
    expect(source).toContain("nature-cloud");
    expect(source).toContain("nature-sun");
    expect(source).not.toContain("<cylinderGeometry args={[0.025, 0.035, 0.96, 8]} />");
  });

  it("keeps nature layers visible on the light background", () => {
    const source = readFileSync(join(process.cwd(), "src", "components", "NaturePath.jsx"), "utf8");
    expect(source).toContain("opacity={0.68}");
    expect(source).toContain("opacity={0.64}");
    expect(source).toContain("opacity={0.78}");
    expect(source).not.toContain("opacity={0.28}");
    expect(source).not.toContain("opacity={0.32}");
  });

  it("keeps animal GIF sprites lightweight after windowing them", () => {
    const source = readFileSync(join(process.cwd(), "src", "components", "NaturePath.jsx"), "utf8");
    expect(source).toContain("visibleAnimalIndices.map");
    expect(source).toContain("getAnimalPathOpacity(progress, index)");
    expect(source).toContain("zIndexRange={[1, 0]}");
    expect(source).toContain("transition: \"opacity 720ms ease\"");
    expect(source).not.toContain(" occlude");
  });

  it("keeps late GIFs mounted without drawing the old foreground ground over the finale", () => {
    const source = readFileSync(join(process.cwd(), "src", "components", "NaturePath.jsx"), "utf8");
    expect(source).toContain("const animalSpritesLayer =");
    expect(source).toContain("if (progress > 0.76) return <group>{animalSpritesLayer}</group>;");
    expect(source).not.toContain("ANIMAL_PATH_FADE_END");
  });
});
