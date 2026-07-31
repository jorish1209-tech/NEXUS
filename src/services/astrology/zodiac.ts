const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
] as const;

export type ZodiacSign = (typeof zodiacSigns)[number];

const boundaries: ReadonlyArray<[number, number, ZodiacSign]> = [
  [1, 20, "Aquarius"], [2, 19, "Pisces"], [3, 21, "Aries"], [4, 20, "Taurus"],
  [5, 21, "Gemini"], [6, 22, "Cancer"], [7, 23, "Leo"], [8, 23, "Virgo"],
  [9, 23, "Libra"], [10, 24, "Scorpio"], [11, 22, "Sagittarius"], [12, 22, "Capricorn"],
];

export function getSunSign(birthday: string): ZodiacSign {
  const date = new Date(`${birthday}T12:00:00`);
  if (Number.isNaN(date.getTime())) return "Aries";
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const match = [...boundaries].reverse().find(([boundaryMonth, boundaryDay]) => month > boundaryMonth || (month === boundaryMonth && day >= boundaryDay));
  return match?.[2] ?? "Capricorn";
}

export function getZodiacSign(index: number): ZodiacSign {
  return zodiacSigns[((index % zodiacSigns.length) + zodiacSigns.length) % zodiacSigns.length];
}
