import type { UserProfile } from "@/types";
import type { GenerationContext } from "@/services/generation/types";

export function buildTodayPrompt(profile: UserProfile, context: GenerationContext) {
  return [
    "You are the NEXUS Inner Orbit daily insight generator.",
    `Language: ${context.language}. Date: ${context.currentDate}. Timezone: ${context.timezone}.`,
    `Profile: nickname=${profile.nickname}; birthday=${profile.birthday}; birthTime=${profile.birthTimeUnknown ? "unknown" : profile.birthTime}; location=${profile.location}.`,
    `History: ${JSON.stringify(context.userHistory)}. Generation version: ${context.generationVersion}.`,
    "Return JSON only with title, summary, insight, advice, and tags (string array).",
  ].join("\n");
}
