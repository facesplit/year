import { describe, expect, it } from "vitest";
import ChapterMemories from "./ChapterMemories";
import { story } from "../data/story";

describe("ChapterMemories", () => {
  it("unmounts before flight callouts take over", () => {
    expect(ChapterMemories({ progress: 0.34 })).toBeNull();
  });

  it("uses the four dedicated opening photos", () => {
    const photos = ChapterMemories({ progress: 0.2 });
    expect(photos).toHaveLength(4);
    expect(photos.map((photo) => photo.props.memory)).toEqual(story.openingMemories);
  });
});
