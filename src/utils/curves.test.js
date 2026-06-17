import { describe, expect, it } from "vitest";
import { cameraKeyframes, getHeartPosition, getScatterPosition } from "./curves";

describe("composition curves", () => {
  it("provides distinct scatter and heart positions for assembly", () => {
    const heart = getHeartPosition(3, 12);
    const scatter = getScatterPosition(3, 12);
    expect(scatter).toHaveLength(3);
    expect(scatter).not.toEqual(heart);
    expect(Math.abs(scatter[0])).toBeGreaterThan(Math.abs(heart[0]));
  });

  it("brings the final camera close enough to read the restaurant sign", () => {
    const finalFrame = cameraKeyframes.at(-1);
    expect(finalFrame.position[2]).toBe(-70);
  });
});
