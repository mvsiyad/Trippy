export interface MonthData {
  name: string;
  tag: string;
  summary: string;
  places: string[];
}

export const MONTHS_DATA: Record<number, MonthData> = {
  1: {
    name: "January",
    tag: "PEAK WINTER SNOW & TROPICAL SUN",
    summary:
      "Kashmir transforms into a winter wonderland with skiing in Gulmarg. Kerala backwaters offer idyllic warm sunny breezes, and Iceland dazzles with blue ice caves.",
    places: ["kashmir-valley", "kerala-backwaters", "iceland-aurora"],
  },
  2: {
    name: "February",
    tag: "DEEP SNOW & FROZEN WONDERS",
    summary:
      "Crisp blue skies and frozen waterfalls in Kashmir and Swiss Alps. Warm tropical cruising in Kerala and clear dark aurora skies in Iceland.",
    places: ["kerala-backwaters", "kashmir-valley", "swiss-alps"],
  },
  3: {
    name: "March",
    tag: "SPRING BLOSSOMS & SHOULDER DEALS",
    summary:
      "Kyoto’s legendary cherry blossoms (Sakura) begin to bloom in late March. Lower altitude Himalayan valleys warm up with apple blossoms.",
    places: ["kyoto-japan", "kashmir-valley", "kerala-backwaters"],
  },
  4: {
    name: "April",
    tag: "SPRINGTIME AWAKENING",
    summary:
      "Peak cherry blossom season across Kyoto. Srinagar’s Indira Gandhi Memorial Tulip Garden opens with millions of vibrant tulips in bloom.",
    places: ["kyoto-japan", "kashmir-valley", "bali-indonesia"],
  },
  5: {
    name: "May",
    tag: "MEDITERRANEAN SPRING & HIMALAYAN PASSES",
    summary:
      "Positano and the Amalfi Coast bloom with pleasant temperatures. Snow melts across Swiss foothills and lower Himalayan passes open.",
    places: ["amalfi-coast", "bali-indonesia", "swiss-alps"],
  },
  6: {
    name: "June",
    tag: "HIGH-PASS OPENING & MIDNIGHT SUN",
    summary:
      "Kunzum and Khardung La passes officially open! Spiti Valley and Leh Ladakh become accessible. Swiss Alps meadows turn emerald green.",
    places: ["spiti-valley", "leh-ladakh", "swiss-alps"],
  },
  7: {
    name: "July",
    tag: "ALPINE EXPEDITIONS & RAINSHADOW OASIS",
    summary:
      "While Indian plains experience monsoon, Ladakh and Spiti sit in dry rainshadow with clear sunny skies. Bali enjoys peak dry surfing season.",
    places: ["leh-ladakh", "spiti-valley", "bali-indonesia"],
  },
  8: {
    name: "August",
    tag: "SUMMER PRIME & WILDFLOWERS",
    summary:
      "Peak wildflowers at Chandratal and Pangong Tso. Sunny dry days across Bali’s cliff lookouts and warm hiking weather in the Swiss Alps.",
    places: ["leh-ladakh", "chandratal-lake", "bali-indonesia"],
  },
  9: {
    name: "September",
    tag: "THE GOLDEN WINDOW (BEST OVERALL)",
    summary:
      "Arguably the single best travel month for Spiti, Ladakh, and the Amalfi Coast: crystal clear skies, zero rain, golden poplars, and peak Milky Way nights.",
    places: ["spiti-valley", "amalfi-coast", "leh-ladakh"],
  },
  10: {
    name: "October",
    tag: "AUTUMN CRIMSON & CRISP AIR",
    summary:
      "Kashmir’s Chinar trees turn fiery crimson and gold. Kyoto’s autumn foliage begins and the Amalfi Coast offers mellow uncrowded beaches.",
    places: ["amalfi-coast", "kashmir-valley", "kyoto-japan"],
  },
  11: {
    name: "November",
    tag: "PEAK AUTUMN LEAVES & BACKWATER BREEZES",
    summary:
      "Kyoto’s maple foliage peaks with illuminated evening gardens. Kerala enters its prime cruising weather and Arctic nights return to Iceland.",
    places: ["kerala-backwaters", "kyoto-japan", "iceland-aurora"],
  },
  12: {
    name: "December",
    tag: "FAIRYTALE WINTER & TROPICAL ESCAPES",
    summary:
      "Snow dusts Swiss alpine chalets in Lauterbrunnen and Zermatt. Frozen waterfalls in Gulmarg and golden tropical sunsets across Kerala backwaters.",
    places: ["kerala-backwaters", "swiss-alps", "iceland-aurora"],
  },
};
