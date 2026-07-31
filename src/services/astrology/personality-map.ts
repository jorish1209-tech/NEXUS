import type { BirthChartData } from "./types";

export type PersonalitySignals = {
  themes: string[];
  strengths: string[];
  tensions: string[];
};

const signals: Record<string, PersonalitySignals> = {
  fire: { themes: ["主动表达", "创造冲动"], strengths: ["行动力", "感染力"], tensions: ["急于证明", "消耗过快"] },
  earth: { themes: ["稳定建立", "现实感受"], strengths: ["耐心", "执行力"], tensions: ["过度谨慎", "难以松手"] },
  air: { themes: ["理解连接", "多角度观察"], strengths: ["洞察力", "沟通力"], tensions: ["思绪过载", "迟迟不决"] },
  water: { themes: ["情绪感知", "内在共鸣"], strengths: ["同理心", "直觉"], tensions: ["容易吸收", "边界模糊"] },
};

export function mapPersonalitySignals(chart: BirthChartData): PersonalitySignals {
  const entries = Object.entries(chart.elements);
  const dominant = entries.sort(([, first], [, second]) => second - first)[0]?.[0] ?? "earth";
  return signals[dominant];
}
