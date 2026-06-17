import { describe, expect, it } from "vitest";
import { getPhotoFlipRotation, getPhotoFrameSize, getPhotoOpacity, getPhotoPlaneSize } from "./MemoryPhoto";

describe("MemoryPhoto", () => {
  it("does not reveal a backside by default", () => {
    expect(getPhotoFlipRotation(1)).toBe(0);
  });

  it("can still opt into flipping when a scene explicitly asks for it", () => {
    expect(getPhotoFlipRotation(1, true)).toBeCloseTo(Math.PI);
  });

  it("fades photos in near the camera and fades them out gradually", () => {
    expect(getPhotoOpacity(0)).toBe(0);
    expect(getPhotoOpacity(0.14)).toBeGreaterThan(0);
    expect(getPhotoOpacity(0.45)).toBeCloseTo(1);
    expect(getPhotoOpacity(0.88)).toBeLessThan(1);
    expect(getPhotoOpacity(1)).toBe(0);
  });

  it("sizes each photo plane and frame from the original image aspect ratio", () => {
    expect(getPhotoPlaneSize(1600, 900)).toEqual([2.9, 1.63125]);
    expect(getPhotoPlaneSize(900, 1600)).toEqual([1.63125, 2.9]);
    expect(getPhotoFrameSize([2.9, 1.63125])).toEqual([3.12, 1.85125]);
  });
});
