import { chartSections, dailyEntries } from "@/data/mock-profile";
import type { UserProfile } from "@/types";
import type { ChartSection, GenerationContext, TodayContent } from "./types";

function hash(value: string) {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

export function createGenerationContext(profile: UserProfile): GenerationContext {
  const identity = [profile.nickname, profile.birthday, profile.birthTimeUnknown ? "unknown" : profile.birthTime, profile.location].join("|");
  const now = new Date();
  return {
    profile,
    language: "zh-CN",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    currentDate: now.toISOString().slice(0, 10),
    userHistory: [],
    generationVersion: "local-rules-v1",
    seed: hash(identity),
  };
}

function pick<T>(items: readonly T[], seed: number, offset = 0) {
  return items[(seed + offset) % items.length];
}

const observations = [
  "今天的你更容易把注意力放在别人如何理解自己。先把判断放慢一点，你会更清楚地听见自己的感受。",
  "你正在重新辨认什么值得投入。与其一次想清所有答案，不如先完成眼前最真实的一小步。",
  "当外界声音变多时，你需要的不是更多解释，而是一点可以不被打扰的空间。",
] as const;

const actions = [
  "把一个反复盘旋的念头写下来，再选择一个可执行的下一步。",
  "今天留出一段不被消息打断的时间，只处理一件重要的事。",
  "做决定前问自己：这是我的需要，还是我想象中的期待？",
] as const;

const questions = [
  "如果不需要立刻得到回应，你想先诚实面对什么？",
  "今天什么选择会让你更接近真实的自己？",
  "你正在保护的，是边界，还是对被拒绝的担心？",
] as const;

export function generateTodayWithRules(context: GenerationContext): TodayContent {
  const base = pick(dailyEntries, context.seed);
  return {
    ...base,
    tags: [...base.tags],
    sentence: `${context.profile.nickname}，${base.sentence.replace(/^今天/, "今天")}`,
    observation: pick(observations, context.seed, 1),
    action: pick(actions, context.seed, 2),
    question: pick(questions, context.seed, 3),
  };
}

export function generateChartWithRules(context: GenerationContext): ChartSection[] {
  return chartSections.map((section, index) => ({
    ...section,
    tags: [...section.tags].map((tag, tagIndex) => tagIndex === 0 && index % 2 === context.seed % 2 ? `${tag} · ${context.profile.location}` : tag),
    text: `${section.text} ${index === context.seed % chartSections.length ? `这份观察也与你在${context.profile.location}建立的生活节奏有关。` : ""}`.trim(),
  }));
}

export function fallbackToday(): TodayContent {
  return { ...dailyEntries[0], tags: [...dailyEntries[0].tags] };
}

export function fallbackChart(): ChartSection[] {
  return chartSections.map((section) => ({ ...section, tags: [...section.tags] }));
}
