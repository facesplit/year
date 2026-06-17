import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("App structure", () => {
  it("does not render the finale as a fixed popup overlay", () => {
    const source = readFileSync(join(process.cwd(), "src", "App.jsx"), "utf8");
    expect(source).not.toContain("LetterReveal");
    expect(source).toContain("<CanvasStage");
    expect(source).toContain("<GlassOverlay");
  });
});
