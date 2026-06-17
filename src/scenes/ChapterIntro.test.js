import { describe, expect, it } from "vitest";
import ChapterIntro from "./ChapterIntro";
import { story } from "../data/story";

describe("ChapterIntro", () => {
  it("uses the dedicated hero photo instead of the memory timeline", () => {
    const photo = ChapterIntro({ progress: 0.05 });
    expect(photo.props.memory).toBe(story.heroMemory);
  });
});
