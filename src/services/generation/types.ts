import type { UserProfile } from "@/types";

export type TodayContent = {
  sentence: string;
  tags: string[];
  observation: string;
  action: string;
  question: string;
};

export type ChartSection = {
  title: string;
  tags: string[];
  text: string;
};

export type ShareCard = {
  name: string;
  eyebrow: string;
  text: string;
};

export type PersonalizedContent = {
  today: TodayContent;
  chart: ChartSection[];
  shareCards: ShareCard[];
};

export type GenerationContext = {
  profile: UserProfile;
  seed: number;
};
