import type { ChartContent, ShareContent, TodayContent } from "./types";

export const todayOutputSchema = {
  type: "object",
  required: ["title", "summary", "insight", "advice", "tags"],
} as const;

export const chartOutputSchema = {
  type: "object",
  required: ["core", "personality", "strengths", "challenges", "career", "relationship"],
} as const;

export const shareOutputSchema = {
  type: "object",
  required: ["headline", "description", "quote"],
} as const;

const isStringArray = (value: unknown): value is string[] => Array.isArray(value) && value.every((item) => typeof item === "string");

export function isTodayContent(value: unknown): value is TodayContent {
  if (!value || typeof value !== "object") return false;
  const content = value as Record<string, unknown>;
  return ["title", "summary", "insight", "advice"].every((key) => typeof content[key] === "string") && isStringArray(content.tags);
}

export function isChartContent(value: unknown): value is ChartContent {
  if (!value || typeof value !== "object") return false;
  const content = value as Record<string, unknown>;
  return ["core", "personality", "career", "relationship"].every((key) => typeof content[key] === "string")
    && isStringArray(content.strengths)
    && isStringArray(content.challenges);
}

export function isShareContent(value: unknown): value is ShareContent {
  if (!value || typeof value !== "object") return false;
  const content = value as Record<string, unknown>;
  return ["headline", "description", "quote"].every((key) => typeof content[key] === "string");
}
