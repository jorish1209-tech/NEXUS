import type { BirthChartData } from "./types";

export type PersonalitySignals = {
  themes: string[];
  strengths: string[];
  tensions: string[];
};

export type ChartSignals = {
  sun: { keyword: string; strength: string; tension: string };
  moon: { keyword: string; need: string; tension: string };
  rising: { keyword: string; expression: string };
};

const sunSignals: Record<BirthChartData["sun"], ChartSignals["sun"]> = {
  Aries: { keyword: "主动开启", strength: "勇于行动", tension: "容易急于推进" }, Taurus: { keyword: "稳定建立", strength: "耐心持续", tension: "容易固守熟悉" },
  Gemini: { keyword: "灵活理解", strength: "善于连接", tension: "容易分散注意" }, Cancer: { keyword: "保护与滋养", strength: "感受细腻", tension: "容易受环境影响" },
  Leo: { keyword: "真诚表达", strength: "具有感染力", tension: "容易在意认可" }, Virgo: { keyword: "细节打磨", strength: "观察准确", tension: "容易过度挑剔" },
  Libra: { keyword: "寻找平衡", strength: "善于协调", tension: "容易反复权衡" }, Scorpio: { keyword: "深入理解", strength: "意志坚定", tension: "不易轻易信任" },
  Sagittarius: { keyword: "拓展边界", strength: "保持开放", tension: "容易忽略细节" }, Capricorn: { keyword: "目标建构", strength: "责任感强", tension: "容易过度要求自己" },
  Aquarius: { keyword: "独立思考", strength: "视角新颖", tension: "容易与人保持距离" }, Pisces: { keyword: "感受共鸣", strength: "富有想象力", tension: "容易边界模糊" },
};

const moonSignals: Record<BirthChartData["moon"], ChartSignals["moon"]> = {
  Aries: { keyword: "直接反应", need: "被允许真实表达", tension: "情绪来得快" }, Taurus: { keyword: "寻求安稳", need: "可预测的节奏", tension: "改变时不易放松" },
  Gemini: { keyword: "思考消化", need: "被理解和交流", tension: "容易想得太多" }, Cancer: { keyword: "情绪记忆", need: "安全与归属", tension: "容易吸收他人情绪" },
  Leo: { keyword: "温暖回应", need: "被看见和肯定", tension: "沉默时容易自我怀疑" }, Virgo: { keyword: "整理感受", need: "清晰与秩序", tension: "容易反复分析" },
  Libra: { keyword: "关系感受", need: "和谐的互动", tension: "容易压下真实需要" }, Scorpio: { keyword: "深层感知", need: "真诚与信任", tension: "不易放下防备" },
  Sagittarius: { keyword: "寻找意义", need: "空间与希望", tension: "难以停留在当下" }, Capricorn: { keyword: "自我承担", need: "可靠的掌控感", tension: "容易独自承受" },
  Aquarius: { keyword: "理性观察", need: "独立与距离", tension: "不易表达脆弱" }, Pisces: { keyword: "共情流动", need: "被温柔理解", tension: "容易模糊边界" },
};

const risingSignals: Record<BirthChartData["rising"], ChartSignals["rising"]> = {
  Aries: { keyword: "直接", expression: "倾向先行动再调整" }, Taurus: { keyword: "从容", expression: "倾向用稳定节奏建立信任" }, Gemini: { keyword: "好奇", expression: "倾向通过交流打开局面" }, Cancer: { keyword: "温和", expression: "倾向先确认环境是否安全" },
  Leo: { keyword: "明亮", expression: "倾向自然表达存在感" }, Virgo: { keyword: "克制", expression: "倾向先观察细节再投入" }, Libra: { keyword: "协调", expression: "倾向照顾关系中的平衡" }, Scorpio: { keyword: "敏锐", expression: "倾向快速察觉未说出口的部分" },
  Sagittarius: { keyword: "开放", expression: "倾向用探索回应未知" }, Capricorn: { keyword: "可靠", expression: "倾向先承担再表达需求" }, Aquarius: { keyword: "独立", expression: "倾向保留自己的观察角度" }, Pisces: { keyword: "柔软", expression: "倾向用感受理解他人" },
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

export function mapChartSignals(chart: BirthChartData): ChartSignals {
  return { sun: sunSignals[chart.sun], moon: moonSignals[chart.moon], rising: risingSignals[chart.rising] };
}
