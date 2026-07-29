import type { Feedback, UserProfile } from "@/types";

const PROFILE_KEY = "nexus-profile";
const FEEDBACK_KEY = "nexus-feedback";

function canUseStorage() { return typeof window !== "undefined"; }

export function getProfile(): UserProfile | null {
  if (!canUseStorage()) return null;
  try { return JSON.parse(localStorage.getItem(PROFILE_KEY) || "null") as UserProfile | null; } catch { return null; }
}
export function saveProfile(profile: UserProfile) { if (canUseStorage()) localStorage.setItem(PROFILE_KEY, JSON.stringify(profile)); }
export function getFeedback(): Feedback[] {
  if (!canUseStorage()) return [];
  try { return JSON.parse(localStorage.getItem(FEEDBACK_KEY) || "[]") as Feedback[]; } catch { return []; }
}
export function saveFeedback(feedback: Feedback) { if (canUseStorage()) localStorage.setItem(FEEDBACK_KEY, JSON.stringify([...getFeedback(), feedback])); }
