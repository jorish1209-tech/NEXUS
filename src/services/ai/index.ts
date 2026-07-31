import { createMockProvider } from "./mock-provider";
import type { AIProvider } from "./types";

let provider: AIProvider | undefined;

export function getAIProvider(): AIProvider {
  provider ??= createMockProvider();
  return provider;
}

export type { AIProvider, ChartContent, ShareContent, TodayContent } from "./types";
