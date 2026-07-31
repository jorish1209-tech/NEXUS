import type { UserProfile } from "@/types";
import { calculateBirthChart } from "@/services/astrology";
import type { GenerationContext } from "@/services/generation/types";

export function buildAIContext(profile: UserProfile, context: GenerationContext) {
  return {
    profile,
    astrology: context.astrology ?? calculateBirthChart(profile),
    language: context.language,
    timezone: context.timezone,
    currentDate: context.currentDate,
    userHistory: context.userHistory,
    generationVersion: context.generationVersion,
  };
}
