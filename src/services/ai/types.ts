import type { UserProfile } from "@/types";
import type { GenerationContext } from "@/services/generation/types";

export type TodayContent = {
  title: string;
  summary: string;
  insight: string;
  advice: string;
  tags: string[];
};

export type ChartContent = {
  core: string;
  personality: string;
  strengths: string[];
  challenges: string[];
  career: string;
  relationship: string;
};

export type ShareContent = {
  headline: string;
  description: string;
  quote: string;
};

export interface AIProvider {
  generateToday(profile: UserProfile, context: GenerationContext): Promise<TodayContent>;
  generateChart(profile: UserProfile, context: GenerationContext): Promise<ChartContent>;
  generateShare(profile: UserProfile, context: GenerationContext): Promise<ShareContent>;
}

export class AIProviderUnavailableError extends Error {
  constructor(message = "AI provider is unavailable") {
    super(message);
    this.name = "AIProviderUnavailableError";
  }
}
