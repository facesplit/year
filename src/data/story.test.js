import { describe, expect, it } from "vitest";
import { story } from "./story";

describe("story", () => {
  it("contains the approved anniversary details", () => {
    expect(story.anniversaryDate).toBe("03.05.2025");
    expect(story.recipient).toBe("Нурданы");
    expect(story.signature).toBe("Асылхана");
  });

  it("contains at least ten memories with image and story text", () => {
    expect(story.memories.length).toBeGreaterThanOrEqual(10);
    for (const memory of story.memories) {
      expect(memory.id).toMatch(/^memory-/);
      expect(memory.image).toBeTruthy();
      expect(memory.assetName).toBeTruthy();
      expect(memory.title.length).toBeGreaterThan(2);
      expect(memory.story.length).toBeGreaterThan(12);
    }
  });

  it("uses the new hero, opening, and memory photo assets", () => {
    expect(story.heroMemory.assetName).toBe("Главное фото.png");
    expect(story.openingMemories.map((memory) => memory.assetName)).toEqual(["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg"]);
    expect(story.memories.map((memory) => memory.assetName)).toEqual([
      "1.jpeg",
      "2.jpeg",
      "3.jpeg",
      "4.jpeg",
      "5.jpeg",
      "6.jpeg",
      "7.jpeg",
      "8.jpeg",
      "9.jpeg",
      "10.jpeg",
      "11.jpeg",
      "12.jpeg",
    ]);
  });

  it("contains the personalized romantic memory copy", () => {
    expect(story.memories.map((memory) => memory.title)).toEqual([
      "Первое признание",
      "Первая общая фотография",
      "Поппайес и Арбат",
      "Ты пришла ко мне домой",
      "Та же ночь",
      "Твой отъезд",
      "Твой день рождения",
      "Ты приехала",
      "Полгода вместе",
      "Первое 14 февраля",
      "Первое 8 марта",
      "Год как я тебя знаю",
    ]);
    expect(story.memories[0].story).toContain("Я долго собирал смелость");
    expect(story.memories[0].story).toContain("ты ответила \"да\"");
    expect(story.memories[1].story).toContain("Восхитительный, тихий, тёплый день");
    expect(story.memories[2].story).toContain("просто шли по Арбату");
    expect(story.memories[6].story).toContain("Это моё самое любимое фото из всех");
    expect(story.memories[11].story).toContain("Ты мой свет и моё солнце");
  });

  it("uses a light pink frame color instead of dark or orange", () => {
    const accents = new Set([...story.openingMemories, story.heroMemory, ...story.memories].map((memory) => memory.accent));
    expect(accents).toEqual(new Set(["#f4b8c7"]));
    expect(accents.has("#2a1826")).toBe(false);
    expect(accents.has("#f97316")).toBe(false);
  });

  it("ends with a restaurant invitation instead of a gratitude note", () => {
    expect(story.finale.title).toBe("Пойдём в ресторан?");
    expect(story.finale.letter).toContain("приглашаю тебя в ресторан");
    expect(story.finale.letter).toContain("красивым ужином");
    expect(story.finale.title).not.toContain("Спасибо");
    expect(story.finale.letter).not.toContain("Спасибо");
  });

  it("keeps final restaurant details without the place field", () => {
    expect(story.finale.details).toEqual([
      { label: "Ресторан", value: "Неделька" },
      { label: "Время", value: "6:00" },
      { label: "Адрес", value: "проспект Абая 19" },
    ]);
    expect(story.finale.details.some((detail) => detail.label === "Место")).toBe(false);
  });
});
