import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("Finale scene", () => {
  it("uses restaurant invitation text for the 3D finale", () => {
    const source = readFileSync(join(process.cwd(), "src", "scenes", "Finale.jsx"), "utf8");
    expect(source).toContain("story.finale.title");
    expect(source).not.toContain("Спасибо за этот год");
  });

  it("does not show the restaurant invitation over the calendar and photo transition", () => {
    const source = readFileSync(join(process.cwd(), "src", "scenes", "Finale.jsx"), "utf8");
    expect(source).toContain("if (progress < 0.86) return null;");
  });

  it("keeps the finale readable as the end of the 3D path", () => {
    const source = readFileSync(join(process.cwd(), "src", "scenes", "Finale.jsx"), "utf8");
    expect(source).toContain("FINALE_DEPTH = -86");
    expect(source).toContain('className="finale-invitation-html"');
    expect(source).toContain("story.finale.letter");
    expect(source).not.toContain('color="#fff7ed"');
  });

  it("adds a dense petal layer and a visible road leading to the invitation", () => {
    const source = readFileSync(join(process.cwd(), "src", "scenes", "Finale.jsx"), "utf8");
    expect(source).toContain("count={3600}");
    expect(source).toContain('name="finale-road"');
    expect(source).toContain('name="finale-petal-guide"');
    expect(source).toContain("finalePetalGuide.map");
  });

  it("wraps the restaurant invitation with a light petal arch", () => {
    const source = readFileSync(join(process.cwd(), "src", "scenes", "Finale.jsx"), "utf8");
    expect(source).toContain("finalePetalArch.map");
    expect(source).toContain('name="finale-petal-arch"');
  });

  it("renders editable restaurant details below the invitation copy", () => {
    const source = readFileSync(join(process.cwd(), "src", "scenes", "Finale.jsx"), "utf8");
    expect(source).toContain("story.finale.details.map");
    expect(source).toContain("detail.label");
    expect(source).toContain("detail.value");
  });

  it("keeps finale text on a readable front layer at the closest camera point", () => {
    const source = readFileSync(join(process.cwd(), "src", "scenes", "Finale.jsx"), "utf8");
    expect(source).toContain("FINALE_TEXT_Z = 2.05");
    expect(source).toContain('name="finale-invitation-panel"');
    expect(source).toContain('className="finale-invitation-html"');
  });

  it("places the petal arch at the end of the path with a Nedelka sign", () => {
    const source = readFileSync(join(process.cwd(), "src", "scenes", "Finale.jsx"), "utf8");
    expect(source).toContain("FINALE_ARCH_Z = 0.72");
    expect(source).toContain("FINALE_SIGN_Z = 1.22");
    expect(source).toContain("FINALE_SIGN_Y = 2.24");
    expect(source).toContain('name="finale-restaurant-sign"');
    expect(source).toContain("restaurantName");
    expect(source).toContain('className="finale-restaurant-sign-html"');
  });

  it("uses anchored Html for finale copy so transparent WebGL layers cannot hide the text", () => {
    const source = readFileSync(join(process.cwd(), "src", "scenes", "Finale.jsx"), "utf8");
    expect(source).toContain("Html");
    expect(source).toContain("distanceFactor={6.2}");
    expect(source).toContain("zIndexRange={[40, 20]}");
  });
});
