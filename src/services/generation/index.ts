import type { UserProfile } from "@/types";
import { chartSections, getDailyEntry } from "@/data/mock-profile";
import { createGenerationContext, fallbackChart, fallbackToday, generateChartWithRules, generateTodayWithRules } from "./rules";
import type { ChartSection, ShareCard, TodayContent } from "./types";

export function generateToday(profile: UserProfile): TodayContent {
  try { return generateTodayWithRules(createGenerationContext(profile)); } catch { return fallbackToday(); }
}

export function generateChart(profile: UserProfile): ChartSection[] {
  try { return generateChartWithRules(createGenerationContext(profile)); } catch { return fallbackChart(); }
}

export function generateShareCard(profile: UserProfile): ShareCard[] {
  try {
    const today = generateToday(profile);
    const chart = generateChart(profile);
    return [
      { name: "今日主句", eyebrow: "TODAY'S ORBIT", text: today.sentence },
      { name: "核心人格", eyebrow: "INNER MAP · 核心人格", text: chart[0]?.tags.join("、") || "清醒、敏锐，也有自己的温度。" },
      { name: "人生主题", eyebrow: "INNER MAP · 人生主题", text: chart[5]?.text || chartSections[5].text },
    ];
  } catch {
    const today = getDailyEntry();
    return [
      { name: "今日主句", eyebrow: "TODAY'S ORBIT", text: today.sentence },
      { name: "核心人格", eyebrow: "INNER MAP · 核心人格", text: "清醒、敏锐，也有自己的温度。" },
      { name: "人生主题", eyebrow: "INNER MAP · 人生主题", text: chartSections[5].text },
    ];
  }
}
