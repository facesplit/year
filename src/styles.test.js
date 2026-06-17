import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("warm visual palette", () => {
  it("uses a light peach skin-tone galaxy background", () => {
    const css = readFileSync(join(process.cwd(), "src", "styles.css"), "utf8");
    expect(css).toContain("--bg: #f6d6c9");
    expect(css).toContain("--bg-soft: #fff1e8");
    expect(css).toContain("rgba(255, 240, 232");
    expect(css).toContain("--ink: #4b2238");
  });

  it("adds a soft parallax nature path and animal sprite styling", () => {
    const css = readFileSync(join(process.cwd(), "src", "styles.css"), "utf8");
    expect(css).toContain(".animal-sprite");
    expect(css).toContain(".nature-ground-glow");
    expect(css).toContain("drop-shadow(0 18px 24px rgba(120, 76, 89, 0.24))");
    expect(css).toContain("mix-blend-mode: multiply");
  });

  it("styles the finale invitation as a readable 3D-anchored Html card", () => {
    const css = readFileSync(join(process.cwd(), "src", "styles.css"), "utf8");
    expect(css).toContain(".finale-invitation-html");
    expect(css).toContain(".finale-restaurant-sign-html");
    expect(css).not.toMatch(/\.finale-invitation-html\s*\{[^}]*position:\s*fixed/);
  });
});
