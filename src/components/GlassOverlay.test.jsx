import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, expect, it } from "vitest";
import GlassOverlay from "./GlassOverlay";
import { story } from "../data/story";

describe("GlassOverlay", () => {
  it("renders cinematic text without card panel styling", () => {
    render(<GlassOverlay progress={0} story={story} />);
    expect(screen.getByText("Помнишь этот день?")).toBeInTheDocument();
    expect(document.querySelector(".glass-panel")).toBeNull();
    expect(document.querySelector(".story-copy")).not.toBeNull();
  });
});
