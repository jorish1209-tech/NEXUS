import type { UserProfile } from "@/types";
import type { GenerationContext } from "@/services/generation/types";

export function buildSharePrompt(profile: UserProfile, context: GenerationContext) {
  return [
    "You are the NEXUS Inner Orbit share-card generator.",
    `Language: ${context.language}. Date: ${context.currentDate}. Timezone: ${context.timezone}.`,
    `Profile: nickname=${profile.nickname}; birthday=${profile.birthday}; birthTime=${profile.birthTimeUnknown ? "unknown" : profile.birthTime}; location=${profile.location}.`,
    `Astrology context: sun=${context.astrology.sun}; moon=${context.astrology.moon}; rising=${context.astrology.rising}; elements=${JSON.stringify(context.astrology.elements)}.`,
    `History: ${JSON.stringify(context.userHistory)}. Generation version: ${context.generationVersion}.`,
    "Return JSON only with headline, description, and quote.",
  ].join("\n");
}
