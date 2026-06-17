import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { CALENDAR_SCALE, getCalendarOpacity } from "./CalendarScene";

describe("CalendarScene", () => {
  it("renders the calendar larger and lighter", () => {
    const source = readFileSync(join(process.cwd(), "src", "scenes", "CalendarScene.jsx"), "utf8");
    expect(CALENDAR_SCALE).toBeGreaterThanOrEqual(1);
    expect(source).toContain('meshBasicMaterial color="#ffc8d8"');
    expect(source).toContain('fog={false}');
    expect(source).toContain('material-fog={false}');
    expect(source).toContain('material-depthTest={false}');
    expect(source).toContain('color="#4b2238"');
    expect(source).toContain('color={selected ? "#f3a6bd" : "#fff8f2"}');
    expect(source).toContain('scale={0.28 + open * 0.08}');
    expect(source).toContain('scale={0.72}');
  });

  it("fades the calendar out instead of abruptly removing it", () => {
    const source = readFileSync(join(process.cwd(), "src", "scenes", "CalendarScene.jsx"), "utf8");
    expect(getCalendarOpacity(0.72)).toBe(1);
    expect(getCalendarOpacity(0.78)).toBeGreaterThan(0);
    expect(getCalendarOpacity(0.78)).toBeLessThan(1);
    expect(getCalendarOpacity(0.84)).toBe(0);
    expect(source).toContain("const opacity = getCalendarOpacity(progress)");
    expect(source).toContain("transparent opacity={opacity}");
    expect(source).toContain("fillOpacity={opacity}");
  });
});
