export type ElementBalance = {
  earth: number;
  water: number;
  air: number;
  fire: number;
};

export type BirthChartData = {
  sun: string;
  moon: string;
  rising: string;
  elements: ElementBalance;
  source: "mock";
};
