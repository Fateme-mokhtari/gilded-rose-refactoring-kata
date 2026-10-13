export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const AGED_BRIE = "Aged Brie";
const BACKSTAGE_PASS = "Backstage passes to a TAFKAL80ETC concert";
const SULFURAS = "Sulfuras, Hand of Ragnaros";

function updateAgedBrie(item: Item): void {
  item.sellIn = item.sellIn - 1;
  if (item.quality < 50) {
    item.quality = item.quality + 1;
  }
  if (item.sellIn < 0 && item.quality < 50) {
    item.quality = item.quality + 1;
  }
}

function updateBackstagePass(item: Item): void {
  let increase = 1;
  if (item.sellIn <= 5) {
    increase = 3;
  } else if (item.sellIn <= 10) {
    increase = 2;
  }
  if (item.quality < 50) {
    item.quality = item.quality + increase;
    if (item.quality > 50) {
      item.quality = 50;
    }
  }

  item.sellIn = item.sellIn - 1;
  if (item.sellIn < 0) {
    item.quality = 0;
  }
}

function updateNormalItem(item: Item): void {
  if (item.quality > 0) {
    item.quality = item.quality - 1;
  }
  item.sellIn = item.sellIn - 1;
  if (item.sellIn < 0 && item.quality > 0) {
    item.quality = item.quality - 1;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      if (item.name === SULFURAS) {
        continue;
      }
      if (item.name === AGED_BRIE) {
        updateAgedBrie(item);
        continue;
      }
      if (item.name === BACKSTAGE_PASS) {
        updateBackstagePass(item);
        continue;
      }

      updateNormalItem(item);
    }

    return this.items;
  }
}
