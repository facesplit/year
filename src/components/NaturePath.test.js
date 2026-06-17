import { describe, expect, it } from "vitest";
import {
  animalPathSlots,
  sideFireflies,
  sideLanterns,
  lawnTrees,
  sideShrubs,
  getAnimalPathOpacity,
  getAnimalPathPosition,
  getFireflyPosition,
  getFlowerPosition,
  getGrassTuftPosition,
  getHillLayerPosition,
  getLanternPosition,
  getLawnTreePosition,
  getShrubPosition,
  getVisibleAnimalPathIndices,
} from "./NaturePath";

describe("NaturePath", () => {
  it("places animal sprites on the ground beside the 3D memory path", () => {
    expect(getAnimalPathPosition(0)).toEqual([-7.2, -3.45, -12]);
    expect(getAnimalPathPosition(1)[1]).toBeLessThan(-3.3);
    expect(Math.abs(getAnimalPathPosition(1)[0])).toBeGreaterThan(7);
    expect(getAnimalPathPosition(6)[2]).toBeLessThan(-24);
  });

  it("continues duplicate cat GIFs until the calendar path", () => {
    expect(animalPathSlots).toHaveLength(14);
    expect(getAnimalPathPosition(13)[2]).toBeLessThan(-48);
  });

  it("keeps every animal GIF mounted after it appears", () => {
    const early = getVisibleAnimalPathIndices(0.36);
    const later = getVisibleAnimalPathIndices(0.52);
    expect(early.length).toBeGreaterThan(0);
    expect(later.length).toBeGreaterThan(early.length);
    for (const index of early) expect(later).toContain(index);
    expect(getVisibleAnimalPathIndices(0.9)).toEqual(animalPathSlots.map((_, index) => index));
  });

  it("does not fade animal GIFs away when the camera approaches them", () => {
    expect(getAnimalPathOpacity(0.52, 7)).toBeGreaterThan(0.5);
    expect(getAnimalPathOpacity(0.52, 8)).toBe(1);
    expect(getAnimalPathOpacity(0.64, 9)).toBe(1);
    expect(getAnimalPathOpacity(0.68, 9)).toBe(1);
  });

  it("keeps animal GIFs mounted late without a finale fade-out", () => {
    expect(getVisibleAnimalPathIndices(0.8).length).toBeGreaterThan(0);
    expect(getAnimalPathOpacity(0.8, 10)).toBe(1);
    expect(getAnimalPathOpacity(0.88, 10)).toBe(1);
  });

  it("stacks parallax nature layers deeper than the foreground path", () => {
    expect(getHillLayerPosition(0)[2]).toBeLessThan(-18);
    expect(getHillLayerPosition(2)[2]).toBeLessThan(getHillLayerPosition(0)[2]);
  });

  it("adds ground details along the whole road", () => {
    expect(getGrassTuftPosition(0)).toEqual([-4.1, -1.92, -7]);
    expect(getGrassTuftPosition(9)[2]).toBeLessThan(-28);
    expect(getFlowerPosition(0)[1]).toBeLessThan(-1.6);
    expect(Math.abs(getFlowerPosition(7)[0])).toBeGreaterThan(2);
  });

  it("fills the lower side edges with shrubs and pink fireflies", () => {
    expect(sideShrubs).toHaveLength(16);
    expect(sideFireflies).toHaveLength(28);
    expect(getShrubPosition(0)[1]).toBeLessThan(-1.9);
    expect(Math.abs(getShrubPosition(5)[0])).toBeGreaterThan(3.4);
    expect(getFireflyPosition(0)[1]).toBeGreaterThan(-1.1);
    expect(Math.abs(getFireflyPosition(9)[0])).toBeGreaterThan(4.5);
  });

  it("keeps low lawn trees grounded instead of floating on side edges", () => {
    expect(lawnTrees).toHaveLength(6);
    expect(getLawnTreePosition(0)[1]).toBeLessThan(-2);
    expect(Math.abs(getLawnTreePosition(0)[0])).toBeLessThan(5);
    expect(getLawnTreePosition(5)[2]).toBeLessThan(-28);
  });

  it("keeps restaurant-path lanterns beside the road without blocking cards", () => {
    expect(sideLanterns).toHaveLength(4);
    expect(Math.abs(getLanternPosition(0)[0])).toBeGreaterThan(2.8);
    expect(getLanternPosition(0)[1]).toBeLessThan(-1.9);
    expect(getLanternPosition(3)[2]).toBeLessThan(-39);
  });
});
