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

const MIN_QUALITY = 0;
const MAX_QUALITY = 50;

function increaseQuality(item: Item, amount: number): void {
  if (item.quality < MAX_QUALITY) {
    item.quality = Math.min(MAX_QUALITY, item.quality + amount);
  }
}

function decreaseQuality(item: Item, amount: number): void {
  if (item.quality > MIN_QUALITY) {
    item.quality = Math.max(MIN_QUALITY, item.quality - amount);
  }
}

function isExpired(item: Item): boolean {
  return item.sellIn < 0;
}

function updateAgedBrie(item: Item): void {
  increaseQuality(item, 1);
  item.sellIn = item.sellIn - 1;
  if (isExpired(item)) {
    increaseQuality(item, 1);
  }
}

function updateBackstagePass(item: Item): void {
  let increase = 1;
  if (item.sellIn <= 5) {
    increase = 3;
  } else if (item.sellIn <= 10) {
    increase = 2;
  }
  increaseQuality(item, increase);

  item.sellIn = item.sellIn - 1;
  if (isExpired(item)) {
    item.quality = MIN_QUALITY;
  }
}

function updateNormalItem(item: Item): void {
  decreaseQuality(item, 1);
  item.sellIn = item.sellIn - 1;
  if (isExpired(item)) {
    decreaseQuality(item, 1);
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
