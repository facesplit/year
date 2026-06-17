import { describe, expect, it } from "vitest";
import ChapterFlight, { getActiveFlightMemoryIndex, getFlightCorridorPosition, getVisibleFlightMemoryIndices } from "./ChapterFlight";

describe("ChapterFlight", () => {
  it("shows one memory story at a time", () => {
    expect(getActiveFlightMemoryIndex(0.29, 12)).toBe(0);
    expect(getActiveFlightMemoryIndex(0.36, 12)).toBeGreaterThan(0);
    expect(getActiveFlightMemoryIndex(0.7, 12)).toBe(-1);
  });

  it("keeps corridor photos front-facing while callouts advance", () => {
    const photos = ChapterFlight({ progress: 0.34 });
    expect(photos.filter((photo) => photo.props.showStory)).toHaveLength(1);
    expect(photos.every((photo) => photo.props.enableFlip === false)).toBe(true);
  });

  it("spaces flight photos wider so callouts have room", () => {
    const photos = ChapterFlight({ progress: 0.34 });
    expect(Math.abs(photos[0].props.position[0])).toBeGreaterThanOrEqual(2);
    expect(Math.abs(photos[1].props.position[2] - photos[0].props.position[2])).toBeGreaterThanOrEqual(2);
  });

  it("keeps late memories near the camera path instead of starting far away", () => {
    expect(getFlightCorridorPosition(11)[2]).toBeGreaterThanOrEqual(-36);
  });

  it("keeps fading photos mounted after they leave the active callout window", () => {
    expect(getVisibleFlightMemoryIndices(0.36, 12)).toContain(0);
    expect(getVisibleFlightMemoryIndices(0.58, 12)).toEqual([8, 9, 10, 11]);
    expect(ChapterFlight({ progress: 0.58 })).toHaveLength(4);
  });

  it("stays mounted until the last photo can fade out transparently", () => {
    expect(getVisibleFlightMemoryIndices(0.64, 12)).toContain(11);
    expect(ChapterFlight({ progress: 0.64 })).not.toBeNull();
    expect(ChapterFlight({ progress: 0.7 })).toBeNull();
    expect(getActiveFlightMemoryIndex(0.64, 12)).toBe(-1);
  });
});
