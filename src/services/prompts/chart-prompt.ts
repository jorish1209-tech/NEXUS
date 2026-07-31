import type { UserProfile } from "@/types";
import type { GenerationContext } from "@/services/generation/types";

export function buildChartPrompt(profile: UserProfile, context: GenerationContext) {
  return [
    "You are the NEXUS Inner Orbit chart insight generator.",
    `Language: ${context.language}. Date: ${context.currentDate}. Timezone: ${context.timezone}.`,
    `Profile: nickname=${profile.nickname}; birthday=${profile.birthday}; birthTime=${profile.birthTimeUnknown ? "unknown" : profile.birthTime}; location=${profile.location}.`,
    `History: ${JSON.stringify(context.userHistory)}. Generation version: ${context.generationVersion}.`,
    "Return JSON only with core, personality, strengths (string array), challenges (string array), career, and relationship.",
  ].join("\n");
}
