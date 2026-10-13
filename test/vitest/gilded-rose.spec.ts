import { GildedRose, Item } from "@/gilded-rose";
import { describe, expect, it } from "vitest";

function updateItem(name: string, sellIn: number, quality: number): Item {
  const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);
  return gildedRose.updateQuality()[0];
}

describe("Gilded Rose", () => {
  describe("normal items", () => {
    it("decreases quality by 1", () => {
      expect(updateItem("Normal item", 10, 20).quality).toBe(19);
    });

    it("decreases sellIn by 1", () => {
      expect(updateItem("Normal item", 10, 20).sellIn).toBe(9);
    });

    it("never decreases quality below 0", () => {
      expect(updateItem("Normal item", 10, 0).quality).toBe(0);
    });

    it("decreases quality by 2 after the sell date", () => {
      expect(updateItem("Normal item", 0, 20).quality).toBe(18);
    });

    it("never decreases quality below 0 after the sell date", () => {
      expect(updateItem("Normal item", 0, 1).quality).toBe(0);
    });
  });

  describe("Aged Brie", () => {
    it("increases quality by 1", () => {
      expect(updateItem("Aged Brie", 10, 20).quality).toBe(21);
    });

    it("decreases sellIn by 1", () => {
      expect(updateItem("Aged Brie", 10, 20).sellIn).toBe(9);
    });

    it("increases quality by 2 after the sell date", () => {
      expect(updateItem("Aged Brie", 0, 20).quality).toBe(22);
    });

    it("never increases quality above 50", () => {
      expect(updateItem("Aged Brie", 10, 50).quality).toBe(50);
    });

    it("never increases quality above 50 after the sell date", () => {
      expect(updateItem("Aged Brie", 0, 49).quality).toBe(50);
    });
  });

  describe("Sulfuras", () => {
    it("never changes quality", () => {
      expect(updateItem("Sulfuras, Hand of Ragnaros", 10, 80).quality).toBe(80);
    });

    it("never changes sellIn", () => {
      expect(updateItem("Sulfuras, Hand of Ragnaros", 10, 80).sellIn).toBe(10);
    });

    it("never changes quality after the sell date", () => {
      expect(updateItem("Sulfuras, Hand of Ragnaros", -1, 80).quality).toBe(80);
    });
  });
});
