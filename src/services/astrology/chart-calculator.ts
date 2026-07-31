import type { UserProfile } from "@/types";
import { calculateElementBalance } from "./elements";
import type { BirthChartData } from "./types";
import { getSunSign, getZodiacSign } from "./zodiac";

function hash(value: string) {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

export function calculateBirthChart(profile: UserProfile): BirthChartData {
  const seed = hash([profile.birthday, profile.birthTimeUnknown ? "unknown" : profile.birthTime, profile.location].join("|"));
  const sun = getSunSign(profile.birthday);
  const moon = getZodiacSign(seed % 12);
  const rising = getZodiacSign((seed >>> 4) % 12);
  return { sun, moon, rising, elements: calculateElementBalance([sun, moon, rising]), source: "mock" };
}
