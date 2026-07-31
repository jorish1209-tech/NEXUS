import { chartSections, dailyEntries } from "@/data/mock-profile";
import { calculateBirthChart } from "@/services/astrology";
import { mapChartSignals } from "@/services/astrology/personality-map";
import type { ChartContent } from "@/services/ai/types";
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
    astrology: calculateBirthChart(profile),
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
  const signals = mapChartSignals(context.astrology);
  return {
    ...base,
    tags: [base.tags[0], signals.sun.keyword, signals.moon.keyword],
    sentence: `${context.profile.nickname}，${base.sentence.replace(/^今天/, "今天")}`,
    observation: `${pick(observations, context.seed, 1)} ${signals.moon.need}。`,
    action: `${pick(actions, context.seed, 2)} ${signals.rising.expression}。`,
    question: pick(questions, context.seed, 3),
  };
}

export function generateChartContentWithRules(context: GenerationContext): ChartContent {
  const signals = mapChartSignals(context.astrology);
  const dominantElement = Object.entries(context.astrology.elements).sort(([, first], [, second]) => second - first)[0]?.[0] ?? "earth";
  return {
    core: `${signals.sun.keyword}与${signals.moon.keyword}并行，外在呈现${signals.rising.keyword}。这是一种关于自我节奏的观察，不是对你的定义。`,
    personality: `太阳带来${signals.sun.strength}的倾向，月亮则需要${signals.moon.need}。你可以在表达目标时，也为感受留出空间。`,
    strengths: [signals.sun.strength, signals.moon.keyword, signals.rising.expression],
    challenges: [signals.sun.tension, signals.moon.tension, `${dominantElement}元素需要被平衡`],
    career: `当方向对你有意义时，${signals.sun.strength}会成为持续行动的支点；${signals.rising.expression}。`,
    relationship: `关系中你可能先表现为${signals.rising.keyword}，内在却更在意${signals.moon.need}。清楚表达边界，有助于建立真实连接。`,
  };
}

export function generateChartWithRules(context: GenerationContext): ChartSection[] {
  const generated = generateChartContentWithRules(context);
  return [
    { title: "核心人格", tags: generated.strengths.slice(0, 2), text: generated.core },
    { title: "情绪模式", tags: [generated.personality], text: generated.personality },
    { title: "内在需求", tags: generated.challenges.slice(0, 2), text: generated.relationship },
    { title: "行动力来源", tags: generated.strengths.slice(0, 2), text: generated.career },
    { title: "压力反应", tags: generated.challenges.slice(0, 2), text: generated.challenges.join("、") },
    { title: "人生主题", tags: [generated.core], text: generated.relationship },
  ];
}

export function fallbackToday(): TodayContent {
  return { ...dailyEntries[0], tags: [...dailyEntries[0].tags] };
}

export function fallbackChart(): ChartSection[] {
  return chartSections.map((section) => ({ ...section, tags: [...section.tags] }));
}
