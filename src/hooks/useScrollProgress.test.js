import { describe, expect, it } from "vitest";
import { createProgressStore } from "./useScrollProgress";

describe("createProgressStore", () => {
  it("clamps progress and notifies listeners", () => {
    const store = createProgressStore();
    const values = [];
    const unsubscribe = store.subscribe(() => values.push(store.getSnapshot()));
    store.set(1.5);
    store.set(-0.5);
    unsubscribe();
    store.set(0.5);
    expect(values).toEqual([1, 0]);
    expect(store.getSnapshot()).toBe(0.5);
  });
});
