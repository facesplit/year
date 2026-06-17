import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("PhotoBackStory CSS", () => {
  it("renders story as a sequential callout connected to a photo", () => {
    const css = readFileSync(join(process.cwd(), "src", "styles.css"), "utf8");
    expect(css).toContain(".photo-story-callout");
    expect(css).toContain(".story-callout-line");
    expect(css).toContain("min-width: 580px");
    expect(css).toContain("width: 460px");
    expect(css).toContain("background: linear-gradient(145deg, rgba(255, 246, 242");
    expect(css).toContain("color: #4b2238");
    expect(css).toContain("font-size: clamp(30px");
    expect(css).toContain("animation: calloutIn");
  });

  it("keeps transformed callouts free of backdrop blur for smooth scrolling", () => {
    const css = readFileSync(join(process.cwd(), "src", "styles.css"), "utf8");
    expect(css).not.toMatch(/\.story-callout-panel\s*\{[^}]*backdrop-filter/);
  });
});
