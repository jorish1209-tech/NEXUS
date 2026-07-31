import type { UserProfile } from "@/types";

export const demoProfiles: Record<"A" | "B" | "C", UserProfile> = {
  A: { nickname: "林舟", birthday: "1995-05-20", birthTime: "10:30", birthTimeUnknown: false, location: "杭州" },
  B: { nickname: "周宁", birthday: "2000-11-08", birthTime: "18:45", birthTimeUnknown: false, location: "上海" },
  C: { nickname: "Maya", birthday: "1985-12-12", birthTime: "07:15", birthTimeUnknown: false, location: "北京" },
};
