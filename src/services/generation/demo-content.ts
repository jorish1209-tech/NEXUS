"use client";

import { useEffect, useState } from "react";
import { generateWithPipeline } from "./pipeline";
import type { ChartSection, ShareCard, TodayContent } from "./types";
import type { UserProfile } from "@/types";

export type DemoContent = {
  today: TodayContent;
  chart: ChartSection[];
  shareCards: ShareCard[];
};

export async function generateDemoContent(profile: UserProfile): Promise<DemoContent> {
  const generated = await generateWithPipeline(profile);
  const { today: aiToday, chart: aiChart, share: aiShare } = generated;
  return {
    today: {
      sentence: aiToday.title,
      tags: aiToday.tags,
      observation: aiToday.summary,
      action: aiToday.advice,
      question: aiToday.insight,
    },
    chart: [
      { title: "核心人格", tags: aiChart.strengths.slice(0, 2), text: aiChart.core },
      { title: "情绪模式", tags: [aiChart.personality], text: aiChart.personality },
      { title: "内在需求", tags: aiChart.challenges.slice(0, 2), text: aiChart.relationship },
      { title: "行动力来源", tags: aiChart.strengths.slice(0, 2), text: aiChart.career },
      { title: "压力反应", tags: aiChart.challenges.slice(0, 2), text: aiChart.challenges.join("、") },
      { title: "人生主题", tags: [aiChart.core], text: aiChart.relationship },
    ],
    shareCards: [
      { name: "今日主句", eyebrow: "TODAY'S ORBIT", text: aiToday.title },
      { name: "核心人格", eyebrow: "CORE PERSONA", text: aiShare.description },
      { name: "人生主题", eyebrow: "LIFE THEME", text: aiShare.quote },
    ],
  };
}

export function useDemoContent(profile: UserProfile) {
  const [content, setContent] = useState<DemoContent | null>(null);
  useEffect(() => {
    let active = true;
    void generateDemoContent(profile).then((next) => { if (active) setContent(next); });
    return () => { active = false; };
  }, [profile]);
  return content;
}
