import { createMockProvider } from "@/services/ai/mock-provider";
import { getAIProvider } from "@/services/ai";
import { isChartContent, isShareContent, isTodayContent } from "@/services/ai/schema";
import type { ChartContent, ShareContent, TodayContent, AIProvider } from "@/services/ai/types";
import type { UserProfile } from "@/types";
import { createGenerationContext } from "./rules";
import type { GenerationContext } from "./types";

export type PipelineContent = {
  today: TodayContent;
  chart: ChartContent;
  share: ShareContent;
};

const cache = new Map<string, PipelineContent>();

function cacheKey(profile: UserProfile, context: GenerationContext) {
  return JSON.stringify({ profile, language: context.language, timezone: context.timezone, currentDate: context.currentDate, userHistory: context.userHistory, generationVersion: context.generationVersion });
}

function isPipelineContent(value: { today: unknown; chart: unknown; share: unknown }): value is PipelineContent {
  return isTodayContent(value.today) && isChartContent(value.chart) && isShareContent(value.share);
}

export async function generateWithPipeline(
  profile: UserProfile,
  context: GenerationContext = createGenerationContext(profile),
  provider: AIProvider = getAIProvider(),
): Promise<PipelineContent> {
  const key = cacheKey(profile, context);
  const cached = cache.get(key);
  if (cached) return cached;

  try {
    const [today, chart, share] = await Promise.all([
      provider.generateToday(profile, context),
      provider.generateChart(profile, context),
      provider.generateShare(profile, context),
    ]);
    const result = { today, chart, share };
    if (!isPipelineContent(result)) throw new Error("AI provider returned invalid content");
    cache.set(key, result);
    return result;
  } catch {
    const fallback = createMockProvider();
    const result = await Promise.all([
      fallback.generateToday(profile, context),
      fallback.generateChart(profile, context),
      fallback.generateShare(profile, context),
    ]).then(([today, chart, share]) => ({ today, chart, share }));
    if (!isPipelineContent(result)) throw new Error("Local fallback returned invalid content");
    cache.set(key, result);
    return result;
  }
}

export async function generateTodayWithPipeline(profile: UserProfile, context?: GenerationContext, provider?: AIProvider) {
  return (await generateWithPipeline(profile, context, provider)).today;
}

export async function generateChartWithPipeline(profile: UserProfile, context?: GenerationContext, provider?: AIProvider) {
  return (await generateWithPipeline(profile, context, provider)).chart;
}

export async function generateShareWithPipeline(profile: UserProfile, context?: GenerationContext, provider?: AIProvider) {
  return (await generateWithPipeline(profile, context, provider)).share;
}

export function clearGenerationCache() {
  cache.clear();
}
