import { describe, expect, it } from "vitest";
import { CALENDAR_DEPTH, CALENDAR_SCALE } from "./CalendarScene";

describe("CalendarScene", () => {
  it("keeps the calendar deep but larger for readability", () => {
    expect(CALENDAR_DEPTH).toBeLessThanOrEqual(-46);
    expect(CALENDAR_SCALE).toBeGreaterThanOrEqual(1);
  });
});
