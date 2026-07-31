import { generateChartWithRules, generateTodayWithRules } from "@/services/generation/rules";
import type { UserProfile } from "@/types";
import type { AIProvider, ChartContent, ShareContent, TodayContent } from "./types";
import type { GenerationContext } from "@/services/generation/types";

export class MockAIProvider implements AIProvider {
  async generateToday(_profile: UserProfile, context: GenerationContext): Promise<TodayContent> {
    const local = generateTodayWithRules(context);
    return { title: local.sentence, summary: local.observation, insight: local.observation, advice: local.action, tags: local.tags };
  }

  async generateChart(_profile: UserProfile, context: GenerationContext): Promise<ChartContent> {
    const sections = generateChartWithRules(context);
    return {
      core: sections[0]?.text || "",
      personality: sections[1]?.text || "",
      strengths: sections[3]?.tags || [],
      challenges: sections[4]?.tags || [],
      career: sections[3]?.text || "",
      relationship: sections[5]?.text || "",
    };
  }

  async generateShare(profile: UserProfile, context: GenerationContext): Promise<ShareContent> {
    const today = await this.generateToday(profile, context);
    const chart = await this.generateChart(profile, context);
    return { headline: today.title, description: chart.core, quote: today.insight };
  }
}

export function createMockProvider(): AIProvider {
  return new MockAIProvider();
}
