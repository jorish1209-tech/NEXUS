import type { ElementBalance } from "./types";
import type { ZodiacSign } from "./zodiac";

const elementBySign: Record<ZodiacSign, keyof ElementBalance> = {
  Aries: "fire", Leo: "fire", Sagittarius: "fire",
  Taurus: "earth", Virgo: "earth", Capricorn: "earth",
  Gemini: "air", Libra: "air", Aquarius: "air",
  Cancer: "water", Scorpio: "water", Pisces: "water",
};

export function calculateElementBalance(signs: readonly ZodiacSign[]): ElementBalance {
  const counts: ElementBalance = { earth: 0, water: 0, air: 0, fire: 0 };
  signs.forEach((sign) => { counts[elementBySign[sign]] += 1; });
  const total = signs.length || 1;
  const values = Object.entries(counts).map(([element, count]) => [element, Math.round((count / total) * 100)] as const);
  const roundedTotal = values.reduce((sum, [, value]) => sum + value, 0);
  const largest = values.reduce((current, value) => value[1] > current[1] ? value : current, values[0]);
  if (largest && roundedTotal !== 100) counts[largest[0] as keyof ElementBalance] += 100 - roundedTotal;
  return counts;
}
