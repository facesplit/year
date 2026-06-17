import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("ParticleField", () => {
  it("makes sakura-like particles visible on the light background", () => {
    const source = readFileSync(join(process.cwd(), "src", "components", "ParticleField.jsx"), "utf8");
    expect(source).toContain('new THREE.Color("#f47bae")');
    expect(source).toContain("size={0.076}");
    expect(source).toContain("opacity={0.82}");
    expect(source).toContain("sakura petal");
  });
});
